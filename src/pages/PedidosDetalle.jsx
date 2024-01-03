import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PageHeader from "../components/PageHeader";
import"./PedidosDetalle.css"
function PedidosDetalle() {
  const [detallePedido, setDetallePedido] = useState([]);
  const { idpedido } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetallePedido = async () => {
      try {
        const response = await fetch(`https://servicios.campus.pe/pedidosdetalle.php?idpedido=${idpedido}`);
        const data = await response.json();

        // Ajusta la estructura según la respuesta real del servidor
        setDetallePedido(data);
      } catch (error) {
        console.error("Error fetching detalle pedido:", error);
        setError("Error fetching detalle pedido. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetallePedido();
  }, [idpedido]);

  useEffect(() => {
    // Muestra en la consola los datos recibidos
    console.log("Detalle del Pedido:", detallePedido);
  }, [detallePedido]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (detallePedido.length === 0) {
    return <p>No se encontraron detalles para este pedido.</p>;
  }

  return (
    <>
      <PageHeader titulo={`Detalle del Pedido ${idpedido}`} />
      <section id="pedidosDetalle" className='padded'>
        <div className="container">
          <div className="row row-cols-xxl-3 row-cols-xl-2 row-cols-md-1 g-4">
            {detallePedido.map(item => (
              <div className="col" key={item.idproducto}>
                <div className="card h-100">
                  <img
                    src={`https://servicios.campus.pe/${item.imagenchica}`}
                    className="card-img-top"
                    alt={item.nombre}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text">ID Pedido: {item.idpedido}</p>
                    <p className="card-text">ID Producto: {item.idproducto}</p>
                    <p className="card-text">Precio: {item.precio}</p>
                    <p className="card-text">Cantidad: {item.cantidad}</p>
                    <p className="card-text">Detalle: {item.detalle}</p>
                    {/* Agrega otros detalles según sea necesario */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default PedidosDetalle;

