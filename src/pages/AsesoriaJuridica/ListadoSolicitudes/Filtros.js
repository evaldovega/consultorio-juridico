import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { ExportToExcel } from "components/ExportToExcel";
import { useForm, Controller } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import API from "utils/Axios";
const { Row, Col, Button, Form, Accordion, Card } = require("react-bootstrap");

const Filtros = ({
  docs = [],
  totalRegistros = 0,
  params,
  setParams,
  discapacidades,
}) => {
  const [areas, setAreas] = useState([]);
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
  const btnCollapsed = useRef();

  const filtrar = (data) => {
    const filtros = { ...data };
    setParams({ ...params, page: 1, ...filtros });
  };

  const cargarAreas = () => {
    API("configuracion/area-asesoria/").then(({ data }) => {
      setAreas(data);
    });
  };

  const limpiar = () => {
    setValue("fechainicio", "");
    setValue("fechafin", "");
    setValue("fecha_asignacion_inicio", "");
    setValue("fecha_asignacion_fin", "");
    setValue("doc_solicitante", "");
    setValue("primer_nombre", "");
    setValue("segundo_nombre", "");
    setValue("primer_apellido", "");
    setValue("segundo_apellido", "");
    setValue("area_asesoria", "");
    btn.current.click();
  };

  useEffect(() => {
    setValue("fechainicio", "");
    setValue("fechafin", "");
    setValue("fecha_asignacion_inicio", "");
    setValue("fecha_asignacion_fin", "");
    setValue("primer_nombre", "");
    setValue("segundo_nombre", "");
    setValue("primer_apellido", "");
    setValue("segundo_apellido", "");
    setValue("area_asesoria", "");
  }, []);

  useEffect(() => {
    if (btnCollapsed && btnCollapsed.current) {
      setTimeout(() => btnCollapsed.current.click(), 600);
    }
    cargarAreas();
  }, [btnCollapsed]);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
            ref={btnCollapsed}
          >
            <FaFilter /> Filtrar
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit(filtrar)} className="mb-4">
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
              <h4>Por fecha de asignación</h4>
              <Row className="mb-1">
                <Col xs="12" md="6">
                  <Controller
                    name="fecha_asignacion_inicio"
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
                    name="fecha_asignacion_fin"
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
              <h4>Por cédula del solicitante</h4>
              <Row className="mb-1">
                <Col xs="12" md="6">
                  <Controller
                    name="doc_solicitante"
                    control={control}
                    render={({ field }) => (
                      <Form.Group>
                        <Form.Label>Documento del solicitante</Form.Label>
                        <Form.Control {...field} size="sm" />
                      </Form.Group>
                    )}
                  />
                </Col>
              </Row>
              <h4>Por nombre del solicitante</h4>
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

              <h4>Otros</h4>
              <Row className="mb-1">
                <Col xs="12" md="6">
                  <Controller
                    name="area_asesoria"
                    control={control}
                    render={({ field }) => (
                      <Form.Group>
                        <Form.Label>Area</Form.Label>
                        <Form.Control {...field} size="sm" as="select">
                          <option value="">Todas</option>
                          {areas?.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.a_titulo}
                            </option>
                          ))}
                        </Form.Control>
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
              </div>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Filtros;
