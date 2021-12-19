import React, { useEffect, useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { emitCustomEvent } from "react-custom-events";
import API from "utils/Axios";
import Spin from "components/Spin";

const Country = ({
  child = "",
  field = {},
  setValue,
  readOnly = false,
  plaintext = false,
}) => {
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
    console.log("enviar pais ", field.value);
    setTimeout(() => {
      emitCustomEvent(`load-${child}`, field.value);
    }, 500);
    if (!field?.value?.length) {
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
  if (plaintext) {
    const pais = docs.find((d) => d.id == field.value);
    return pais?.a_titulo || "...";
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

export default Country;
