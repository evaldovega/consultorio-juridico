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

const AutorizacionesHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <span>Dcumentos y autorizaciones</span>
        </MigaPan>

        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Registrar autorización"
              link="/autorizaciones/autorizar"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de autorizaciones"
              link="/autorizaciones/listado"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Generar certificado"
              link="/autorizaciones/generar-certificado"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de certificados"
              link="/autorizaciones/lista-certificados"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Generar remisión"
              link="/autorizaciones/generar-remision"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de remisiones"
              link="/autorizaciones/lista-remisiones"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Registro masivo de remisiones"
              link="/autorizaciones/remision-masiva"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Reporte autorizaciones por fecha"
              link="/autorizaciones/reporte-fecha"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaPenAlt />}
              title="Reporte remisiones por fecha"
              link="/autorizaciones/reporte-remisiones-fecha"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default AutorizacionesHome;
