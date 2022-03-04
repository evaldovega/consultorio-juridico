import { Row, Col, Form, Image, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import API, { baseUrl } from "utils/Axios";
import { FaTrash } from "react-icons/fa";
import { useRef } from "react";
import Img from "components/Img";
import { PERSONA_JURIDICA, PERSONA_NATURAL } from "constants/apiContants";

const PersonaDetailRow = ({ id, allowRemove = false, onRemove }) => {
  const [cargnado, setCargando] = useState(false);
  const [doc, setDoc] = useState({});

  const cargar = () => {
    setCargando(true);
    API(`/usuarios/personas/${id}/`)
      .then(({ data }) =>
        setDoc({
          ...data,
          f_archivoFotoPerfil: `${baseUrl}${data.f_archivoFotoPerfil}`,
        })
      )
      .finally(() => setCargando(false));
  };

  const remove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <Row className="mb-2 align-items-center">
      <Col>
        <div className="circle-profile" style={{ width: 64, height: 64 }}>
          <Img originalSrc={doc.f_archivoFotoPerfil} roundedCircle={true} />
        </div>
      </Col>
      <Col xs="6" md="3">
        <Form.Group>
          <Form.Label>Identificación</Form.Label>
          <Form.Control
            value={doc.a_numeroDocumento}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
      </Col>
      {doc.c_tipoPersona === PERSONA_JURIDICA ? (
        <Col xs="6" md="6">
          <Form.Group>
            <Form.Label>Razón social</Form.Label>
            <Form.Control
              value={doc.a_nombrePersonaJuridica}
              readOnly={true}
              plaintext={true}
            />
          </Form.Group>
        </Col>
      ) : (
        <>
          <Col xs="6" md="3">
            <Form.Group>
              <Form.Label>Nombre(s)</Form.Label>
              <Form.Control
                value={`${doc.a_primerNombre} ${doc.a_segundoNombre || ""}`}
                readOnly={true}
                plaintext={true}
              />
            </Form.Group>
          </Col>
          <Col xs="6" md="3">
            <Form.Group>
              <Form.Label>Apellido(s)</Form.Label>
              <Form.Control
                value={`${doc.a_primerApellido} ${doc.a_segundoApellido || ""}`}
                readOnly={true}
                plaintext={true}
              />
            </Form.Group>
          </Col>
        </>
      )}
      {allowRemove ? (
        <Col>
          <Button variant="danger" onClick={remove}>
            <FaTrash />
          </Button>
        </Col>
      ) : null}
    </Row>
  );
};

export default PersonaDetailRow;
