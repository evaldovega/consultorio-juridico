import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl } from "utils/Axios";
import Policy from "components/Policy";
import { FaFilter, FaBolt } from "react-icons/fa";
import { Button, Breadcrumb, Card, InputGroup } from "react-bootstrap";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import MigaPanAsesoriaJuridicaReportes from "components/MigaPan/AsesoriaJuridicaReportes";
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";
var moment = require("moment");

const ReporteRegistrados = () => {
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const consultar = async () => {
    console.log(`${fechaInicial} - ${fechaFinal}`);
  };

  return (
    <Policy policy={[]}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanInscripcionEstudiante />
          <MigaPanAsesoriaJuridicaReportes />
          <span>Listado de Registrados o inscripciones</span>
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
                <Button
                  href={`${baseUrl}/registrados_fecha/${fechaInicial}/${fechaFinal}`}
                  size="md"
                >
                  Generar reporte de inscripciones
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ReporteRegistrados;
