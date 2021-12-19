import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl } from "utils/Axios";
import Policy from "components/Policy";
import { Button, Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
var moment = require("moment");

const ReporteCasosFecha = () => {
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const consultar = async () => {
    console.log(`${fechaInicial} - ${fechaFinal}`);
  };

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
          <Breadcrumb.Item active>Listado de Casos </Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Body style={{ padding: "2.5rem" }}>
            <h2 className="title-line">
              <span>
                Listado de casos atendidos por estudiante por rango de fechas
              </span>
            </h2>
            <Row className="mb-3">
              <Col xs="12" md="5">
                <label>
                  <b>Desde</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha-inicio"
                  value={fechaInicial}
                  onChange={(e) => setFechaInicial(e.target.value)}
                />
              </Col>
              <Col xs="12" md="5">
                <label>
                  <b>Hasta</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha-inicio"
                  value={fechaFinal}
                  onChange={(e) => setFechaFinal(e.target.value)}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end align-items-center">
            <h3 style={{ margin: 0 }}>
              Filtros rapidos <FaFilter />
            </h3>
            <Button
              variant="light"
              onClick={() => {
                setFechaInicial(moment().startOf("year").format("YYYY-MM-DD"));
                setFechaFinal(
                  moment().startOf("year").add(6, "month").format("YYYY-MM-DD")
                );
              }}
            >
              Primer semestre
            </Button>
            <Button
              variant="light"
              onClick={() => {
                setFechaInicial(
                  moment().startOf("year").add(6, "month").format("YYYY-MM-DD")
                );
                setFechaFinal(moment().endOf("year").format("YYYY-MM-DD"));
              }}
            >
              Segundo semestre
            </Button>
            <Button
              variant="light"
              onClick={() => {
                setFechaInicial(moment().startOf("month").format("YYYY-MM-DD"));
                setFechaFinal(moment().endOf("month").format("YYYY-MM-DD"));
              }}
            >
              Este mes
            </Button>
            <Button
              variant="light"
              onClick={() => {
                setFechaInicial(moment().startOf("year").format("YYYY-MM-DD"));
                setFechaFinal(moment().endOf("year").format("YYYY-MM-DD"));
              }}
            >
              Este año
            </Button>
          </Card.Footer>

          <Card.Body>
            <div className="d-flex justify-content-end mt-4">
              <a
                target="_blank"
                href={`${baseUrl}/casos_fecha/${fechaInicial}/${fechaFinal}`}
              >
                <Button size="lg">Consultar</Button>
              </a>
            </div>
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ReporteCasosFecha;
