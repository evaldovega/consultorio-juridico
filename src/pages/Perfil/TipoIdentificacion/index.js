import { Controller } from "react-hook-form";

import Errors from "components/Errors";
import { useState, useEffect } from "react";
import API from "utils/Axios";
import Spin from "components/Spin";
import { Alert, Col, Form, Button } from "react-bootstrap";

const TipoIdentificacion = ({ errors, control, readOnly }) => {
  const [cargando, setCargando] = useState();
  const [tiposDocumento, setTipos] = useState([]);
  const [error, setError] = useState(null);

  const load = () => {
    setCargando(true);
    setError(null);
    API("configuracion/tipo-documento/")
      .then(({ data }) => {
        setTipos(data);
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
        <Alert variant="warning">{`${error}, tipo de documentos no cargadas.`}</Alert>
        <Button size="large" onClick={load} type="button">
          Recargar
        </Button>
      </div>
    );
  }

  return (
    <Spin cargando={cargando}>
      <Controller
        name="r_config_tipoDocumento"
        control={control}
        defaultValue=""
        rules={{ required: "Seleccione un tipo" }}
        render={({ field }) => (
          <Form.Group as={Col} xs="12" md="6" lg="3">
            <Form.Label>
              Tipo documento <span className="required" />
            </Form.Label>
            <Form.Control
              as="select"
              {...field}
              readOnly={readOnly}
              plaintext={readOnly}
              disabled={readOnly}
            >
              <option value="">Seleccion</option>
              {tiposDocumento.map((el, i) => (
                <option key={i} value={el.id}>
                  {el.a_titulo}
                </option>
              ))}
            </Form.Control>
            <Errors message={errors.r_config_tipoDocumento?.message} />
          </Form.Group>
        )}
      />
    </Spin>
  );
};

export default TipoIdentificacion;
