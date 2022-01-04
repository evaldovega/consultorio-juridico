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
import { Breadcrumb, Row, Col, Card, Dropdown } from "react-bootstrap";

import ItemModule from "components/ItemModule";
import Icon from "components/icons";
import { FaRegFolder, FaTable, FaChartBar, FaPencilAlt, FaPen, FaFile, FaFolderOpen } from "react-icons/fa";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPan from "components/MigaPan";
import SectionHeader from "components/SectionHeader";

const AsesoriaJuridicaHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <SectionHeader
        text="Asesoría jurídica"
        img="url(/images/sectionbanner.jpg)"
      />
      <div style={{
        backgroundImage: "url(/images/sectionbackground.jpg)",
        backgroundSize: "cover",
        height: "65vh"
      }}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <span>Asesoría jurídica</span>
          </MigaPan>
          <div style={{
            width: "80%",
            margin: "auto"
          }}>
            <Row className="modules">
              <Col xs={12} md={4}>
                <ItemModule
                  Icon={() => <FaPen />}
                  title="Formato de Registro"
                  link="/asesoria-juridica/solicitar"
                />
              </Col>
              <Col xs={12} md={4}>
                <ItemModule
                  Icon={() => <FaFile />}
                  title="Listado de casos"
                  link="/asesoria-juridica/solicitudes"
                />
              </Col>
              <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
                <Col xs={12} md={4}>
                  <ItemModule
                    Icon={() => <FaFolderOpen />}
                    title="Reportes"
                    link="/asesoria-juridica/reportes"
                  />
                </Col>
              </Policy>
            </Row>
          </div>
        </Page>
      </div>
    </Policy>
  );
};

export default AsesoriaJuridicaHome;
