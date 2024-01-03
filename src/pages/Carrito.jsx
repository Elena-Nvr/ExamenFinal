/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
function Carrito() {
    const [listaItems, setListaItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        leerDatosCarrito()
    }, [])

    const leerDatosCarrito = () => {
        let datosCarrito = JSON.parse(sessionStorage.getItem("carritocompras"))
        console.log(datosCarrito)
        setListaItems(datosCarrito)
        if (datosCarrito !== null) {
            calcularTotal(datosCarrito)
        }
    }

    const calcularTotal = (datosCarrito) => {
        let sumaTotal = datosCarrito.reduce((acumulador, fila) => acumulador + fila["precio"] * fila["cantidad"], 0)
        setTotal(sumaTotal)
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th className="text-end">Precio</th>
                        <th className="text-end">Cantidad</th>
                        <th className="text-end">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaItems !== null
                        ? listaItems.map(item =>
                            <tr key={item.idproducto}>
                                <td>{item.idproducto}</td>
                                <td>{item.nombre}</td>
                                <td className="text-end">{parseFloat(item.precio).toFixed(2)}</td>
                                <td className="text-end">{item.cantidad}</td>
                                <td className="text-end">{parseFloat(item.precio * item.cantidad).toFixed(2)}</td>
                                <td><i className="bi bi-x-lg eliminar-item" title="Eliminar item"
                                    onClick={() => eliminarItem(item)}></i></td>
                            </tr>
                        )
                        : <></>
                    }
                </tbody>
            </table>
        )
    }

    const eliminarItem = (item) => {
        let carritoMenos = listaItems.filter(itemCart => itemCart.idproducto !== item.idproducto) 
        setListaItems(carritoMenos)
        sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos))
        calcularTotal(carritoMenos)
    }

    const vaciarCarrito = () => {
        setListaItems([])
        sessionStorage.removeItem("carritocompras")
        setTotal(0)
    }

    return (
        <>
            <PageHeader titulo="Carrito de compras" />
            <section id="proveedores" className='padded'>
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            {dibujarTabla()}
                            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>Vaciar carrito</button>
                        </div>
                        <div className="col-3">
                            <div className="card border-primary mb-3">
                                <div className="card-header">Totales</div>
                                <div className="card-body text-primary">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Total:</th><td className="text-end">S/ {total.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Carrito