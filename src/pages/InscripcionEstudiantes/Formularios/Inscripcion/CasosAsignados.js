import Errors from "components/Errors";
import LugarPractica from "components/LugarPracticas";
import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Form, Table } from "react-bootstrap";
import { Controller } from "react-hook-form";
import API from "utils/Axios";
import Context from "./Ctx";

const CasosAsignados = ({id}) => {
    const [casos, setCasos] = useState([])

    const load = async () => {
        const { data } = await API.get(`asesorias/solicitud/?persona=${id}&page_size=100`)
        setCasos(data.results)
    }

    useEffect(() => {
        load()
    }, [])

    return(
        <>
            {casos !== [] && (
                <Card style={{marginTop: "20px"}}>
                    <Card.Body>
                        <h2>Casos asignados del estudiante</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Caso jurídico</th>
                                    <th>Fecha y hora de la asesoría</th>
                                </tr>
                            </thead>
                            <tbody>
                                {casos.map((el, i) => (
                                    <tr>
                                        <th>
                                            <a href={`/asesoria-juridica/caso/${el.id}`}>
                                                {el.id}
                                            </a>
                                        </th>
                                        <th>{el.dt_fechaAsesoria} {el.ht_horaAsesoria}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}

export default CasosAsignados