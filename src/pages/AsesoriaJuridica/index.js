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
import { FaFolder, FaFolderOpen, FaFolderPlus, FaPenAlt } from "react-icons/fa";

const AsesoriaJuridicaHome = () => {
  return (
    <Policy
      policy={[]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Asesoría jurídica</Breadcrumb.Item>
        </Breadcrumb>
        <div className="section-title">
          <h1>Asesoría jurídica</h1>
        </div>
        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaPenAlt}
                  IconSecundary={FaFolderPlus}
                />
              )}
              title="Formato de Registro"
              link="/asesoria-juridica/solicitar"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaFolder}
                  IconSecundary={FaFolderOpen}
                />
              )}
              title="Listado de casos"
              link="/asesoria-juridica/solicitudes"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaFolder}
                  IconSecundary={FaFolderOpen}
                />
              )}
              title="Reportes"
              link="/asesoria-juridica/reportes"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default AsesoriaJuridicaHome;
