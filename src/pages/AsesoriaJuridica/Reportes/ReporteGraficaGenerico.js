import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Page from "components/Page";
import API from "utils/Axios";
import Policy from "components/Policy";
import { FaFilter, FaBolt } from "react-icons/fa";
import { Button, Breadcrumb, Card, InputGroup, Table } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import MigaPanAsesoriaJuridicaReportes from "components/MigaPan/AsesoriaJuridicaReportes";
import { MDBDataTableV5 } from 'mdbreact';

Chart.register(ChartDataLabels);
Chart.register(ArcElement);

var moment = require("moment");

const ReporteGraficaGenerico = (props) => {
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [datos, setDatos] = useState([]);
  const [datosTabla, setDatosTabla] = useState([]);
  const { tiporeporte: tipoReporte } = useParams();

  const consultar = async () => {
    API(
      `asesorias/solicitud/${tipoReporte}/?fechainicial=${fechaInicial}&fechafinal=${fechaFinal}`
    )
      .then((response) => {
        console.log(response.data);
        setDatos(response.data.grafica);
        setDatosTabla(response.data.listado_ciudadanos);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const chartdata = {
    labels: ["Masculino", "Femenino"],
    datasets: [
      {
        label: "Orientaciones",
        data: datos.map((el) => el.cantidad),
        backgroundColor: datos.map((el) => el.color),
      },
    ],
  };

  useEffect(() => {
    console.log(datos)
  }, [])

  return (
    <Policy policy={[]}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanAsesoriaJuridica />
          <MigaPanAsesoriaJuridicaReportes />
          <span>Por {tipoReporte.replace("_", " ")}</span>
        </MigaPan>
        <Card>
          <Card.Body style={{ padding: "2.5rem" }}>
            <div className="d-flex justify-content-end align-items-center mb-4">
              <div className="circle-icon mr-4">
                <FaFilter />
              </div>
              <FaBolt style={{ fill: "#bbbb54" }} title="" />
              <span className="mr-2">Aplicar filtro rápidos</span>
              <Button
                variant="light"
                onClick={() => {
                  setFechaInicial(
                    moment().startOf("year").format("YYYY-MM-DD")
                  );
                  setFechaFinal(
                    moment()
                      .startOf("year")
                      .add(6, "month")
                      .format("YYYY-MM-DD")
                  );
                }}
              >
                Primer semestre
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  setFechaInicial(
                    moment()
                      .startOf("year")
                      .add(6, "month")
                      .format("YYYY-MM-DD")
                  );
                  setFechaFinal(moment().endOf("year").format("YYYY-MM-DD"));
                }}
              >
                Segundo semestre
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  setFechaInicial(
                    moment().startOf("month").format("YYYY-MM-DD")
                  );
                  setFechaFinal(moment().endOf("month").format("YYYY-MM-DD"));
                }}
              >
                Este mes
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  setFechaInicial(
                    moment().startOf("year").format("YYYY-MM-DD")
                  );
                  setFechaFinal(moment().endOf("year").format("YYYY-MM-DD"));
                }}
              >
                Este año
              </Button>
            </div>

            <InputGroup className="mb-3">
              <input
                type="date"
                className="form-control"
                name="fecha-inicio"
                value={fechaInicial}
                placeholder="Fecha inicial"
                onChange={(e) => setFechaInicial(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                name="fecha-inicio"
                value={fechaFinal}
                placeholder="Fecha final"
                onChange={(e) => setFechaFinal(e.target.value)}
              />
              <InputGroup.Append>
                <Button onClick={() => consultar()} size="md">
                  Generar reporte
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>

          <Card.Body>
            {datos !== [] && (
              <div
                style={{
                  marginTop: "40px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "70px",
                }}
              >
                <div
                  style={{
                    height: "40%",
                    width: "40%",
                  }}
                >
                  <Pie
                    data={chartdata}
                    style={{
                      marginRight: "30px",
                    }}
                    options={{
                      plugins: {
                        datalabels: {
                          formatter: function (value, context) {
                            const total = context.dataset.data.reduce(
                              (a, b) => a + b,
                              0
                            );
                            return Math.round((value / total) * 100) + "%";
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div>
                  {datos.map((el) => (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            height: "20px",
                            width: "20px",
                            borderRadius: "100px",
                            backgroundColor: el.color,
                            marginRight: "10px",
                          }}
                        />
                        <span>
                          {el.nombre}: {el.cantidad}
                        </span>
                      </div>
                      <br />
                    </div>
                  ))}
                  {/* <div style={{
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
                                        <span>Masculino: {datos.hombres}</span>
                                    </div> */}
                </div>
              </div>
            )}
            {datos !== [] && (
              <div style={{
                marginTop: "10px"
              }}>
                <MDBDataTableV5
                  entriesOptions={[10, 20, 25]}
                  entries={10}
                  paginationLabel={["<", ">"]}
                  data={{
                    columns: [
                      {
                        label: 'Nombre',
                        field: 'nombre_completo'
                      },
                      {
                        label: tipoReporte[0].toUpperCase() + tipoReporte.slice(1),
                        field: 'atributo'
                      }
                    ],
                    rows: datosTabla.map((el) => (
                      {
                        "nombre_completo": el.nombre_completo,
                        "atributo": el.atributo
                      }
                    ))
                  }}
                />
              </div>
            )}
            {/* {datos !== "" && (
              <Table striped bordered hover style={{marginTop: "20px"}}>
                  <thead>
                    <tr>
                      <th>Nombre completo</th>
                      <th>{tipoReporte[0].toUpperCase() + tipoReporte.slice(1)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosTabla.map((el) => (
                      <tr>
                        <td>{el.nombre_completo}</td>
                        <td>{el.orientacion}</td>
                      </tr>
                    ))}
                  </tbody>
              </Table>
            )} */}
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ReporteGraficaGenerico;
