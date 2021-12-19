import React, { useState } from "react";
import Policy from "components/Policy";
import { Space, Typography } from "antd";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ASESOR,
  ROL_ADMIN,
  ROL_DOCENTE,
} from "../../constants/apiContants";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import Page from "components/Page";
import { Breadcrumb, Row, Col, Container, Card } from "react-bootstrap";
import ItemModule from "components/ItemModule";
import Icon from "components/icons";
import {
  FaClipboard,
  FaClipboardList,
  FaPlus,
  FaUserAlt,
  FaUserPlus,
  FaPencilAlt,
  FaFolder,
} from "react-icons/fa";
import AccessDenied from "components/Policy/AccessDenied";

const InscripcionEstudiantes = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_DOCENTE, ROL_ASESOR]}
      feedback={<AccessDenied />}
    >
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Inscripción estudiantes</Breadcrumb.Item>
        </Breadcrumb>

        <div className="section-title">
          <h1>Inscripción a estudiantes</h1>
        </div>

        <Row className="modules mb-4">
          <Col>
            <ItemModule
              Icon={(props) => (
                <Icon
                  IconPrimary={FaPencilAlt}
                  IconSecundary={FaPencilAlt}
                  {...props}
                />
              )}
              link="/inscripcion-estudiantes/inscripcion-practicas"
              title="Inscripción a prácticas de Consultorio Jurídico"
            />
          </Col>
          <Col>
            <ItemModule
              Icon={(props) => (
                <Icon
                  IconPrimary={FaClipboard}
                  IconSecundary={FaClipboard}
                  {...props}
                />
              )}
              link="/inscripcion-estudiantes/listado"
              title="Listado de inscripciones"
            />
          </Col>
        </Row>
        <Row className="modules">
          <Col>
            <ItemModule
              Icon={(props) => (
                <Icon
                  IconPrimary={FaFolder}
                  IconSecundary={FaFolder}
                  {...props}
                />
              )}
              link="/inscripcion-estudiantes/reporte"
              title="Reportes"
            />
          </Col>
          <Col></Col>
        </Row>
      </Page>
    </Policy>
  );
};
export default InscripcionEstudiantes;
