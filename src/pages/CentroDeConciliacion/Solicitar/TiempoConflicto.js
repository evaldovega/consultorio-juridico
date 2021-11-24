import { Controller } from "react-hook-form";

import Errors from "components/Errors";
import { useState, useEffect } from "react";
import API from "utils/Axios";
import Spin from "components/Spin";
import { Alert, Col, Form, Button } from "react-bootstrap";

const TiempoConflicto = ({ errors, control, readOnly }) => {
  const [cargando, setCargando] = useState();
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);

  const load = () => {
    setCargando(true);
    setError(null);
    API("configuracion/tiempo-conflicto/")
      .then(({ data }) => {
        setDocs(data);
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.toString());
      })
      .finally(() => {
        setTimeout(() => {
          setCargando(false);
        }, 1000);
      });
  };

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Alert variant="warning">{`${error}, tiempos no cargados.`}</Alert>
        <Button size="large" onClick={load} type="button">
          Recargar
        </Button>
      </div>
    );
  }

  return (
    <Col xs="12" md="6" lg="4">
      <Spin cargando={cargando}>
        <Controller
          name="r_config_tiempoConflicto"
          control={control}
          defaultValue=""
          rules={{ required: "Seleccione" }}
          render={({ field }) => (
            <Form.Group>
              <Form.Label>
                Hace cuanto ocurrieron los hechos <span className="required" />
              </Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
                disabled={readOnly}
              >
                <option value="">Seleccion</option>
                {docs.map((el, i) => (
                  <option key={i} value={el.id}>
                    {el.a_titulo}
                  </option>
                ))}
              </Form.Control>
              <Errors message={errors.r_config_tiempoConflicto?.message} />
            </Form.Group>
          )}
        />
      </Spin>
    </Col>
  );
};

export default TiempoConflicto;
