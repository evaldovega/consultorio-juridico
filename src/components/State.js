import React, { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";
import API from "utils/Axios";
import { Form, Button, Alert } from "react-bootstrap";
const State = ({ child = "", field = {}, setValue, readOnly = false }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState(null);

  useCustomEventListener(`load-${field.name}`, (data) => {
    setCountry(data);
  });

  const load = () => {
    setLoading(true);
    setError(null);
    API(`configuracion/departamento?r_config_pais=${country}`)
      .then(({ data }) => {
        setDocs(data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (country) {
      load();
    } else {
      //selected("");
      setValue(field.name, "");
      setDocs([]);
    }
  }, [country]);

  useEffect(() => {
    emitCustomEvent(`load-${child}`, field.value);
    if (!field?.value.length) {
      //setValue(child, "");
    }
  }, [field.value]);

  if (error) {
    return (
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Alert variant="warning">{`${error}, Dep. no cargados.`}</Alert>
        <Button
          icon={<SyncOutlined />}
          size="large"
          onClick={load}
          type="button"
        >
          Recargar
        </Button>
      </div>
    );
  }

  return (
    <Form.Control
      as="select"
      {...field}
      readOnly={readOnly}
      plaintext={readOnly}
      disabled={readOnly}
    >
      <option value="">Seleccione</option>
      {docs.map((c) => (
        <option key={c.id} value={c.id}>
          {c.a_titulo}
        </option>
      ))}
    </Form.Control>
  );
};

export default State;
