import React, { useState } from "react";

import { ACCESS_TOKEN_NAME, MODULES, ROL_ADMIN } from "../../constants/apiContants";
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
import { ReactComponent as Lapiz } from "images/pencil.svg"
import { ReactComponent as Papel } from "images/file-line.svg"
import { ReactComponent as Carpeta } from "images/folder.svg"

const AsignacionEmpleadosHome = () => {
  return (
    <Policy policy={[ROL_ADMIN]} feedback={<AccessDenied msn="Acceso denegado" />}>
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
          <div style={{
            width: "70%",
            margin: "auto"
          }}>
            <Row className="modules">
              <Col xs={12} md={6}>
                <ItemModule
                  Icon={() => <Lapiz style={{width: "50px", height: "50px"}} />}
                  title="Consultar asignaciones"
                  link="/asignacion-docentes/asignar"
                />
              </Col>
              <Col xs={12} md={6}>
                <ItemModule
                  Icon={() => <Papel style={{width: "50px", height: "50px"}} />}
                  title="Listado de asignaciones"
                  link="/asignacion-docentes/listado"
                />
              </Col>
            </Row>
          </div>
        </Page>
      </div>
    </Policy>
  );
};

export default AsignacionEmpleadosHome;
