import PageHeader from "../components/PageHeader"
import Productos from "../components/Productos"
import { ApiWebURL } from "../utils"
import "./Tienda.css"
import { useEffect, useState } from "react"

function Tienda() {
    const [listaCategorias, setListaCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "categorias.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaCategorias(data)
                seleccionarCategoria(null, data[0])
            })
    }

    const dibujarLista = () => {
        return (
            <ul className="list-group" id="lista-categorias">
                {listaCategorias.map(item =>
                    <li key={item.idcategoria}
                        title={item.descripcion}
                        onClick={(event) => seleccionarCategoria(event, item)}
                        className="list-group-item position-relative">
                        {item.nombre}
                        <span className="badge text-bg-secondary position-absolute end-0">{item.total}</span>
                    </li>
                )}
            </ul>
        )
    }

    const seleccionarCategoria = (event, item) => {
        console.log(item)
        setCategoriaSeleccionada(item)
        let itemsLista = document.querySelectorAll("#lista-categorias li")
        itemsLista.forEach(item => item.classList.remove("active"))
        //event.currentTarget es el objeto que recibe el evento
        if (event !== null) {
            event.currentTarget.classList.add("active");
        }
        else {
            document.querySelector("#lista-categorias li").classList.add("active");
        }
    }

    return (
        <>
            <PageHeader titulo="Tienda" />
            <section id="tienda" className='padded'>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-md-4">
                            <h3>Categorías</h3>
                            {dibujarLista()}
                        </div>
                        <div className="col-xxl-9 col-md-8">
                            <h3>{categoriaSeleccionada.nombre}</h3>
                            <p>{categoriaSeleccionada.descripcion}</p>
                            <Productos categoriaProductos={categoriaSeleccionada.idcategoria} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tienda