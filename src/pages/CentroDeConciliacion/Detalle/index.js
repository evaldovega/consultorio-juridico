import Page from "components/Page";
import Policy from "components/Policy";
import { ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE } from "constants/apiContants";
import Spin from "components/Spin";
import { useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API, { baseUrl } from "utils/Axios";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";

const CentroDeConciliacionDetalle = ({ id, setId, onHide }) => {
  const [cargando, setCargando] = useState(false);
  const [doc, setDoc] = useState(null);

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

  useEffect(() => {
    if (id) {
      cargar();
    }
  }, [id]);

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
    <Modal
      show={doc}
      onHide={() => {
        setDoc(null);
        onHide();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Conciliación</Modal.Title>
      </Modal.Header>
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
        <h5>Solicitantes</h5>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Celular</th>
              <th>Dirección</th>
              <th>Imprimir formatos</th>
            </tr>
          </thead>
          <tbody>
            {doc?.r_solicitante?.map((c, i) => (
              <>
                <tr key={i}>
                  <td>
                    {c?.r_usuarios_solicitante?.a_primerNombre}{" "}
                    {c?.r_usuarios_solicitante?.a_primerApellido}
                  </td>
                  <td>{c?.r_usuarios_solicitante?.a_numeroDocumento}</td>
                  <td>{c?.r_usuarios_solicitante?.a_celular}</td>
                  <td>
                    {c?.r_usuarios_solicitante?.a_barrio}{" "}
                    {c?.r_usuarios_solicitante?.a_direccion}
                  </td>
                  <td>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/correo/${doc.id}/${c.r_usuarios_solicitante.id}/${doc?.r_citados[0].r_usuarios_citado?.id}/`}
                    >
                      Citación
                    </a>
                    <a
                      target="blank"
                      className="d-block"
                      href={`${baseUrl}/inasistencia_unaparte/${doc.id}/${c.r_usuarios_solicitante.id}/${doc?.r_citados[0].r_usuarios_citado?.id}/1`}
                    >
                      Inasistencia
                    </a>
                  </td>
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
        <h5>Citados</h5>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Celular</th>
              <th>Dirección</th>
              <th>Imprimir formatos</th>
            </tr>
          </thead>
          <tbody>
            {doc?.r_citados?.map((c, i) => (
              <>
                <tr key={i}>
                  <td>
                    {c.r_usuarios_citado?.a_primerNombre}{" "}
                    {c.r_usuarios_citado?.a_primerApellido}
                  </td>
                  <td>{c.r_usuarios_citado?.a_numeroDocumento}</td>
                  <td>{c.r_usuarios_citado?.a_celular}</td>
                  <td>
                    {c.r_usuarios_citado?.a_barrio}{" "}
                    {c.r_usuarios_citado?.a_direccion}
                  </td>
                  <td>
                    <a
                      target="blank"
                      className="d-block mb-1"
                      href={`${baseUrl}/correo/${doc.id}/${doc?.r_solicitante[0].r_usuarios_solicitante?.id}/${c.r_usuarios_citado.id}/`}
                    >
                      Citación
                    </a>
                    <a
                      target="blank"
                      className="d-block"
                      href={`${baseUrl}/inasistencia_unaparte/${doc.id}/${doc?.r_solicitante[0].r_usuarios_solicitante?.id}/${c.r_usuarios_citado.id}/2`}
                    >
                      Inasistencia
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Apoderado</th>
                  <td colSpan={4}>
                    {c.a_nombreCompleto} {c.a_telefono} {c.a_celular}{" "}
                    {c.a_correoElectronico}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col xs="12">
            <Form.Label>Resumen</Form.Label>
            <p>{doc?.t_resumenHechos}</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Form.Label>Pretenciones iniciales</Form.Label>
            <p>{doc?.t_pretencionesIniciales}</p>
          </Col>
        </Row>

        <Table>
          <thead>
            <tr>
              <th>Archivo anexo</th>
            </tr>
          </thead>

          {doc?.mm_documentosAnexos.map((d, i) => (
            <tr key={i}>
              <td>
                <Link target="blank" to={d.f_archivoDocumento}>
                  {d.a_titulo}
                </Link>
              </td>
            </tr>
          ))}
        </Table>

        <h5>Imprimir formatos</h5>
        <a
          target="blank"
          className="d-block mb-1"
          href={`${baseUrl}/inasistencia_dospartes/${doc?.id}/${doc?.r_solicitante[0].r_usuarios_solicitante?.id}/${doc?.r_citados[0].r_usuarios_citado?.id}/`}
        >
          Inasistencia de dos partes
        </a>
        <a
          target="blank"
          className="d-block mb-1"
          href={`${baseUrl}/doc_audiencia_conciliacion/${doc?.id}/${doc?.r_solicitante[0].r_usuarios_solicitante?.id}/${doc?.r_citados[0].r_usuarios_citado?.id}/`}
        >
          Acta de conciliación
        </a>
        <a
          target="blank"
          className="d-block mb-1"
          href={`${baseUrl}/doc_noacuerdo/${doc?.id}/${doc?.r_solicitante[0].r_usuarios_solicitante?.id}/${doc?.r_citados[0].r_usuarios_citado?.id}/`}
        >
          Acta de no conciliación
        </a>
      </Modal.Body>
    </Modal>
  );
};

export default CentroDeConciliacionDetalle;
