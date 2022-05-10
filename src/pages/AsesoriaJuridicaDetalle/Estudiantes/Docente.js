import { Row, Col, Form, Image, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import API, { baseUrl } from "utils/Axios";
import { FaTrash } from "react-icons/fa";
import { useRef } from "react";
import Img from "components/Img";
import { PERSONA_JURIDICA, PERSONA_NATURAL } from "constants/apiContants";

const DocenteAsesoria = ({ id }) => {
  const [cargnado, setCargando] = useState(false);
  const [doc, setDoc] = useState({});
  const [error, setError] = useState(null)

  const cargar = () => {
    setCargando(true);
    API.post(`/asignacion/empleados/consultar_estudiante/`, {
        "id_estudiante": id
    })
      .then(({ data }) =>
        setDoc({
          ...data,
        })
      )
      .catch(error => {
        setError(error?.response?.data?.detail || error.toString())
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  if (error) {
    return(
      <div>
        <h1>{error}</h1>
      </div>
    )
  }
  
  return (
    <Row className="mb-2 align-items-center">
      <Col xs="6" md="6">
        <Form.Group>
          <Form.Label>Docente del estudiante</Form.Label>
          <Form.Control
            value={doc?.nombre_docente}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
      </Col>
      <Col xs="6" md="4">
        <Form.Group>
          <Form.Label>Número de consultorio</Form.Label>
          <Form.Control
            value={doc?.consultorio}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
      </Col>
      <Col xs="6" md="2">
        <Form.Group>
          <Form.Label>Grupo</Form.Label>
          <Form.Control
            value={doc?.grupo}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default DocenteAsesoria;
