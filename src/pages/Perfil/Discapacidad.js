import React, { useEffect, useState } from "react";
import API from "utils/Axios";
import { Form, Alert, Button, Col } from "react-bootstrap";
import { useContext } from "react";
import Context from "./Ctx";
import { Controller } from "react-hook-form";

const PerfilDiscapacidad = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { control, setValue, getValues, readOnly, watch } = useContext(Context);
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
    const index = values.indexOf(check.value);
    if (index < 0) {
      values.push(check.value);
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
        <Button type="button" type="secundary" key="console" onClick={load}>
          Recargar listado de discapacidades
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="title-line">
        <span>Discapacidad</span>
      </h3>
      <Form.Group>
        {docs.map((d, i) => (
          <Form.Check
            inline
            type="checkbox"
            disabled={readOnly}
            checked={checked?.some((c) => c == d.value)}
            onChange={(e) => onChange(e.target)}
            value={d.value}
            label={d.label}
          />
        ))}
      </Form.Group>
    </div>
  );
};

export default PerfilDiscapacidad;
