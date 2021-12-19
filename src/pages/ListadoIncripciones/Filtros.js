import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { ExportToExcel } from "components/ExportToExcel";
import { useForm, Controller } from "react-hook-form";
const { Row, Col, Button, Form } = require("react-bootstrap");

const InscripcionesFiltros = ({
  docs = [],
  totalRegistros = 0,
  params,
  setParams,
  discapacidades,
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const btn = useRef();
  const checked = watch("discapacida", []);
  const filtrar = (data) => {
    console.log(data);
    const filtros = { ...data };
    filtros.discapacidad = filtros.discapacidad.length
      ? filtros.discapacidad.join(",")
      : "";

    setParams({ ...params, page: 1, ...filtros });
  };

  const limpiar = () => {
    setValue("cedula", "");
    setValue("codestudiante", "");
    setValue("fechainicio", "");
    setValue("fechafin", "");
    setValue("primer_nombre", "");
    setValue("segundo_nombre", "");
    setValue("primer_apellido", "");
    setValue("segundo_apellido", "");
    setValue("semestre", "");
    setValue("discapacidad", []);
    btn.current.click();
  };

  const onChange = (check) => {
    let values = getValues("discapacidad") || [];
    const index = values.indexOf(parseInt(check.value));
    if (index < 0) {
      values.push(parseInt(check.value));
    } else {
      values.splice(index, 1);
    }
    setValue("discapacidad", values);
  };

  useEffect(() => {
    setValue("cedula", "");
    setValue("codestudiante", "");
    setValue("fechainicio", "");
    setValue("fechafin", "");
    setValue("primer_nombre", "");
    setValue("segundo_nombre", "");
    setValue("primer_apellido", "");
    setValue("segundo_apellido", "");
    setValue("semestre", "");
    setValue("discapacidad", []);
  }, []);
  return (
    <Form noValidate onSubmit={handleSubmit(filtrar)} className="mb-4">
      <h4>Por documento</h4>
      <Row className="mb-1">
        <Col xs="12" md="6">
          <Controller
            name="cedula"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Cédula</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="codestudiante"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Código estudiantil</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <h4>Por rango de fecha</h4>
      <Row className="mb-1">
        <Col xs="12" md="6">
          <Controller
            name="fechainicio"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Fecha inicio</Form.Label>
                <Form.Control type="date" {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="fechafin"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Fecha fin</Form.Label>
                <Form.Control type="date" {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <h4>Por nombre</h4>
      <Row className="mb-1">
        <Col xs="12" md="6">
          <Controller
            name="primer_nombre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Primer nombre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="primer_apellido"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Primer apellido</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="segundo_nombre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Segundo nombre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="segundo_apellido"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Segundo apellido</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <h4>Por discapacidades</h4>
      <Form.Group>
        {discapacidades.map((d, i) => (
          <Form.Check
            inline
            type="checkbox"
            checked={checked?.some((c) => parseInt(c) == parseInt(d.value))}
            onChange={(e) => onChange(e.target)}
            value={parseInt(d.value)}
            label={d.label}
          />
        ))}
      </Form.Group>
      <h4>Otros</h4>
      <Row className="mb-1">
        <Col xs="12" md="6">
          <Controller
            name="semestre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Semestre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Button type="submit" ref={btn}>
            Consultar
          </Button>
          <Button type="button" variant="light" onClick={limpiar}>
            Limpiar filtros
          </Button>
        </div>
        <ExportToExcel apiData={docs} fileName="documento" />
      </div>
    </Form>
  );
};

export default InscripcionesFiltros;
