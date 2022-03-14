import Page from "components/Page";
import Policy from "components/Policy";
import { ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE } from "constants/apiContants";
import Spin from "components/Spin";
import { useContext, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Button,
  Table,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API, { baseUrl } from "utils/Axios";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { PERSONA_JURIDICA, PERSONA_NATURAL } from "constants/apiContants";
import NuevaCita from "./NuevaCita";
import PersonaDetailRow from "components/personaDetailRow";
import { Context } from "components/Policy/Ctx";
import PerfilMaster from "pages/Perfil/Master"

var moment = require('moment')

const CentroDeConciliacionDetalle = ({ id, setId, onHide }) => {
  const { policies = [], persona } = useContext(Context);
  const [cargando, setCargando] = useState(false);
  const [doc, setDoc] = useState(null);
  const [citas, setCitas] = useState([])
  const [idModal, setIdModal] = useState(null);
  const [nuevaCitaShow, setNuevaCitaShow] = useState(false)
  const [showProfileData, setShowProfileData] = useState(false)

  const cargar = async () => {
    try {
      setCargando(true);
      const { data } = await API(`/conciliacion/solicitud/${id}/plain/`);
      setTimeout(() => {
        setDoc(data);
        setCargando(false);
      }, 400);
    } catch (error) {
      setCargando(false);
      setId(null);
    }
  };

  const cargarCitas = async () => {
    await API(`conciliacion/agenda/?solicitud=${id}`)
      .then(response => {
        setCitas(response.data)
      })
  }

  const mostrarDetalles = (id) => {
    localStorage.setItem('consultorio_id_profileshow', id)
    setShowProfileData(true)
  }

  useEffect(() => {
    if (id) {
      cargar();
      cargarCitas();
    }
  }, [id]);

  useEffect(() => {
    cargarCitas()
  }, [nuevaCitaShow])

  if (cargando) {
    return (
      <Modal show={true}>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Cargando detalle</h1>
            <p>espere un moment por favor...</p>
            <Spinner animation="border" status="primary" />
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <NuevaCita
        id={id}
        show={nuevaCitaShow}
        onHide={() => setNuevaCitaShow(false)}
      />
      <Modal 
        show={showProfileData}
        onHide={() => setShowProfileData(false)}
      >
        <Modal.Header closeButton>
          Información de la parte
        </Modal.Header>
        <Modal.Body>
          <PerfilMaster 
            id={localStorage.getItem('consultorio_id_profileshow')}
            allowSearchPerson={false}
            readOnly={true}
            policies={policies}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={doc}
        onHide={() => {
          setDoc(null);
          onHide();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conciliación</Modal.Title>
        </Modal.Header>

        <Tabs
          defaultActiveKey="detalle"
          className="mt-2"
          id="uncontrolled-tab-example2"
        >
          <Tab eventKey="detalle" title="Detalle">
            <Modal.Body>
              <Row>
                <Col xs="12" md="6" lg="4">
                  <Form.Label>Fecha solicitud</Form.Label>
                  <Form.Control
                    readOnly={true}
                    plaintext={true}
                    value={doc?.d_fechaSolicitud}
                  />
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Form.Label className="d-block">Cuantia</Form.Label>
                  {doc && doc.a_cuantiaValor && doc.a_cuantiaValor}
                  {doc && doc.a_indeterminada && doc.a_indeterminada}
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4" lg="4">
                  <Form.Label>Pais</Form.Label>
                  <p>{doc?.r_config_pais}</p>
                </Col>
                <Col xs="12" md="4" lg="4">
                  <Form.Label>Departamento</Form.Label>
                  <p>{doc?.r_config_departamento}</p>
                </Col>
                <Col xs="12" md="4" lg="4">
                  <Form.Label>Ciudad</Form.Label>
                  <p>{doc?.r_config_municipio}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Form.Label>Resumen</Form.Label>
                  <p>{doc?.t_resumenHechos}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Form.Label>Pretensiones iniciales</Form.Label>
                  <p>{doc?.t_pretencionesIniciales}</p>
                </Col>
              </Row>
              {doc?.r_usuarios_conciliador?.id && (
                <Row>
                  <Col xs="12">
                    <Form.Label>Estudiante conciliador</Form.Label>
                    <PersonaDetailRow
                      id={doc?.r_usuarios_conciliador?.id}
                    />
                  </Col>
                </Row>
              )}
            </Modal.Body>
          </Tab>
          <Tab eventKey="solicitantes" title="Solicitantes">
            <Modal.Body>
              <Policy policy={[ROL_ADMIN]}>
                {!citas.length && (
                  <Alert variant="warning">
                    Para descargar los formatos, asigne una cita en la pestaña Citas
                  </Alert>
                )}
              </Policy>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Celular</th>
                    <th>Dirección</th>
                    <Policy policy={[ROL_ADMIN]}>
                      {citas.length && (
                        <th>Imprimir formatos</th>
                      )}
                    </Policy>
                  </tr>
                </thead>
                <tbody>
                  {doc?.r_solicitante?.map((c, i) => (
                    <>
                      <tr key={i}>
                        <td>
                          <a href="#" onClick={() => mostrarDetalles(c?.r_usuarios_solicitante?.id)}>
                            {c?.r_usuarios_solicitante?.c_tipoPersona === PERSONA_JURIDICA ? (
                              c?.r_usuarios_solicitante?.a_nombrePersonaJuridica
                            ) : (
                              `${c?.r_usuarios_solicitante?.a_primerNombre} ${c?.r_usuarios_solicitante?.a_primerApellido}`
                            )}
                          </a>
                        </td>
                        <td>{c?.r_usuarios_solicitante?.a_numeroDocumento || "-"}</td>
                        <td>{c?.r_usuarios_solicitante?.a_celular || "-"}</td>
                        <td>
                          {c?.r_usuarios_solicitante?.a_barrio}{" "}
                          {c?.r_usuarios_solicitante?.a_direccion}
                        </td>
                        <Policy policy={[ROL_ADMIN]}>
                          {citas.length && (
                            <td>
                              <a
                                target="blank"
                                className="d-block mb-1"
                                href={`${baseUrl}/doc_citacion_audiencia/${doc?.id}/${c?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                              >
                                Citación
                              </a>
                              <a
                                target="blank"
                                className="d-block"
                                href={`${baseUrl}/inasistencia_unaparte/${doc?.id}/${c?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/1`}
                              >
                                Inasistencia
                              </a>
                              <a
                                target="blank"
                                className="d-block mb-1"
                                href={`${baseUrl}/docx_citacion_audiencia/${doc?.id}/${c?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                              >
                                Citación (Word)
                              </a>
                              <a
                                target="blank"
                                className="d-block"
                                href={`${baseUrl}/docx_inasistencia_unaparte/${doc?.id}/${c?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/1`}
                              >
                                Inasistencia (Word)
                              </a>
                            </td>
                          )}
                        </Policy>
                      </tr>
                      <tr>
                        <th>Apoderado</th>
                        <td colSpan={4}>
                          {c?.a_nombreCompleto} {c?.a_telefono} {c?.a_celular}{" "}
                          {c?.a_correoElectronico}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Tab>
          <Tab eventKey="citados" title="Citados">
            <Modal.Body>
              <Policy policy={[ROL_ADMIN]}>
                {!citas.length && (
                  <Alert variant="warning">
                    Para descargar los formatos, asigne una cita en la pestaña Citas
                  </Alert>
                )}
              </Policy>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Celular</th>
                    <th>Dirección</th>
                    {citas.length && (
                      <Policy policy={[ROL_ADMIN]}>
                        <th>Imprimir formatos</th>
                      </Policy>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {doc?.r_citados?.map((c, i) => (
                    <>
                      <tr key={i}>
                        <td>
                          <a href="#" onClick={() => mostrarDetalles(c?.r_usuarios_citado?.id)}>
                            {c?.r_usuarios_citado?.c_tipoPersona === PERSONA_JURIDICA ? (
                              c?.r_usuarios_citado?.a_nombrePersonaJuridica
                            ) : (
                              `${c?.r_usuarios_citado?.a_primerNombre} ${c?.r_usuarios_citado?.a_primerApellido}`
                            )}
                          </a>
                        </td>
                        <td>{c?.r_usuarios_citado?.a_numeroDocumento || "-"}</td>
                        <td>{c?.r_usuarios_citado?.a_celular || "-"}</td>
                        <td>
                          {c?.r_usuarios_citado?.a_barrio}{" "}
                          {c?.r_usuarios_citado?.a_direccion}
                        </td>
                        <Policy policy={[ROL_ADMIN]}>
                          {citas.length && (
                            <td>
                              <a
                                target="blank"
                                className="d-block mb-1"
                                href={`${baseUrl}/doc_citacion_audiencia/${doc.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${c?.r_usuarios_citado?.id}/`}
                              >
                                Citación
                              </a>
                              <a
                                target="blank"
                                className="d-block"
                                href={`${baseUrl}/inasistencia_unaparte/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${c?.r_usuarios_citado?.id}/2`}
                              >
                                Inasistencia
                              </a>
                              <a
                                target="blank"
                                className="d-block mb-1"
                                href={`${baseUrl}/docx_citacion_audiencia/${doc.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${c?.r_usuarios_citado?.id}/`}
                              >
                                Citación (Word)
                              </a>
                              <a
                                target="blank"
                                className="d-block"
                                href={`${baseUrl}/docx_inasistencia_unaparte/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${c?.r_usuarios_citado?.id}/2`}
                              >
                                Inasistencia (Word)
                              </a>
                            </td>
                          )}
                        </Policy>
                      </tr>
                      <tr>
                        <th>Apoderado</th>
                        <td colSpan={4}>
                          {c?.a_nombreCompleto} {c?.a_telefono} {c?.a_celular}{" "}
                          {c?.a_correoElectronico}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              {!doc?.r_citados.length && (
                <Alert variant="warning">
                  No se ha citado a nadie para esta audiencia.
                </Alert>
              )}
            </Modal.Body>
          </Tab>
          <Tab eventKey="anexos" title="Anexos">
            <Modal.Body>
              <Table>
                {doc?.mm_documentosAnexos.length > 0 ? (
                  doc?.mm_documentosAnexos.map((d, i) => (
                    <tr key={i}>
                      <td>
                        <a
                          target="blank"
                          href={`${baseUrl}${d?.f_archivoDocumento}`}
                        >
                          {d?.a_titulo}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No se han anexado documentos.</p>
                )}
              </Table>
            </Modal.Body>
          </Tab>
          {policies.includes(ROL_ADMIN) && (
            <Tab eventKey="formatos" title="Impresión de formatos">
              <Modal.Body>
                {citas.length ? (
                  <>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/inasistencia_dospartes/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                    >
                      Inasistencia de dos partes
                    </a>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/doc_audiencia_conciliacion/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                    >
                      Acta de conciliación
                    </a>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/doc_noacuerdo/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                    >
                      Constancia de no conciliación
                    </a>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/docx_inasistencia_dospartes/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                    >
                      Inasistencia de dos partes (Word)
                    </a>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/docx_audiencia_conciliacion/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                    >
                      Acta de conciliación (Word)
                    </a>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/docx_noacuerdo/${doc?.id}/${doc?.r_solicitante[0]?.r_usuarios_solicitante?.id}/${doc?.r_citados[0]?.r_usuarios_citado?.id}/`}
                    >
                      Constancia de no conciliación (Word)
                    </a>
                  </>
                ) : (
                  <Alert variant="warning">
                    Para descargar los formatos, asigne una cita en la pestaña Citas
                  </Alert>
                )}
              </Modal.Body>
            </Tab>
          )}
          <Tab eventKey="citas" title="Citas">
            <Modal.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Fecha y hora de inicio</th>
                    <th>Fecha y hora de finalización</th>
                    <th>Modalidad</th>
                    <th>Salón de la audiencia</th>
                    <th>Enlace de la reunión</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((el, index) => (
                    <tr key={index}>
                      <td>
                        {moment(el?.d_fechaInicialAudiencia).format("DD/MMMM/YYYY hh:mm a")}
                      </td>
                      <td>
                        {moment(el?.d_fechaFinalAudiencia).format("DD/MMMM/YYYY hh:mm a")}
                      </td>
                      <td>
                        {el?.c_modalidad}
                      </td>
                      <td>
                        {el?.r_config_salaConciliacion?.a_titulo || "-"}
                      </td>
                      <td>
                        {el?.a_enlaceVirtual || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {!citas.length && (
                <Alert variant="warning">
                  No se ha agendado ninguna cita para atender este caso.
                </Alert>
              )}
              <Policy policy={[ROL_ADMIN, ROL_ESTUDIANTE]}>
                <Button onClick={() => setNuevaCitaShow(true)}>
                  Agregar nueva cita
                </Button>
              </Policy>
            </Modal.Body>
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
};

export default CentroDeConciliacionDetalle;
