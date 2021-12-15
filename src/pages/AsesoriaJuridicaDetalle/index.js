import Page from "components/Page";

import PerfilMaster from "pages/Perfil/Master";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs, Card, Breadcrumb, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import API from "utils/Axios";
import ArchivosAsesoria from "./Anexos";
import Estudiantes from "./Estudiantes";
import Actuaciones from "./Seguimiento/Actuaciones";
import Compromisos from "./Compromiso";
import { FcSerialTasks } from "react-icons/fc";
import Policy from "components/Policy";
import { ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE } from "constants/apiContants";

const AsesoriaJuridicaDetalle = () => {
  const { id: asesoriaId } = useParams();
  const [solicitanteId, setSolicitanteId] = useState("");
  const [caso, setCaso] = useState({});
  const [loading, setLoading] = useState(false);

  const compromisoEstablecido = caso?.t_recomendaciones?.length ? true : false;

  const cargarAsesoria = () => {
    setLoading(true);
    API(`asesorias/solicitud/${asesoriaId}/`)
      .then(({ data }) => {
        console.log({ data });
        setCaso(data);
        setSolicitanteId(data.r_usuarios_solicitante.id);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarAsesoria();
  }, []);

  return (
    <Page>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Inicio</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/asesoria-juridica">Asesoría Jurídica</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/asesoria-juridica/solicitudes">Casos</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Detalle</Breadcrumb.Item>
      </Breadcrumb>

      <Card style={{ paddingTop: 8, overflow: "visible" }}>
        <Tabs defaultActiveKey="detalle" id="uncontrolled-tab-example">
          <Tab eventKey="detalle" title="Detalle">
            <br />
            <Card.Body>
              <Row className="mb-2">
                <Col xs="12" md="4">
                  <Form.Group>
                    <Form.Label>N° caso</Form.Label>
                    <Form.Control
                      value={caso.id}
                      readOnly={true}
                      plaintext={true}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="4">
                  <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      value={caso.dt_fechaAsesoria}
                      readOnly={true}
                      plaintext={true}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="4">
                  <Form.Group>
                    <Form.Label>Hora</Form.Label>
                    <Form.Control
                      value={caso.ht_horaAsesoria}
                      readOnly={true}
                      plaintext={true}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="4"></Col>
              </Row>
              <Row className="mb-2">
                <Col xs="12">
                  <Form.Group>
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={caso.t_asuntoConsulta}
                      readOnly={true}
                      plaintext={true}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Compromisos
                asesoriaId={asesoriaId}
                caso={caso}
                setCaso={setCaso}
              />
            </Card.Body>
          </Tab>

          <Tab eventKey="asignados" title="Estudiantes asignados">
            <br />
            <Card.Body>
              <Estudiantes
                asesoriaId={asesoriaId}
                caso={caso}
                setCaso={setCaso}
              />
            </Card.Body>
          </Tab>

          <Tab eventKey="solicitante" title="Solicitante">
            <br />
            <Card.Body>
              <PerfilMaster
                id={solicitanteId}
                readOnly={true}
                allowSearchPerson={false}
                showButton={false}
              />
            </Card.Body>
          </Tab>

          <Tab eventKey="anexos" title="Anexos">
            <br />
            <Card.Body>
              <ArchivosAsesoria
                asesoriaId={asesoriaId}
                caso={caso}
                setCaso={setCaso}
              />
            </Card.Body>
          </Tab>

          {compromisoEstablecido ? (
            <Tab
              eventKey="seguimiento"
              title={
                <span>
                  <FcSerialTasks /> Seguimiento
                </span>
              }
            >
              <Actuaciones
                asesoriaId={asesoriaId}
                caso={caso}
                setCaso={setCaso}
              />
            </Tab>
          ) : null}
        </Tabs>
      </Card>
    </Page>
  );
};

export default AsesoriaJuridicaDetalle;
