import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ApiWebURL } from "../utils";
import PageHeader from "../components/PageHeader";
import "./Empleados.css"
function Empleados() {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = async () => {
        try {
            const rutaServicio = ApiWebURL + "empleados.php";
            const response = await fetch(rutaServicio);
            const data = await response.json();
            setListaEmpleados(data);
        } catch (error) {
            console.error("Error al cargar los empleados:", error);
        }
    };

    const handleSeleccionarEmpleado = (idEmpleado) => {
        const empleadoExistente = empleadosSeleccionados.find(empleado => empleado.idempleado === idEmpleado);

        if (empleadoExistente) {
            const nuevaLista = empleadosSeleccionados.filter(empleado => empleado.idempleado !== idEmpleado);
            setEmpleadosSeleccionados(nuevaLista);
        } else {
            const empleadoSeleccionado = listaEmpleados.find(empleado => empleado.idempleado === idEmpleado);
            setEmpleadosSeleccionados([...empleadosSeleccionados, empleadoSeleccionado]);
        }
    };

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
                {listaEmpleados.map(item => (
                    <div className="col" key={item.idempleado}>
                        <div className={`card h-100 ${empleadosSeleccionados.some(empleado => empleado.idempleado === item.idempleado) ? 'seleccionado' : ''}`}>
                            <img src={`${ApiWebURL}fotos/${item.foto}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                                <button onClick={() => handleSeleccionarEmpleado(item.idempleado)}>
                                    {empleadosSeleccionados.some(empleado => empleado.idempleado === item.idempleado) ? 'Deseleccionar' : 'Seleccionar'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const verSeleccionados = () => {
        navigate("/seleccionados", { state: { empleadosSeleccionados } });
    };

    return (
        <>
            <PageHeader titulo="Empleados" />
            <section id="empleados" className='padded'>
                <div className="container">
                    {dibujarCuadricula()}
                    <button onClick={verSeleccionados}>Ver Seleccionados</button>
                </div>
            </section>
        </>
    );
}

export default Empleados;
