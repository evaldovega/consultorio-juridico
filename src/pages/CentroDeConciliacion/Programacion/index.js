import React, { useEffect, useState } from 'react'
import Page from "components/Page";
import Policy from "components/Policy";
import { ROL_ADMIN } from "constants/apiContants";
import Spin from "components/Spin";
import API, { baseUrl } from "utils/Axios";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanConciliacion from "components/MigaPan/CentroConciliacion";
import { Card, Table } from 'react-bootstrap'

const moment = require('moment')

const Programacion = () => {
    const [agendas, setAgendas] = useState([])
    const [loading, setLoading] = useState(false)

    const getAgendas = async () => {
        try {
            setLoading(true)
            const { data } = await API('/conciliacion/agenda/?proximas=1')
            setAgendas(data.results)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAgendas()
    }, [])

    return (
        <Policy policy={[ROL_ADMIN]}>
            <Page>
                <Spin cargando={loading}>
                    <MigaPan>
                        <MigaPanInicio />
                        <MigaPanConciliacion />
                        <span>Programación</span>
                    </MigaPan>
                    <Card>
                        <Card.Body>
                            <h2>Próximas citas de conciliación</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Fecha y hora de inicio</th>
                                        <th>Fecha y hora de fin</th>
                                        <th>Modalidad</th>
                                        <th>Sala</th>
                                        <th>Enlace</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agendas.map((el, i) => (
                                        <tr key={i}>
                                            <td>
                                                {moment(el?.d_fechaInicialAudiencia).format("DD/MMMM/YYYY hh:mm a")}
                                            </td>
                                            <td>
                                                {moment(el?.d_fechaFinalAudiencia).format("DD/MMMM/YYYY hh:mm a")}
                                            </td>
                                            <td>
                                                {el?.c_modalidad}
                                            </td>
                                            <td>
                                                {el?.r_config_salaConciliacion?.a_titulo || "-"}
                                            </td>
                                            <td>
                                                {el.a_enlaceVirtual ? <a href={el?.a_enlaceVirtual}>{el?.a_enlaceVirtual}</a> : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Spin>
            </Page>
        </Policy>
    )
}

export default Programacion