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

const ReportesIndex = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanAsesoriaJuridica />
          <span>Reportes</span>
        </MigaPan>

        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de Registrados"
              link="/asesoria-juridica/reportes/registrados"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por sexo"
              link="/asesoria-juridica/reportes/sexo"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por edad"
              link="/asesoria-juridica/reportes/edad"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por discapacidad"
              link="/asesoria-juridica/reportes/discapacidad"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por orientación sexual"
              link="/asesoria-juridica/reportes/orientacion"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por desempleo"
              link="/asesoria-juridica/reportes/desempleo"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por profesión"
              link="/asesoria-juridica/reportes/profesion"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaFilePdf />}
              title="Por lugar de práctica"
              link="/asesoria-juridica/reportes/lugar-practicas"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaFilePdf />}
              title="Listado de casos"
              link="/asesoria-juridica/reportes/casos"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegChartBar />}
              title="Por etnia"
              link="/asesoria-juridica/reportes/etnia"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default ReportesIndex;
