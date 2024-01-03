/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { ApiWebURL, agregarCarrito } from "../utils"
import nofoto from "./../assets/images/nofoto.jpg"
import "./Productos.css"
import { Link } from "react-router-dom"

function Productos(props) {
    console.log(props)
    const [listaProductos, setListaProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [cantidadProducto, setCantidadProducto] = useState(1)

    useEffect(() => {
        leerServicio(props.categoriaProductos)
    }, [props.categoriaProductos])

    const leerServicio = (idcategoria) => {
        const rutaServicio = ApiWebURL + "productos.php?idcategoria=" + idcategoria;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaProductos(data)
            })
    }

    const leerProductoSeleccionado = (idproducto) => {
        document.querySelector("#vistaRapidaModal img").setAttribute("src", "")
        const rutaServicio = ApiWebURL + "productos.php?idproducto=" + idproducto;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProductoSeleccionado(data[0])
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4">
                {listaProductos.map(item =>
                    <div className="col" key={item.idproducto}>
                        <div className="card h-100"
                            onMouseEnter={(event) => mostrarVistaRapida(event)}
                            onMouseLeave={(event) => ocultarVistaRapida(event)}>
                            <Link to={"/productodetalle/" + item.idproducto}>
                                <img src={item.imagenchica === null
                                    ? nofoto
                                    : ApiWebURL + item.imagenchica}
                                    className="card-img-top" alt="..." />
                            </Link>
                            {item.preciorebajado !== "0"
                                ? <div className="porcentaje-descuento">
                                    -{((1 - (item.preciorebajado / item.precio)) * 100).toFixed(0)}%
                                </div>
                                : ""
                            }

                            <i className="bi bi-eye"
                                onClick={() => leerProductoSeleccionado(item.idproducto)}
                                data-bs-toggle="modal" data-bs-target="#vistaRapidaModal"></i>

                            <div className="card-body">
                                <p className="card-text text-center">{item.nombre}</p>
                                <p className="card-text text-center">S/
                                    {item.preciorebajado === "0"
                                        ? parseFloat(item.precio).toFixed(2)
                                        : parseFloat(item.preciorebajado).toFixed(2)}
                                    <span className="precio-anterior">
                                        {item.preciorebajado === "0"
                                            ? ""
                                            : "S/" + parseFloat(item.precio).toFixed(2)}</span>
                                    <i className="bi bi-basket" title="Añadir al carrito"
                                        onClick = {() => agregarCarrito(item)}></i></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }



    const mostrarVistaRapida = (event) => {
        event.currentTarget.querySelector(".bi-eye").classList.add("bi-eye-final")
    }
    const ocultarVistaRapida = (event) => {
        event.currentTarget.querySelector(".bi-eye").classList.remove("bi-eye-final")
    }

    const dibujarVistaRapida = () => {
        return (
            <div className="modal fade" id="vistaRapidaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">{productoSeleccionado.nombre}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <img src={productoSeleccionado.imagengrande === null
                                        ? nofoto
                                        : ApiWebURL + productoSeleccionado.imagengrande}
                                        className="img-fluid" alt="..." />
                                </div>
                                <div className="col">
                                    <table className="table">
                                        <tbody>
                                            <tr><th>Detalle</th><td>{productoSeleccionado.detalle}</td></tr>
                                            <tr><th>Proveedor</th><td>{productoSeleccionado.proveedor}</td></tr>
                                            <tr><th>Precio</th><td>S/
                                                {productoSeleccionado.preciorebajado === "0"
                                                    ? parseFloat(productoSeleccionado.precio).toFixed(2)
                                                    : parseFloat(productoSeleccionado.preciorebajado).toFixed(2)}
                                                <span className="precio-anterior">
                                                    {productoSeleccionado.preciorebajado === "0"
                                                        ? ""
                                                        : "S/" + parseFloat(productoSeleccionado.precio).toFixed(2)}</span></td></tr>
                                            <tr><th>Cantidad</th><td>
                                                <input type="number" className="form-control"
                                                    value={cantidadProducto} 
                                                    onChange={(event) => setCantidadProducto(event.target.value)}
                                                    min="1"/></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                data-bs-dismiss="modal" 
                                onClick={() => agregarCarrito(productoSeleccionado, cantidadProducto)}>Añadir al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {dibujarCuadricula()}
            {dibujarVistaRapida()}
        </>
    )
}

export default Productos