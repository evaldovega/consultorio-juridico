import React, { useState } from "react";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "../../../constants/apiContants";
import { Link } from "react-router-dom";
import Page from "components/Page";
import Policy from "components/Policy";
import AccessDenied from "components/Policy/AccessDenied";
import { Breadcrumb, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Errors from "components/Errors";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
import Anexos from "./Anexos";
import Solicitantes from "./Solicitantes";

const CentroDeConciliacionSolicitar = () => {
  const [cargando, setCarando] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };
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

  const onError = (e) => {
    toast.info("😥 Ingresa la información faltante por favor!", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const guardar = () => {};
  return (
    <Policy
      policy={[ROL_ADMIN, ROL_ESTUDIANTE, ROL_ASESOR]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/centro-de-conciliacion">Centro de conciliación</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Registrar conciliación</Breadcrumb.Item>
        </Breadcrumb>

        <Form
          noValidate
          onSubmit={handleSubmit(guardar, onError)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <Solicitantes
            control={control}
            setValue={setValue}
            watch={watch}
            getValues={getValues}
          />

          <Card className="mt-1 mb-1">
            <Card.Body style={{ padding: "2.5rem" }}>
              <h2 className="title-line">
                <span>Versión del solicitante</span>
              </h2>
              <Row className="mb-3">
                <Controller
                  name="dt_fechaAsesoria"
                  control={control}
                  rules={{
                    required: "Ingrese información",
                  }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs="12" md="8">
                      <Form.Label>
                        Hace cuanto ocurrieron los hechos{" "}
                        <span className="required" />
                      </Form.Label>
                      <Form.Control
                        disabled={cargando || readOnly}
                        readonly={readOnly}
                        plaintext={readOnly}
                        placeholder="hace 3 días, hace 2 semanas..."
                        {...field}
                      />
                      <Errors message={errors?.dt_fechaAsesoria?.message} />
                    </Form.Group>
                  )}
                />
                <Controller
                  name="cuantia"
                  control={control}
                  render={({ field }) => (
                    <Form.Group as={Col} xs="12" md="4">
                      <Form.Label>Cuantia</Form.Label>
                      <Form.Control
                        {...field}
                        disabled={cargando || readOnly}
                        readonly={readOnly}
                      />
                    </Form.Group>
                  )}
                />
              </Row>

              <Row className="mb-3">
                <Controller
                  name="dt_fechaAsesoria"
                  control={control}
                  rules={{
                    required: "Ingrese información",
                  }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs="12" md="8">
                      <Form.Label>
                        Última vez que alguien intervino en el conflicto
                        <span className="required" />
                      </Form.Label>
                      <Form.Control
                        disabled={cargando || readOnly}
                        readonly={readOnly}
                        plaintext={readOnly}
                        placeholder="hace 3 días, hace 2 semanas..."
                        {...field}
                      />
                      <Errors message={errors?.dt_fechaAsesoria?.message} />
                    </Form.Group>
                  )}
                />
                <Controller
                  name="cuantia"
                  control={control}
                  render={({ field }) => (
                    <Form.Group as={Col} xs="12" md="4">
                      <Form.Label>Presencia de violencia fisica</Form.Label>
                      <Form.Control
                        {...field}
                        disabled={cargando || readOnly}
                        readonly={readOnly}
                        as="select"
                      >
                        <option>Seleccione</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </Form.Control>
                    </Form.Group>
                  )}
                />
              </Row>

              <Row className="mb-3">
                <Controller
                  name="r_config_paisExpedicion"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Ingrese su pais de expedición" }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs={12} md={4}>
                      <Form.Label>
                        Pais <span className="required" />
                      </Form.Label>
                      <Country
                        field={field}
                        child="r_config_departamentoExpedicion"
                        setValue={setValue}
                        readOnly={readOnly}
                        plaintext={readOnly}
                      />
                      <Errors
                        message={errors.r_config_paisExpedicion?.message}
                      />
                    </Form.Group>
                  )}
                />
                <Controller
                  name="r_config_departamentoExpedicion"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Ingrese su departamento de expedición" }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs={12} md={4}>
                      <Form.Label>
                        Departamento o Estado <span className="required" />
                      </Form.Label>
                      <State
                        field={field}
                        child="r_config_ciudadExpedicion"
                        setValue={setValue}
                        readOnly={readOnly}
                      />
                      <Errors
                        message={
                          errors.r_config_departamentoExpedicion?.message
                        }
                      />
                    </Form.Group>
                  )}
                />
                <Controller
                  name="r_config_ciudadExpedicion"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Seleccione la ciudad de expedición" }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs={12} md={4}>
                      <Form.Label>
                        Ciudad <span className="required" />
                      </Form.Label>
                      <City
                        field={field}
                        setValue={setValue}
                        readOnly={readOnly}
                      />
                      <Errors
                        message={errors.r_config_ciudadExpedicion?.message}
                      />
                    </Form.Group>
                  )}
                />
              </Row>
              <Row className="mb-3">
                <Controller
                  name="dt_fechaAsesoria"
                  control={control}
                  rules={{
                    required: "Ingrese información",
                  }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs="12">
                      <Form.Label>
                        Resumen de los hechos <span className="required" />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        disabled={cargando || readOnly}
                        readonly={readOnly}
                        {...field}
                        rows="6"
                      />
                      <Errors message={errors?.dt_fechaAsesoria?.message} />
                    </Form.Group>
                  )}
                />
              </Row>
              <Row className="mb-3">
                <Controller
                  name="dt_fechaAsesoria"
                  control={control}
                  rules={{
                    required: "Ingrese información",
                  }}
                  render={({ field }) => (
                    <Form.Group as={Col} xs="12">
                      <Form.Label>
                        Pretenciones <span className="required" />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        disabled={cargando || readOnly}
                        readonly={readOnly}
                        {...field}
                        rows="6"
                      />
                      <Errors message={errors?.dt_fechaAsesoria?.message} />
                    </Form.Group>
                  )}
                />
              </Row>

              <Row className="mb-3"></Row>
            </Card.Body>
          </Card>
          <Anexos
            control={control}
            setValue={setValue}
            watch={watch}
            getValues={getValues}
          />
          <Button type="primary">Registrar</Button>
        </Form>
      </Page>
    </Policy>
  );
};

export default CentroDeConciliacionSolicitar;
