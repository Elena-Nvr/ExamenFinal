import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
function Football() {
    const [listaLigas, setListaLigas] = useState([])
    const [cargando, setCargando] = useState(true)
    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const apikey = import.meta.env.VITE_API_KEY    
        let myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", apikey);
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://v3.football.api-sports.io/leagues", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.response)
                setListaLigas(result.response)
                setCargando(false)
            })
            .catch(error => console.log('error', error));
    }
    /*
        function dibujarTabla(){
        }
    */

    const dibujarPrecarga = () => {
        return(
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }
    
    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Liga</th>
                        <th>Logo</th>
                        <th>País</th>
                        <th>Bandera</th>
                        <th>Temporadas</th>
                    </tr>
                </thead>
                <tbody>
                    {listaLigas.map((item, index) =>
                        <tr key={index}>
                            <td>{item.league.name}</td>
                            <td><img src={item.league.logo} alt="" className="bandera"/></td>
                            <td>{item.country.name}</td>
                            <td><img src={item.country.flag} alt="" className="bandera"/></td>
                            <td>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Año</th>
                                            <th>Inicio</th>
                                            <th>Fin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.seasons.map((temporada,index) =>
                                            <tr key={index}>
                                                <td>{temporada.year}</td>
                                                <td>{temporada.start}</td>
                                                <td>{temporada.end}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <PageHeader titulo="Fútbol" />
            <section id="football" className='padded'>
                <div className="container">
                    {cargando === true
                        ? dibujarPrecarga()
                        : dibujarTabla()
                    }
                </div>
            </section>
        </>
    )
}

export default Football