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
import { FaRegFolder, FaTable, FaChartBar } from "react-icons/fa";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPan from "components/MigaPan";

const AsesoriaJuridicaHome = () => {
  return (
    <Policy policy={[]} feedback={<AccessDenied msn="Acceso denegado" />}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <span>Asesoría jurídica</span>
        </MigaPan>

        <Row className="modules">
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaRegFolder />}
              title="Formato de Registro"
              link="/asesoria-juridica/solicitar"
            />
          </Col>
          <Col xs={12} md={6}>
            <ItemModule
              Icon={() => <FaTable />}
              title="Listado de casos"
              link="/asesoria-juridica/solicitudes"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 22 }}></div>
          <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
            <Col xs={12} md={6}>
              <ItemModule
                Icon={() => <FaChartBar />}
                title="Reportes"
                link="/asesoria-juridica/reportes"
              />
            </Col>
          </Policy>
        </Row>
      </Page>
    </Policy>
  );
};

export default AsesoriaJuridicaHome;
