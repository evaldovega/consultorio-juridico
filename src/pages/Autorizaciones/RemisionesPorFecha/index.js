import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import Policy from "components/Policy";
import { Button, Breadcrumb, Card, Col, Row } from "react-bootstrap";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";

var moment = require("moment");

const ListadoRemisiones = () => {
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
          <MigaPanDocumentos />
          <span>Remisiones por fecha</span>
        </MigaPan>
        <Card>
          <Card.Body style={{ padding: "2.5rem" }}>
            <h2 className="title-line">
              <span>Listado de remitidos por rango de fecha</span>
            </h2>
            <Row className="mb-3">
              <Col xs="12" md="6">
                <label>
                  <b>Desde</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha-inicio"
                  onChange={(e) => setFechaInicial(e.target.value)}
                />
              </Col>
              <Col xs="12" md="6">
                <label>
                  <b>Hasta</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha-inicio"
                  onChange={(e) => setFechaFinal(e.target.value)}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <a
                href={`http://179.0.29.155:8000/remisiones_fecha/${fechaInicial}/${fechaFinal}`}
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

export default ListadoRemisiones;
