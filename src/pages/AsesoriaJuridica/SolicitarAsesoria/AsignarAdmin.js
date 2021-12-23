import { useState, useContext, useEffect } from "react";
import { FaInfo } from "react-icons/fa";
import Context from "./Ctx";
import { Card, Button, Table, Alert, Row, Col, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import API from "utils/Axios";

const AsignarAdmin = () => {
  const { readOnly, control, errors, setValue, watch, getValues } =
    useContext(Context);
  const [docs, setDocs] = useState([]);

  const cargar = () => {
    API("usuarios/empleados/empleadoscargos").then(({ data }) => setDocs(data));
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <Card>
      <Card.Body>
        <h2>Asignar administrador</h2>
        <Row>
          <Col>
            <Alert
              variant="light"
              className="d-flex justify-content-start align-items-center"
            >
              <div className="circle-icon mr-2">
                <FaInfo />
              </div>
              <span>
                El administrador asignado recibira las actualizaciones del caso.
              </span>
            </Alert>
            <Controller
              name="r_usuarios_administrativo"
              control={control}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Admin <span className="required" />
                  </Form.Label>
                  <Form.Control as="select" {...field}>
                    <option value="">Ninguno</option>
                    {docs.map((d) => (
                      <option value={d.id} key={d.id}>
                        {d.nombres}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AsignarAdmin;
