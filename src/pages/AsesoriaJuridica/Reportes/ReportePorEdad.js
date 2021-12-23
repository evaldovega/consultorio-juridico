import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import Policy from "components/Policy";
import { FaBolt, FaFilter } from "react-icons/fa";
import {
  Button,
  Breadcrumb,
  Card,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPan from "components/MigaPan";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import MigaPanAsesoriaJuridicaReportes from "components/MigaPan/AsesoriaJuridicaReportes";
Chart.register(ChartDataLabels);
Chart.register(ArcElement);

var moment = require("moment");

const ReportePorEdad = () => {
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [datos, setDatos] = useState("");

  const consultar = async () => {
    API(
      `estudiantes/inscripcion/edad/?fechainicial=${fechaInicial}&fechafinal=${fechaFinal}`
    )
      .then((response) => {
        console.log(response.data);
        setDatos(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const chartdata = {
    labels: ["Menores de 25", "Entre 26 y 60", "Mayores de 60"],
    datasets: [
      {
        label: "Edades",
        data: [datos.menores_de_25, datos.entre_26_y_60, datos.mayores_de_60],
        backgroundColor: [
          "rgb(153, 153, 153)",
          "rgb(124, 181, 236)",
          "rgb(124, 181, 12)",
        ],
      },
    ],
  };

  return (
    <Policy policy={[]}>
      <Page>
        <MigaPan>
          <MigaPanInicio></MigaPanInicio>
          <MigaPanAsesoriaJuridica />
          <MigaPanAsesoriaJuridicaReportes />
          <span>Por edad</span>
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
                  Generar reporte por edad
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
                        backgroundColor: "rgb(153, 153, 153)",
                        marginRight: "10px",
                      }}
                    />
                    <span>Menores de 25: {datos.menores_de_25}</span>
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
                        backgroundColor: "rgb(124, 181, 236)",
                        marginRight: "10px",
                      }}
                    />
                    <span>Entre 26 y 60: {datos.entre_26_y_60}</span>
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
                        backgroundColor: "rgb(124, 181, 12)",
                        marginRight: "10px",
                      }}
                    />
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
