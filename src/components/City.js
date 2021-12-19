import React, { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useCustomEventListener } from "react-custom-events";
import API from "utils/Axios";
import { Alert, Form, Button } from "react-bootstrap";
import Spin from "components/Spin";

const City = ({
  setValue,
  field = {},
  readOnly = false,
  plaintext = false,
}) => {
  const [state, setState] = useState(null);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    API(`configuracion/ciudad/?r_config_departamento=${state}`)
      .then(({ data }) => {
        setDocs(data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  useCustomEventListener(`load-${field.name}`, (data) => {
    console.log("Llego departamento ", data);
    setState(data);
  });

  useEffect(() => {
    if (state) {
      load();
    } else {
      setDocs([]);
      //setValue(field.name, "");
    }
  }, [state]);

  if (error) {
    return (
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Alert variant="warning">{`${error}, ciudades no cargadas.`}</Alert>
        <Button size="large" onClick={load} type="button">
          Recargar
        </Button>
      </div>
    );
  }

  if (plaintext) {
    const dep = docs.find((d) => d.id == field.value);
    return dep?.a_titulo || "...";
  }

  return (
    <Spin cargando={loading}>
      <Form.Control
        as="select"
        {...field}
        readOnly={readOnly}
        plaintext={readOnly}
        disabled={readOnly}
      >
        <option value={null}>Seleccione</option>
        {docs.map((c) => (
          <option key={c.id} value={c.id}>
            {c.a_titulo}
          </option>
        ))}
      </Form.Control>
    </Spin>
  );
};

export default City;
