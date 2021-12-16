import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import Policy from "components/Policy";
import { Button, Breadcrumb, Card, Col, Row } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

Chart.register(ArcElement)

var moment = require('moment')

const ReportePorEdad = () => {
    const [fechaInicial, setFechaInicial] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [datos, setDatos] = useState("")

    const consultar = async () => {
        API(`estudiantes/inscripcion/edad/?fechainicial=${fechaInicial}&fechafinal=${fechaFinal}`)
            .then(response => {
                console.log(response.data)
                setDatos(response.data)
            }).catch(err => {
                console.log(err.response.data)
            })
    }

    const chartdata = {
        labels: ["Menores de 25", "Entre 26 y 60", "Mayores de 60"],
        datasets: [
            {
                label: 'Edades',
                data: [datos.menores_de_25, datos.entre_26_y_60, datos.mayores_de_60],
                backgroundColor: [
                    'rgb(153, 153, 153)',
                    'rgb(124, 181, 236)',
                    'rgb(124, 181, 12)'
                ],
            },
        ]
    }

    return (
        <Policy policy={[]}>
            <Page>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/asesoria-juridica">Asesoría jurídica</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/asesoria-juridica/reportes">Reportes</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Por edad</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Card.Body style={{ padding: "2.5rem" }}>
                        <h2 className="title-line">
                            <span>Cantidad de estudiantes por edad y rango de fechas</span>
                        </h2>
                        <Row className="mb-3">
                            <Col xs="12" md="5">
                                <label><b>Desde</b></label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha-inicio"
                                    onChange={e => setFechaInicial(e.target.value)}
                                />
                            </Col>
                            <Col xs="12" md="5">
                                <label><b>Hasta</b></label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fecha-inicio"
                                    onChange={e => setFechaFinal(e.target.value)}
                                />
                            </Col>
                            <Col xs="12" md="2">
                                <Button onClick={() => consultar()} size="md" style={{
                                    marginTop: "30px",
                                    height: "40px",
                                    width: "120px"
                                }}>
                                    Consultar
                                </Button>
                            </Col>
                        </Row>
                        {datos !== "" && (
                            <div style={{
                                marginTop: "40px",
                                width: "100%",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: "70px"
                            }}>
                                <div style={{
                                    height: "40%",
                                    width: "40%"
                                }}>
                                    <Pie
                                        data={chartdata}
                                        style={{
                                            marginRight: "30px"
                                        }}
                                    />
                                </div>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <div style={{
                                            height: "20px",
                                            width: "20px",
                                            borderRadius: "100px",
                                            backgroundColor: 'rgb(153, 153, 153)',
                                            marginRight: "10px"
                                        }} />
                                        <span>Menores de 25: {datos.menores_de_25}</span>
                                    </div>
                                    <br />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <div style={{
                                            height: "20px",
                                            width: "20px",
                                            borderRadius: "100px",
                                            backgroundColor: 'rgb(124, 181, 236)',
                                            marginRight: "10px"
                                        }} />
                                        <span>Entre 26 y 60: {datos.entre_26_y_60}</span>
                                    </div>
                                    <br />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                        <div style={{
                                            height: "20px",
                                            width: "20px",
                                            borderRadius: "100px",
                                            backgroundColor: 'rgb(124, 181, 12)',
                                            marginRight: "10px"
                                        }} />
                                        <span>Mayores de 60 {datos.mayores_de_60}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Page>
        </Policy>
    );
};

export default ReportePorEdad;
