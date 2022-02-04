import React, { useState } from "react";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
  ROL_DOCENTE
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
import { ReactComponent as Lapiz } from "images/pencil.svg"
import { ReactComponent as Papel } from "images/file-line.svg"
import { ReactComponent as Carpeta } from "images/folder.svg"

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
              <Col xs={12} md={
                <>
                  <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
                    {4}
                  </Policy>
                  <Policy policy={[ROL_ESTUDIANTE, ROL_PERSONA]}>
                    {6}
                  </Policy>
                </>
              }>
                <ItemModule
                  Icon={() => <Lapiz style={{ width: "50px", height: "50px" }} />}
                  title="Formato de Registro"
                  link="/asesoria-juridica/solicitar"
                />
              </Col>
              <Col xs={12} md={
                <>
                  <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
                    {4}
                  </Policy>
                  <Policy policy={[ROL_ESTUDIANTE, ROL_PERSONA, ROL_DOCENTE]}>
                    {6}
                  </Policy>
                </>
              }>
                <ItemModule
                  Icon={() => <Papel style={{ width: "50px", height: "50px" }} />}
                  title="Listado de casos"
                  link="/asesoria-juridica/solicitudes"
                />
              </Col>
              <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
                <Col xs={12} md={4}>
                  <ItemModule
                    Icon={() => <Carpeta style={{ width: "50px", height: "50px" }} />}
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
