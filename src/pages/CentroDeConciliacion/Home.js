import React, { useContext, useState } from "react";
import { Context } from "components/Policy/Ctx";
import API, { baseUrl } from "utils/Axios";
import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "../../constants/apiContants";
import { Link } from "react-router-dom";
import Page from "components/Page";
import Policy from "components/Policy";
import AccessDenied from "components/Policy/AccessDenied";
import { Breadcrumb, Row, Col, Card } from "react-bootstrap";
import SectionHeader from "components/SectionHeader"
import { toast } from "react-toastify";

import ItemModule from "components/ItemModule";
import Icon from "components/icons";
import {
  FaFolder,
  FaFolderOpen,
  FaFolderPlus,
  FaPenAlt,
  FaTable,
  FaTabletAlt, FaPen, FaFile
} from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import { ReactComponent as Lapiz } from "images/pencil.svg"
import { ReactComponent as Papel } from "images/file-line.svg"
import { ReactComponent as Carpeta } from "images/folder.svg"

const FileSaver = require('file-saver');

const CentroDeConciliacionHome = () => {
  const { policies = [], persona } = useContext(Context);

  const exportarConciliadores = async () => {
    try {
      toast.info("Se está descargando la lista. Por favor, espere un momento.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const response = await API(`${baseUrl}/api/conciliacion/solicitud/estudiantes_conciliadores/`, {
        responseType: 'arraybuffer',
      })
      const blob = new Blob([response.data], { type: 'application/xlsx' });
      FileSaver.saveAs(blob, "estudiantes_conciliadores.xlsx");
      toast.success("Se ha generado el listado.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_ESTUDIANTE, ROL_ASESOR, ROL_DOCENTE, ROL_PERSONA]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <SectionHeader
        text="Centro de Conciliación"
        img="url(/images/banner_centroconciliacion.jpg)"
      />
      <div style={{
        backgroundImage: "url(/images/sectionbackground.jpg)",
        backgroundSize: "cover",
        height: "65vh"
      }}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <span>Centro de conciliación</span>
          </MigaPan>
          <div style={{
            width: "80%",
            margin: "auto"
          }}>
            <Row className="modules">
              <Col
                xs={12}
                md={4}
                className="mb-4"
              >
                <ItemModule
                  Icon={() => <Lapiz style={{ width: "50px", height: "50px" }} />}
                  title="Formato de registro"
                  link="/centro-de-conciliacion/registrar"
                />
              </Col>
              <Col
                xs={12}
                md={4}
                className="mb-4"
              >
                <ItemModule
                  Icon={() => <Papel style={{ width: "50px", height: "50px" }} />}
                  title="Listado de casos"
                  link="/centro-de-conciliacion/solicitudes"
                />
              </Col>
              <Policy policy={[ROL_ADMIN]}>
                <Col
                  xs={12}
                  md={4}
                  className="mb-4"
                >
                  <a
                    href="#"
                    onClick={() => exportarConciliadores()}
                  >
                    <ItemModule
                      Icon={() => <Papel style={{ width: "50px", height: "50px" }} />}
                      title="Estudiantes conciliadores"
                    />
                  </a>
                </Col>
              </Policy>
              <Policy policy={[ROL_ADMIN]}>
                <Col
                  xs={12}
                  md={4}
                  className="mb-4"
                >
                  <ItemModule
                    Icon={() => <Papel style={{ width: "50px", height: "50px" }} />}
                    title="Programación de citas"
                    link="/centro-de-conciliacion/programacion"
                  />
                </Col>
              </Policy>
              <Policy policy={[ROL_ADMIN]}>
                <Col
                  xs={12}
                  md={4}
                  className="mb-4"
                >
                  <ItemModule
                    Icon={() => <Carpeta style={{ width: "50px", height: "50px" }} />}
                    title="Reportes"
                    link="/centro-de-conciliacion/reportes"
                  />
                </Col>
              </Policy>
            </Row>
          </div>
        </Page>
      </div>
    </Policy>
  );
};

export default CentroDeConciliacionHome;
