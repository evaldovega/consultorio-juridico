import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import Policy from "components/Policy";
import { Button, Breadcrumb, Card, InputGroup } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { FaFilter, FaBolt } from "react-icons/fa";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import MigaPanAsesoriaJuridicaReportes from "components/MigaPan/AsesoriaJuridicaReportes";
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";
Chart.register(ChartDataLabels);

var _ = require("lodash");

Chart.register(ArcElement);

var moment = require("moment");

const ReportePorDiscapacidad = () => {
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [datos, setDatos] = useState([]);

  const consultar = async () => {
    await API(
      `estudiantes/inscripcion/discapacidades/?fechainicial=${fechaInicial}&fechafinal=${fechaFinal}`
    )
      .then((response) => {
        console.log(response.data);
        let datosgroup = _(response.data)
          .groupBy("nombre")
          .map((value, key) => ({
            nombre: key,
            cantidad: value.length,
            color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
          }));
        let groupArray = _.toArray(datosgroup);
        console.log(groupArray);
        setDatos(groupArray);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const chartdata = {
    labels: ["Menores de 25", "Entre 26 y 60", "Mayores de 60"],
    datasets: [
      {
        label: "Discapacidades",
        data: datos.map((el) => el.cantidad),
        backgroundColor: datos.map((el) => el.color),
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
          <span>Por discapacidad</span>
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
                  Generar reporte por discapacidades
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>

          <Card.Body>
            {datos.length ? (
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
                          {el.nombre} {el.cantidad}
                        </span>
                      </div>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ReportePorDiscapacidad;
