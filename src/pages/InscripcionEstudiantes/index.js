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
import {
  Breadcrumb,
  Row,
  Col,
  Container,
  Card,
  CardDeck,
} from "react-bootstrap";
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
  FaPenAlt,
  FaTable,
  FaRegChartBar,
} from "react-icons/fa";
import AccessDenied from "components/Policy/AccessDenied";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";

const InscripcionEstudiantes = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_DOCENTE, ROL_ASESOR]}
      feedback={<AccessDenied />}
    >
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <span>Inscripción estudiantes</span>
        </MigaPan>

        <Row className="modules">
          <Policy policy={[ROL_ADMIN]}>
            <Col xs="12" md="6" className="mb-4">
              <ItemModule
                Icon={() => <FaPenAlt />}
                link="/inscripcion-estudiantes/inscripcion-practicas"
                title="Inscripción a prácticas de Consultorio Jurídico"
              />
            </Col>
          </Policy>

          <Col xs="12" md="6" className="mb-4">
            <ItemModule
              Icon={() => <FaTable />}
              link="/inscripcion-estudiantes/listado"
              title="Listado de inscripciones"
            />
          </Col>

          <Col xs="12" md="6" className="mb-4">
            <ItemModule
              Icon={() => <FaRegChartBar />}
              link="/inscripcion-estudiantes/reporte"
              title="Reportes"
            />
          </Col>
          <Col xs="12" md="6" className="mb-4"></Col>
        </Row>
      </Page>
    </Policy>
  );
};
export default InscripcionEstudiantes;
