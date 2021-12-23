import React, { useState } from "react";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
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
  FaFolder,
  FaFolderOpen,
  FaFolderPlus,
  FaPenAlt,
  FaTable,
  FaTabletAlt,
} from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";

const CentroDeConciliacionHome = () => {
  return (
    <Policy
      policy={[ROL_ADMIN, ROL_ESTUDIANTE, ROL_ASESOR, ROL_DOCENTE, ROL_PERSONA]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <span>Centro de conciliación</span>
        </MigaPan>

        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Formato de Registro"
              link="/centro-de-conciliacion/registrar"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de casos"
              link="/centro-de-conciliacion/solicitudes"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default CentroDeConciliacionHome;
