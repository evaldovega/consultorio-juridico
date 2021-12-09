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
import { FaFolder, FaFolderOpen, FaFolderPlus, FaPenAlt } from "react-icons/fa";

const ReportesIndex = () => {
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
          <Breadcrumb.Item>
            <Link to="/asesoria-juridica">Asesoría jurídica</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
        </Breadcrumb>
        <div className="section-title">
          <h1>Reportes</h1>
        </div>
        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaFolder}
                  IconSecundary={FaFolderOpen}
                />
              )}
              title="Listado de Registrados"
              link="/asesoria-juridica/reportes/registrados"
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
              title="Por sexo"
              link="/asesoria-juridica/reportes/sexo"
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
              title="Por edad"
              link="/asesoria-juridica/reportes"
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
              title="Por discapacidad"
              link="/asesoria-juridica/reportes"
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
              title="Por orientación sexual"
              link="/asesoria-juridica/reportes"
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
              title="Por desempleo"
              link="/asesoria-juridica/reportes/desempleo"
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
              title="Por profesión"
              link="/asesoria-juridica/reportes"
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
              title="Por lugar de práctica"
              link="/asesoria-juridica/reportes/lugar-practicas"
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
              title="Listado de casos"
              link="/asesoria-juridica/reportes/casos"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default ReportesIndex;
