import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";
import PageHeader from "../components/PageHeader";
function Directores() {
    const [listaDirectores, setListaDirectores] = useState([])
    const [iddirector, setIddirector] = useState("")
    const [nombres, setNombres] = useState("")
    const [peliculas, setPeliculas] = useState("")

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "directores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaDirectores(data)
            })
    }
    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Director</th>
                        <th>Películas</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaDirectores.map(item =>
                        <tr key={item.iddirector} 
                            onMouseEnter={(event) => mostrarIconosEdicion(event)}
                            onMouseLeave={(event) => ocultarIconosEdicion(event)}>
                            <td>{item.iddirector}</td>
                            <td>{item.nombres}</td>
                            <td>{item.peliculas}</td>
                            <td><i className="bi bi-pencil" title="Editar"
                                onClick={() => llenarCampos(item)}
                                data-bs-toggle="modal" data-bs-target="#updateModal"></i></td>
                            <td><i className="bi bi-x-lg" title="Eliminar"
                                onClick={() => llenarCampos(item)}
                                data-bs-toggle="modal" data-bs-target="#deleteModal"></i></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const mostrarIconosEdicion = (event) => {
        event.currentTarget.classList.add("mostrarIconos")
    }
    const ocultarIconosEdicion = (event) => {
        event.currentTarget.classList.remove("mostrarIconos")
    }

    const llenarCampos = (item) => {
        console.log(item)
        setIddirector(item.iddirector)
        setNombres(item.nombres)
        setPeliculas(item.peliculas)
    }

    const dibujarInsertModal = () => {
        return (
            <div className="modal fade" id="insertModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Nuevo director</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => insertDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)}
                                        required minLength="2" maxLength="50"
                                        placeholder="Nombres director" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)}
                                        required minLength="4" maxLength="100"
                                        placeholder="Películas" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const dibujarUpdateModal = () => {
        return (
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Actualizar director</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => updateDirector(event)}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control"
                                        value={iddirector}
                                        readOnly />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control"
                                        value={nombres} onChange={(event) => setNombres(event.target.value)}
                                        required minLength="2" maxLength="50"
                                        placeholder="Nombres director" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control"
                                        value={peliculas} onChange={(event) => setPeliculas(event.target.value)}
                                        required minLength="4" maxLength="100"
                                        placeholder="Películas" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const dibujarDeleteModal = () => {
        return (
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Eliminar director</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={(event) => deleteDirector(event)}>
                            <div className="modal-body">
                                ¿Está seguro que desea eliminar al director <strong>{nombres}</strong>?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Si, eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    const insertDirector = (event) => {
        event.preventDefault()
        console.log(nombres + " - - " + peliculas)
        const rutaServicio = ApiWebURL + "directoresinsert.php";

        let formData = new FormData()
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                document.querySelector("#insertModal .btn-close").click()
                setNombres("")
                setPeliculas("")
                leerServicio()
            })
    }
    const updateDirector = (event) => {
        event.preventDefault()
        console.log(iddirector + " - - - " + nombres + " - - " + peliculas)
        const rutaServicio = ApiWebURL + "directoresupdate.php";

        let formData = new FormData()
        formData.append("iddirector", iddirector)
        formData.append("nombres", nombres)
        formData.append("peliculas", peliculas)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                document.querySelector("#updateModal .btn-close").click()
                setIddirector("")
                setNombres("")
                setPeliculas("")
                leerServicio()
            })
    }

    const deleteDirector = (event) => {
        event.preventDefault()
        console.log(iddirector + " - - - " + nombres + " - - " + peliculas)
        const rutaServicio = ApiWebURL + "directoresdelete.php";

        let formData = new FormData()
        formData.append("iddirector", iddirector)

        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                document.querySelector("#deleteModal .btn-close").click()
                setIddirector("")
                setNombres("")
                setPeliculas("")
                leerServicio()
            })
    }

    return (
        <>
            <PageHeader titulo="Directores" />
            <section id="directores" className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#insertModal">
                            Nuevo director
                        </button>
                    </div>
                    {dibujarTabla()}
                    {dibujarInsertModal()}
                    {dibujarUpdateModal()}
                    {dibujarDeleteModal()}
                </div>
            </section>
        </>
    )
}

export default Directores