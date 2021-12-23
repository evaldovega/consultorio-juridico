import Spin from "components/Spin";
import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import API from "utils/Axios";
const { Card, Row, Col, Form } = require("react-bootstrap");

const Clasificar = ({ control, watch }) => {
  const [cargando, setCargando] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [temas, setTemas] = useState([]);
  const [subtemas, setSubTemas] = useState([]);

  const materia = watch("r_config_areaMateria");
  const tema = watch("r_config_tema");

  const cargarMaterias = () => {
    setCargando(true);
    API("configuracion/area-conciliacion/")
      .then(({ data }) => setMaterias(data))
      .finally(() => setCargando(false));
  };

  const cargarTemas = () => {
    if (!materia) {
      return;
    }
    setCargando(true);
    API(`configuracion/tema-conciliacion/?r_config_areaMateria=${materia}`)
      .then(({ data }) => setTemas(data))
      .finally(() => setCargando(false));
  };
  const cargarSubTemas = () => {
    if (!tema) {
      return;
    }
    setCargando(true);
    API(`configuracion/subtema-conciliacion/?r_config_tema=${tema}`)
      .then(({ data }) => setSubTemas(data))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  useEffect(() => {
    cargarTemas();
  }, [materia]);

  useEffect(() => {
    cargarSubTemas();
  }, [tema]);

  return (
    <Spin cargando={cargando}>
      <Card className="mb-4">
        <Card.Body style={{ padding: "2.5rem" }}>
          <h2>Clasificar conciliación</h2>
          <Row className="mt-4">
            <Col xs="12" md="4">
              <Controller
                name="r_config_areaMateria"
                control={control}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Materia</Form.Label>
                    <Form.Control as="select" {...field} size="sm">
                      <option value="">Seleccione</option>
                      {materias.map((m) => (
                        <option value={m.id} key={m.id}>
                          {m.a_titulo}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="4">
              <Controller
                name="r_config_tema"
                control={control}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Tema</Form.Label>
                    <Form.Control as="select" {...field} size="sm">
                      <option value="">Seleccione</option>
                      {temas.map((m) => (
                        <option value={m.id} key={m.id}>
                          {m.a_titulo}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="4">
              <Controller
                name="r_config_subtema"
                control={control}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Sub tema</Form.Label>
                    <Form.Control as="select" {...field} size="sm">
                      <option value="">Seleccione</option>
                      {subtemas.map((m) => (
                        <option value={m.id} key={m.id}>
                          {m.a_titulo}
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
    </Spin>
  );
};
export default Clasificar;
