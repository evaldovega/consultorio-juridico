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
  FaTable, FaPen, FaFile,
} from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import SectionHeader from "components/SectionHeader";

const AsignacionEmpleadosHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <SectionHeader
        text="Asignación de docentes"
        img="url(/images/banner_inscripciondocentes.jpg)"
      />
      <div style={{
        backgroundImage: "url(/images/sectionbackground.jpg)",
        backgroundSize: "cover",
        height: "65vh"
      }}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <span>Asignación de docentes</span>
          </MigaPan>
          <Row className="modules">
            <Col xs={12} md={6}>
              <ItemModule
                Icon={() => <FaPen />}
                title="Formato de Registro"
                link="/asignacion-docentes/asignar"
              />
            </Col>
            <Col xs={12} md={6}>
              <ItemModule
                Icon={() => <FaFile />}
                title="Listado de asignaciones"
                link="/asignacion-docentes/listado"
              />
            </Col>
          </Row>
        </Page>
      </div>
    </Policy>
  );
};

export default AsignacionEmpleadosHome;
