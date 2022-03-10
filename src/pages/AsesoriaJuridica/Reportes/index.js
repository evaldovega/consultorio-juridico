import React, { useState } from "react";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "../../../constants/apiContants";
import { Link } from "react-router-dom";
import Page from "components/Page";
import Policy from "components/Policy";
import AccessDenied from "components/Policy/AccessDenied";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";

import ItemModule from "components/ItemModule";
import Icon from "components/icons";
import {
  FaFilePdf,
  FaFolder,
  FaFolderOpen,
  FaFolderPlus,
  FaPenAlt,
  FaRegChartBar,
  FaTable,
} from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";

const AsesoriaReportesIndex = () => {
  const menuItems = [
    {
      "title": "Listado de Registrados",
      "sufijo": "ciudadanos-fecha",
      "grafica": false
    },
    {
      "title": "Por sexo",
      "sufijo": "sexo",
      "grafica": true
    },
    {
      "title": "Por edad",
      "sufijo": "edad",
      "grafica": true
    },
    {
      "title": "Por vulnerabilidad",
      "sufijo": "vulnerabilidad",
      "grafica": true
    },
    {
      "title": "Por nivel educativo",
      "sufijo": "nivel_educativo",
      "grafica": true
    },
    {
      "title": "Por etnia",
      "sufijo": "etnia",
      "grafica": true
    },
    {
      "title": "Por orientación sexual",
      "sufijo": "orientacion_sexual",
      "grafica": true
    },
    {
      "title": "Por desempleo",
      "sufijo": "desempleo",
      "grafica": true
    },
    {
      "title": "Por profesión",
      "sufijo": "profesion",
      "grafica": true
    },
    {
      "title": "Casos por área",
      "sufijo": "casos_area",
      "grafica": true
    },
  ]

  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanAsesoriaJuridica />
          <span>Reportes</span>
        </MigaPan>
        <Row className="modules">
          {menuItems.map((item, index) => (
            <Col xs={12} md={6} style={{ marginBottom: "20px" }}>
              <ItemModule
                Icon={!item.grafica ? () => <FaFilePdf /> : () => <FaRegChartBar />}
                title={item.title}
                link={`/asesoria-juridica/${item.grafica ? 'reportes_grafica' : 'reportes'}/${item.sufijo}`}
              />
            </Col>
          ))}
          <Col xs={12} md={6} style={{ marginBottom: "20px" }}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por discapacidad"
              link={`/asesoria-juridica/reporte-discapacidad/`}
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default AsesoriaReportesIndex;
