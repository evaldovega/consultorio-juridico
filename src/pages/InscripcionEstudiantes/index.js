import React, { useState } from "react";
import Policy from "components/Policy";
import { Space, Typography } from "antd";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ASESOR,
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
} from "react-icons/fa";

const InscripcionEstudiantes = ({ params }) => {
  console.log({ params });
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  return (
    <Policy policy={[ROL_ASESOR]}>
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

        <Row className="modules">
          <Col>
            <ItemModule
              Icon={(props) => (
                <Icon
                  IconPrimary={FaUserAlt}
                  IconSecundary={FaUserPlus}
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
                  IconSecundary={FaClipboardList}
                  {...props}
                />
              )}
              link="/inscripcion-estudiantes/listado"
              title="Listado de incripciones"
            />
          </Col>
          <div class="w-100" style={{ marginBottom: 16 }}></div>
          <Col>
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card>
                <Card.Body className="d-flex justify-content-start align-items-center">
                  <img src="/icons/user.png" width={42} />
                  <Card.Title>Asignación de estudiantes</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col>
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card>
                <Card.Body className="d-flex justify-content-start align-items-center">
                  <img src="/icons/folder.png" width={42} />
                  <Card.Title level={5} style={{ margin: 0 }}>
                    Reportes
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <div class="w-100" style={{ marginBottom: 16 }}></div>
          <Col>
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card>
                <Card.Body className="d-flex justify-content-start align-items-center">
                  <img src="/icons/file.png" width={42} />
                  <Card.Title level={5} style={{ margin: 0 }}>
                    Formatos
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col></Col>
        </Row>
      </Page>
    </Policy>
  );
};
export default InscripcionEstudiantes;
