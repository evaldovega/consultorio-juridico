import React, { useState } from "react";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "../../constants/apiContants";
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
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";

const EstudianteReportesIndex = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanInscripcionEstudiante />
          <span>Reportes</span>
        </MigaPan>

        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de Registrados"
              link="/inscripcion-estudiantes/reportes/registrados"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por sexo"
              link="/inscripcion-estudiantes/reportes/sexo"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por edad"
              link="/inscripcion-estudiantes/reportes/edad"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por discapacidad"
              link="/inscripcion-estudiantes/reportes/discapacidad"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por orientación sexual"
              link="/inscripcion-estudiantes/reportes/orientacion"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por desempleo"
              link="/inscripcion-estudiantes/reportes/desempleo"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por profesión"
              link="/inscripcion-estudiantes/reportes/profesion"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaFilePdf />}
              title="Por lugar de práctica"
              link="/inscripcion-estudiantes/reportes/lugar-practicas"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaFilePdf />}
              title="Listado de casos"
              link="/inscripcion-estudiantes/reportes/casos"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por etnia"
              link="/inscripcion-estudiantes/reportes/etnia"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default EstudianteReportesIndex;
