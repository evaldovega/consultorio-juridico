import React, { useState } from "react";

import { ACCESS_TOKEN_NAME, MODULES } from "../../constants/apiContants";
import { Link } from "react-router-dom";
import Page from "components/Page";
import Policy from "components/Policy";
import AccessDenied from "components/Policy/AccessDenied";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";

import ItemModule from "components/ItemModule";
import Icon from "components/icons";
import { FaFolder, FaFolderOpen, FaFolderPlus, FaPenAlt } from "react-icons/fa";

const AutorizacionesHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Documentos</Breadcrumb.Item>
        </Breadcrumb>

        <div className="section-title">
          <h1>Documentos</h1>
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
              title="Registrar autorización"
              link="/autorizaciones/autorizar"
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
              title="Listado de autorizaciones"
              link="/autorizaciones/listado"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaPenAlt}
                  IconSecundary={FaFolderPlus}
                />
              )}
              title="Generar certificado"
              link="/autorizaciones/generar-certificado"
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
              title="Listado de certificados"
              link="/autorizaciones/lista-certificados"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaPenAlt}
                  IconSecundary={FaFolderPlus}
                />
              )}
              title="Generar remisión"
              link="/autorizaciones/generar-remision"
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
              title="Listado de remisiones"
              link="/autorizaciones/lista-remisiones"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={(props) => (
                <Icon
                  {...props}
                  IconPrimary={FaPenAlt}
                  IconSecundary={FaFolderPlus}
                />
              )}
              title="Registro masivo de remisiones"
              link="/autorizaciones/remision-masiva"
            />
          </Col>
        </Row>
      </Page>
    </Policy>
  );
};

export default AutorizacionesHome;
