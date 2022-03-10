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
      {/* <Col>
        <div className="circle-profile" style={{ width: 64, height: 64 }}>
          <Img originalSrc={doc.f_archivoFotoPerfil} roundedCircle={true} />
        </div>
      </Col> */}
      <Col xs="6" md="3">
        <Form.Group>
          <Form.Label>Docente del estudiante</Form.Label>
          <Form.Control
            value={doc.nombre_docente}
            readOnly={true}
            plaintext={true}
          />
        </Form.Group>
      </Col>
      {/* {doc.c_tipoPersona === PERSONA_JURIDICA ? (
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
      )} */}
      {/* {allowRemove ? (
        <Col>
          <Button variant="danger" onClick={remove}>
            <FaTrash />
          </Button>
        </Col>
      ) : null} */}
    </Row>
  );
};

export default DocenteAsesoria;
