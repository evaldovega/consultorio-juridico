import React, { useContext, useState } from "react";
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
  FaRegChartBar, FaPen, FaFile, FaFolderOpen
} from "react-icons/fa";
import AccessDenied from "components/Policy/AccessDenied";
import { Context } from "components/Policy/Ctx";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";
import SectionHeader from "components/SectionHeader";
import { ReactComponent as Lapiz } from "images/pencil.svg"
import { ReactComponent as Papel } from "images/file-line.svg"
import { ReactComponent as Carpeta } from "images/folder.svg"

const InscripcionEstudiantes = ({ params }) => {
  const { policies = [], persona } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_DOCENTE, ROL_ASESOR]}
      feedback={<AccessDenied />}
    >
      <SectionHeader
        text="Inscripción de Estudiantes"
        img="url(/images/banner_inscripcionestudiantes.jpg)"
      />
      <div style={{
        backgroundImage: "url(/images/sectionbackground.jpg)",
        backgroundSize: "cover",
        height: "65vh"
      }}>

        <Page>
          <MigaPan>
            <MigaPanInicio />
            <span>Inscripción estudiantes</span>
          </MigaPan>
          <div style={{
            width: "80%",
            margin: "auto"
          }}>

            <Row className="modules">
              <Policy policy={[ROL_ADMIN]}>
                <Col xs="12" md="4" className="mb-4">
                  <ItemModule
                    Icon={() => <Lapiz style={{width: "50px", height: "50px"}} />}
                    link="/inscripcion-estudiantes/inscripcion-practicas"
                    title="Inscripción a prácticas"
                  />
                </Col>
              </Policy>

              <Col 
                xs="12" 
                md={policies.includes(ROL_ADMIN) ? 4 : 6} 
                className="mb-4"
              >
                <ItemModule
                  Icon={() => <Papel style={{width: "50px", height: "50px"}} />}
                  link="/inscripcion-estudiantes/listado"
                  title="Listado de inscripciones"
                />
              </Col>

              <Col 
                xs="12" 
                md={policies.includes(ROL_ADMIN) ? 4 : 6} 
                className="mb-4"
              >
                <ItemModule
                  Icon={() => <Carpeta style={{width: "50px", height: "50px"}} />}
                  link="/inscripcion-estudiantes/reporte"
                  title="Reportes"
                />
              </Col>
              <Col xs="12" md="6" className="mb-4"></Col>
            </Row>
          </div>
        </Page>
      </div>
    </Policy>
  );
};
export default InscripcionEstudiantes;
