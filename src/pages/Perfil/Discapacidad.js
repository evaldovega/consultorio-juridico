import React, { useEffect, useState } from "react";
import API from "utils/Axios";
import { Form, Alert, Button, Col, Badge } from "react-bootstrap";
import { useContext } from "react";
import Context from "./Ctx";
import { Controller } from "react-hook-form";
import { ROL_ESTUDIANTE } from "constants/apiContants";

const PerfilDiscapacidad = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { control, setValue, getValues, readOnly, watch, policies } =
    useContext(Context);
  const checked = watch("mm_discapacidad", []);

  const load = () => {
    setLoading(true);
    setError(null);
    API("configuracion/discapacidad/")
      .then(({ data }) => {
        setDocs(data.map((el) => ({ label: el.a_titulo, value: el.id })));
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.toString());
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const onChange = (check) => {
    let values = getValues("mm_discapacidad") || [];
    const index = values.indexOf(parseInt(check.value));
    if (index < 0) {
      values.push(parseInt(check.value));
    } else {
      values.splice(index, 1);
    }
    setValue("mm_discapacidad", values);
  };

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <div>
        <Alert variant="warning">{error}</Alert>
        <Button type="secundary" key="console" onClick={load}>
          Recargar listado de discapacidades
        </Button>
      </div>
    );
  }

  if (readOnly || policies.includes(ROL_ESTUDIANTE)) {
    const discapacidadesSeleccionadas = docs.filter((d) =>
      checked?.some((c) => c == d.value)
    );

    if (discapacidadesSeleccionadas.length) {
      return (
        <div className="mb-4">
          <h2 className="mb-4">Discapacidad</h2>
          {discapacidadesSeleccionadas.map((d) => (
            <Badge variant="primary">{d.label}</Badge>
          ))}
        </div>
      );
    }
    return (
      <div className="mb-4">
        <h2 className="mb-4">Discapacidad</h2>
        <p>Ninguna</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="mb-4">Discapacidad</h2>
      <Form.Group>
        {docs.map((d, i) => (
          <Form.Check
            inline
            type="checkbox"
            disabled={readOnly}
            checked={checked?.some((c) => parseInt(c) == parseInt(d.value))}
            onChange={(e) => onChange(e.target)}
            value={parseInt(d.value)}
            label={d.label}
          />
        ))}
      </Form.Group>
    </div>
  );
};

export default PerfilDiscapacidad;
