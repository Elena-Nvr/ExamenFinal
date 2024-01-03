import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiWebURL, agregarCarrito } from "../utils"
import PageHeader from "../components/PageHeader"
import nofoto from "./../assets/images/nofoto.jpg"

function ProductoDetalle() {
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [cantidadProducto, setCantidadProducto] = useState(1)

    useEffect(() => {
        leerServicio()
    }, [])

    let params = useParams()
    console.log(params)

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "productos.php?idproducto=" + params.idproducto;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProductoSeleccionado(data[0])
            })
    }
    return (
        <>
            <PageHeader titulo={productoSeleccionado.nombre} />
            <section id="inversiones" className='padded'>
                <div className="container">
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
                                    <tr><th>Categoría</th><td>{productoSeleccionado.categoria}</td></tr>
                                    <tr><th>Stock</th><td>{productoSeleccionado.unidadesenexistencia}</td></tr>
                                    <tr><th>País</th><td>{productoSeleccionado.pais}</td></tr>
                                    <tr><th>Atención al cliente</th><td>{productoSeleccionado.telefono}</td></tr>
                                    <tr><th>Cantidad</th><td>
                                                <input type="number" className="form-control"
                                                    value={cantidadProducto} 
                                                    onChange={(event) => setCantidadProducto(event.target.value)}
                                                    min="1"/></td></tr>
                                </tbody>
                            </table>
                            <div className="mb-3">
                                <button type="button" className="btn btn-primary"
                                    onClick={() => agregarCarrito(productoSeleccionado, cantidadProducto)}>Añadir al carrito</button>
                            </div>
                            <h3>Descripción</h3>
                            <div dangerouslySetInnerHTML={{ __html: productoSeleccionado.descripcion}}></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductoDetalle