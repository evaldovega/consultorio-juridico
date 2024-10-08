import Page from "components/Page";
import Policy from "components/Policy";
import { ROL_ADMIN, ROL_DOCENTE, ROL_ESTUDIANTE } from "constants/apiContants";
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
import DocenteAsesoria from '../../AsesoriaJuridicaDetalle/Estudiantes/Docente'
import TextArea from "antd/lib/input/TextArea";
import { Label } from "reactstrap";

var moment = require('moment')

const CentroDeConciliacionDetalle = ({ id, setId, onHide }) => {
  const { policies = [], persona } = useContext(Context);
  const [cargando, setCargando] = useState(false);
  const [doc, setDoc] = useState(null);
  const [citas, setCitas] = useState([])
  const [idModal, setIdModal] = useState(null);
  const [nuevaCitaShow, setNuevaCitaShow] = useState(false)
  const [nuevaCitaEditShow, setNuevaCitaEditShow] = useState(false)
  const [showProfileData, setShowProfileData] = useState(false)
  const [cedulas, setCedulas] = useState([])
  const [estudianteAsesor, setIdEstudianteAsesor] = useState(null)

  const [showModalCierre, setShowModalCierre] = useState(false);
  const [motivoCierre, setMotivoCierre] = useState("")
  const [archivoCierre, setArchivoCierre] = useState("")
  const [nombreArchivoCierre, setNombreArchivoCierre] = useState("")

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
    if (id) {
      await API(`conciliacion/agenda/?page_size=500&solicitud=${id}`)
        .then(response => {
          setCitas(response.data.results)
        })
    }
  }

  const cargarAsesor = async () => {
    try {
      const { data } = await API.post(`conciliacion/solicitud/buscar_asesor/`, {
        "no_caso_conciliacion": id
      })
      if (data.estudiante) {
        setIdEstudianteAsesor(data.estudiante)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const mostrarDetalles = (id) => {
    localStorage.setItem('consultorio_id_profileshow', id)
    setShowProfileData(true)
  }

  const edit = (id) => {
    localStorage.setItem('cj_cita_editar', id)
    console.log(localStorage.getItem('cj-cita-editar'))
    setNuevaCitaEditShow(true)
  }

  useEffect(() => {
    if (id) {
      cargar();
      cargarCitas();
      cargarAsesor();
    }
  }, [id]);

  useEffect(() => {
    cargarCitas()
  }, [nuevaCitaShow])

  useEffect(() => {
    cargarCitas()
  }, [nuevaCitaEditShow])

  const cerrarConciliacion = () => {
    let confirmacion = window.confirm("¿Está seguro de cerrar este caso?")
    if(confirmacion == true){
      setCargando(true);
      API.post(`conciliacion/solicitud/${doc.id}/cerrar/`, {
        "motivo": motivoCierre,
        "anexo": archivoCierre,
        "titulo": nombreArchivoCierre
      })
      .then(data => {
        setShowModalCierre(false);
        cargar();
      })
      .finally(() => setCargando(false));
    }
  }

  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result, file.name);
      setNombreArchivoCierre(file.name)
      setArchivoCierre(reader.result)
    };
  };

  if (cargando) {
    return (
      <Modal show={true}>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Cargando detalle</h1>
            <p>Espere un momento por favor...</p>
            <Spinner animation="border" status="primary" />
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Modal show={showModalCierre}>
        <Modal.Header>
          <Modal.Title>Cerrar caso de conciliación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Por favor ingrese los motivos para dar cierre al caso No. { doc?.id }</p>
          <TextArea style={{padding:"4px 8px"}} onChange={(t) => setMotivoCierre(t.target.value)} rows={4} placeholder="Escriba aquí..."></TextArea>
          <div style={{ marginTop:"12px" }}>
            <Label>Archivos adjuntos (opcional)</Label>
            <input type="file" onChange={onChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModalCierre(false)}>Cancelar</Button>
          <Button onClick={cerrarConciliacion}>Cerrar caso</Button>
        </Modal.Footer>
      </Modal>

      <NuevaCita
        id={id}
        show={nuevaCitaShow}
        onHide={() => setNuevaCitaShow(false)}
      />
      <NuevaCita
        id={id}
        idCita={localStorage.getItem('cj_cita_editar')}
        show={nuevaCitaEditShow}
        onHide={() => setNuevaCitaEditShow(false)}
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
                <Col xs="12" md="6" lg="4">
                  <Policy policy={[ROL_ADMIN]}>
                    { doc?.estado_cierre_caso ? 
                      <div>
                        Caso cerrado en: { moment(doc?.estado_cierre_caso).format("Y-MM-D")}
                        <p><b>Motivo de cierre:</b> { doc?.t_motivoCierre }<br />
                        { doc?.f_adjuntoCierre ? <a target="_blank" href={doc?.f_adjuntoCierre}>Ver adjunto</a> : "" }</p>
                      </div>
                    : <Button size="medium" onClick={() => setShowModalCierre(true)} type="button">Cerrar caso</Button>
                    }
                  </Policy>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="4" lg="4">
                  <Form.Label>País</Form.Label>
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
                    <Policy policy={[ROL_ADMIN, ROL_DOCENTE]}>
                      <DocenteAsesoria id={doc?.r_usuarios_conciliador?.id} />
                    </Policy>
                  </Col>
                </Row>
              )}
              {estudianteAsesor && (
                <Row>
                  <Col xs="12">
                    <Form.Label>Estudiante asesor</Form.Label>
                    <PersonaDetailRow
                      id={estudianteAsesor}
                    />
                    <Policy policy={[ROL_ADMIN, ROL_DOCENTE]}>
                      <DocenteAsesoria id={estudianteAsesor} />
                    </Policy>
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
                      {citas.length && doc?.r_citados?.length ? (
                        <th>Imprimir formatos</th>
                      ) : null}
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
                          {citas.length && doc?.r_citados?.length ? (
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
                          ) : null}
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
                    {citas.length ? (
                      <Policy policy={[ROL_ADMIN]}>
                        <th>Imprimir formatos</th>
                      </Policy>
                    ) : null}
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
                          {citas.length ? (
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
                          ) : null}
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
                {doc?.r_solicitante.map((d, i) => (
                  d?.r_usuarios_solicitante?.f_archivoDocumento && (
                    <tr key={i}>
                      <td>
                        <a
                          href={`${baseUrl}${d?.r_usuarios_solicitante?.f_archivoDocumento}`}
                        >
                          {`Documento de identidad de ${d?.r_usuarios_solicitante?.a_primerNombre} ${d?.r_usuarios_solicitante?.a_primerApellido}`}
                        </a>
                      </td>
                    </tr>
                  )
                ))}
                {doc?.r_citados.map((d, i) => (
                  d?.r_usuarios_citado?.f_archivoDocumento && (
                    <tr key={i}>
                      <td>
                        <a
                          href={`${baseUrl}${d?.r_usuarios_citado?.f_archivoDocumento}`}
                        >
                          {`Documento de identidad de ${d?.r_usuarios_citado?.a_primerNombre} ${d?.r_usuarios_citado?.a_primerApellido}`}
                        </a>
                      </td>
                    </tr>
                  )
                ))}
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
                {citas?.length && doc?.r_citados?.length ? (
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
                  null
                )}
                {!citas.length ? (
                  <Alert variant="warning">
                    Para descargar los formatos, asigne una cita en la pestaña Citas
                  </Alert>
                ) : null}
                {!doc?.r_citados?.length && (
                  <Alert variant="warning">
                    Debe haber al menos una persona citada para poder descargar los formatos.
                  </Alert>
                )}
              </Modal.Body>
            </Tab>
          )}
          <Tab eventKey="citas" title="Citas">
            <Modal.Body>
              <div style={{ overflow: 'scroll' }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Fecha y hora de inicio</th>
                      <th>Fecha y hora de finalización</th>
                      <th>Modalidad</th>
                      <th>Salón de la audiencia</th>
                      <th>Enlace de la reunión</th>
                      {policies.includes(ROL_ADMIN) && (
                        <th></th>
                      )}
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
                          {el.a_enlaceVirtual ? <a href={el?.a_enlaceVirtual}>{el?.a_enlaceVirtual}</a> : "-"}
                        </td>
                        {policies.includes(ROL_ADMIN) && (
                          <td>
                            <div
                              className="circle-icon mr-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => edit(el.id)}
                            >
                              <FaEye />
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {!citas.length && (
                  <Alert variant="warning">
                    No se ha agendado ninguna cita para atender este caso.
                  </Alert>
                )}
              </div>
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
