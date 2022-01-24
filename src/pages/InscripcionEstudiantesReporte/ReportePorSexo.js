import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";
import MigaPanAsesoriaJuridicaReportes from "components/MigaPan/AsesoriaJuridicaReportes";
Chart.register(ChartDataLabels);
Chart.register(ArcElement);

var moment = require("moment");

const ReportePorSexo = () => {
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [datos, setDatos] = useState("");
  const [datosTabla, setDatosTabla] = useState([]);

  const consultar = async () => {
    API(
      `estudiantes/inscripcion/genero/?fechainicial=${fechaInicial}&fechafinal=${fechaFinal}`
    )
      .then((response) => {
        console.log(response.data);
        setDatos(response.data.grafica);
        setDatosTabla(response.data.listado_estudiantes);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const chartdata = {
    labels: ["Masculino", "Femenino"],
    datasets: [
      {
        label: "Géneros",
        data: [datos.hombres, datos.mujeres],
        backgroundColor: ["rgb(153, 153, 153)", "rgb(124, 181, 236)"],
      },
    ],
  };

  return (
    <Policy policy={[]}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanInscripcionEstudiante />
          <MigaPanAsesoriaJuridicaReportes />
          <span>Por sexo</span>
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
                  Generar reporte por sexo
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>

          <Card.Body>
            {datos !== "" && (
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
                        backgroundColor: "rgb(124, 181, 236)",
                        marginRight: "10px",
                      }}
                    />
                    <span>Femenino: {datos.mujeres}</span>
                  </div>
                  <br />
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
                        backgroundColor: "rgb(153, 153, 153)",
                        marginRight: "10px",
                      }}
                    />
                    <span>Masculino: {datos.hombres}</span>
                  </div>
                </div>
              </div>
            )}
            {datos !== "" && (
              <Table striped bordered hover style={{marginTop: "20px"}}>
                  <thead>
                    <tr>
                      <th>Nombre completo</th>
                      <th>Periodo</th>
                      <th>Género</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosTabla.map((el) => (
                      <tr>
                        <td>{el.nombre_completo}</td>
                        <td>{el.periodo}</td>
                        <td>{el.genero}</td>
                      </tr>
                    ))}
                  </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ReportePorSexo;
