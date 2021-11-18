import React, { useEffect, useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { emitCustomEvent } from "react-custom-events";
import API from "utils/Axios";

const Country = ({ child = "", field = {}, setValue, readOnly = false }) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    API("configuracion/pais/")
      .then(({ data }) => {
        setDocs(data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    emitCustomEvent(`load-${child}`, field.value);
    if (!field.value.length) {
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
        <Alert variant="warning">{`${error}, paises no cargados.`}</Alert>
        <Button onClick={load} type="button">
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

export default Country;
