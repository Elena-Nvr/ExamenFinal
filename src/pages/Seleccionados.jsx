import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { ApiWebURL } from '../utils'
import "./Seleccionados.css"
function Seleccionados() {
  const location = useLocation();
  const { state } = location;

  return (
    <>
      <PageHeader titulo="selecionados" />
      <section id="tabla" className="padded">
      <Link to="/">Volver a la página principal</Link>
      {state && state.empleadosSeleccionados && state.empleadosSeleccionados.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {state.empleadosSeleccionados.map((empleado) => (
              <tr key={empleado.idempleado}>
                <td>
                  <img
                    src={`${ApiWebURL}fotos/${empleado.foto}`}
                    alt="Foto"
                    className="thumbnail-image" // Apply the CSS class
                  />
                </td>
                <td>{empleado.nombres}</td>
                <td>{empleado.apellidos}</td>
                <td>{empleado.cargo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay empleados seleccionados.</p>
      )}</section>
    </>
  )
}

export default Seleccionados

