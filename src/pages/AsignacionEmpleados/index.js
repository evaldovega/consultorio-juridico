import React, { useState } from "react";

import { ACCESS_TOKEN_NAME, MODULES } from "../../constants/apiContants";
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
} from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";

const AsignacionEmpleadosHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <span>Asignación de docentes</span>
        </MigaPan>

        <div className="section-title">
          <h1>Asignación de docentes</h1>
        </div>

        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Formato de Registro"
              link="/asignacion-docentes/asignar"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de asignaciones"
              link="/asignacion-docentes/listado"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default AsignacionEmpleadosHome;
