import { Row, Col, Form, Image, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import API from "utils/Axios";
import { FaTrash } from "react-icons/fa";

const PersonaDetailRow = ({ id, allowRemove = false, onRemove }) => {
  const [cargnado, setCargando] = useState(false);
  const [doc, setDoc] = useState({});

  const cargar = () => {
    setCargando(true);
    API(`/usuarios/personas/${id}/`)
      .then(({ data }) => setDoc(data))
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
          <Image src={doc.f_archivoFotoPerfil} />
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
      <Col xs="6" md="3">
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={doc.a_primerNombre}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
      </Col>
      <Col xs="6" md="3">
        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            value={doc.a_primerApellido}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
        {allowRemove ? (
          <Button variant="danger" onClick={remove}>
            <FaTrash />
          </Button>
        ) : null}
      </Col>
    </Row>
  );
};

export default PersonaDetailRow;
