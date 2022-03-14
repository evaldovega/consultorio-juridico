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
  FaRegFolderOpen,
  FaFolderPlus,
  FaPenAlt,
  FaTable, FaPencilAlt, FaRegFile, FaPenNib
} from "react-icons/fa";
import * as Icons from '@ant-design/icons'
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import SectionHeader from "components/SectionHeader";
import { ReactComponent as Lapiz } from "images/pencil.svg"
import { ReactComponent as Papel } from "images/file-line.svg"
import { ReactComponent as Carpeta } from "images/folder.svg"

const AutorizacionesHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <SectionHeader
        text="Documentos y autorizaciones"
        img="url(/images/banner_documentos.jpg)"
      />
      <div style={{
        backgroundImage: "url(/images/sectionbackground.jpg)",
        backgroundSize: "cover",
        height: "65vh"
      }}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <span>Dcumentos y autorizaciones</span>
          </MigaPan>

          <Row className="modules">
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Lapiz style={{width: "50px", height: "50px"}} />}
                title="Registrar autorización"
                link="/autorizaciones/autorizar"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Papel style={{width: "50px", height: "50px"}} />}
                title="Listado de autorizaciones"
                link="/autorizaciones/listado"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Lapiz style={{width: "50px", height: "50px"}} />}
                title="Generar certificado"
                link="/autorizaciones/generar-certificado"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Papel style={{width: "50px", height: "50px"}} />}
                title="Listado de certificados"
                link="/autorizaciones/lista-certificados"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Lapiz style={{width: "50px", height: "50px"}} />}
                title="Generar remisión"
                link="/autorizaciones/generar-remision"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Papel style={{width: "50px", height: "50px"}} />}
                title="Listado de remisiones"
                link="/autorizaciones/lista-remisiones"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Lapiz style={{width: "50px", height: "50px"}} />}
                title="Registro masivo de remisiones"
                link="/autorizaciones/remision-masiva"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Carpeta style={{width: "50px", height: "50px"}} />}
                title="Reporte autorizaciones por fecha"
                link="/autorizaciones/reporte-fecha"
              />
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <ItemModule
                Icon={() => <Carpeta style={{width: "50px", height: "50px"}} />}
                title="Reporte remisiones por fecha"
                link="/autorizaciones/reporte-remisiones-fecha"
              />
            </Col>
          </Row>
        </Page>
      </div>
    </Policy>
  );
};

export default AutorizacionesHome;
