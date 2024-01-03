import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader"
import"./Pedidos.css"
import"./PedidosDetalle.css"



function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://servicios.campus.pe/pedidos.php");
        const data = await response.json(); // Asumiendo que la respuesta es en formato JSON

        // Ajusta la estructura de datos según la respuesta real del servidor
        setPedidos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 // Para Filtrar los pedidos según el término de búsqueda

  const filteredPedidos = pedidos.filter((pedido) =>
  pedido.nombres.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const redirectToPedidosDetalle = (idpedido) => {
    // Puedes redirigir a la página de detalle de pedidos utilizando el componente Link
    // Asegúrate de tener configuradas las rutas correctamente en tu archivo de enrutamiento (normalmente App.js o similar)
    // En este ejemplo, se asume que existe una ruta llamada "/pedidos/:id" para mostrar detalles de un pedido específico.
    return `/pedidosdetalle/${idpedido}`;
  };



  return (
    <>
      <PageHeader titulo="Pedidos" />
      <section id="pedidos" className="padded">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="searchInput" className="form-label">
                  Buscar:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="searchInput"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombres</th>
                    <th>Usuario</th>
                    <th>Fecha de Pedido</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                {filteredPedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>
                        {/* Utiliza Link para crear un enlace a la página "pedidosDetalle" */}
                        <Link to={`/pedidosDetalle/${pedido.idpedido}`}>
                          {pedido.idpedido}
                        </Link>
                      </td>
                      <td>{pedido.nombres}</td>
                      <td>{pedido.usuario}</td>
                      <td>{pedido.fechapedido}</td>
                      <td>{pedido.total}</td>
                    </tr>
              
 
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Pedidos