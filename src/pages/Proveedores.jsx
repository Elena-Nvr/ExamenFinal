import { Modal, Button } from 'react-bootstrap';
import { ApiWebURL } from "../utils";
import "./Proveedores.css"
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([]);
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState([]);
    const [columnaAnterior, setColumnaAnterior] = useState("");
    const [estadoAscendente, setEstadoAscendente] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "proveedores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaProveedores(data);
                setListaProveedoresFiltrados(data);
            });
    };

    const dibujarTabla = () => {
        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => seleccionarColumna("idproveedor")}>Código</th>
                            <th onClick={() => seleccionarColumna("nombreempresa")}>Empresa</th>
                            <th onClick={() => seleccionarColumna("nombrecontacto")}>Contacto</th>
                            <th onClick={() => seleccionarColumna("cargocontacto")}>Cargo</th>
                            <th onClick={() => seleccionarColumna("pais")}>País</th>
                            <th onClick={() => seleccionarColumna("ciudad")}>Ciudad</th>
                            <th>Ver
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProveedoresFiltrados.map(item =>
                            <tr key={item.idproveedor}>
                                <td>{item.idproveedor}</td>
                                <td>{item.nombreempresa}</td>
                                <td>{item.nombrecontacto}</td>
                                <td>{item.cargocontacto}</td>
                                <td>{item.pais}</td>
                                <td>{item.ciudad}</td>
                                <td>
                                    <Button variant="info" onClick={() => mostrarDetalleProveedor(item)}>
                                        <i className="bi bi-eye-fill"></i>
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Ventana emergente */}
                <Modal show={showModal} onHide={cerrarModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalle del Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {proveedorSeleccionado && (
                            <div>
                                <p><strong>Código:</strong> {proveedorSeleccionado.idproveedor}</p>
                                <p><strong>Empresa:</strong> {proveedorSeleccionado.nombreempresa}</p>
                                <p><strong>Contacto:</strong> {proveedorSeleccionado.nombrecontacto}</p>
                                <p><strong>Cargo:</strong> {proveedorSeleccionado.cargocontacto}</p>
                                <p><strong>País:</strong> {proveedorSeleccionado.pais}</p>
                                <p><strong>Ciudad:</strong> {proveedorSeleccionado.ciudad}</p>
                                {/* Agrega más detalles según tus necesidades */}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </>
        );
    };

    const seleccionarColumna = (columna) => {
        let ascendente = estadoAscendente;
        if (columna !== columnaAnterior) {
            ascendente = 1;
        } else {
            ascendente = -ascendente;
        }
        setEstadoAscendente(ascendente);
        console.log(columna);
        const resultado = [...listaProveedoresFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente
        );
        setListaProveedoresFiltrados(resultado);
        setColumnaAnterior(columna);
    };

    const buscarTexto = (event) => {
        let texto = event.target.value;
        setTextoBuscar(texto);
        console.log(texto);
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["cargocontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        );
        setListaProveedoresFiltrados(resultado);
    };

    const mostrarDetalleProveedor = (proveedor) => {
        setProveedorSeleccionado(proveedor);
        setShowModal(true);
    };

    const cerrarModal = () => {
        setProveedorSeleccionado(null);
        setShowModal(false);
    };

    return (
        <>
            <PageHeader titulo="Proveedores" />
            <section id="proveedores" className="padded">
                <div className="container">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Indique expresión a buscar"
                            value={textoBuscar}
                            onChange={(event) => buscarTexto(event)}
                        />
                    </div>
                    {dibujarTabla()}
                </div>
            </section>
        </>
    );
}
export default Proveedores;
