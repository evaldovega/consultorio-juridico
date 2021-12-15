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
import Partes from "./Partes";
import Spin from "components/Spin";
import API from "utils/Axios";
import moment from "moment";
import TiempoConflicto from "./TiempoConflicto";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Context as ContextPolicy } from "components/Policy/Ctx";
import { useContext } from "react";

const CentroDeConciliacionSolicitar = () => {
  const history = useHistory();
  const { id: idConciliacion } = useParams();

  const [cargando, setCargando] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const { persona } = useContext(ContextPolicy);

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

  const guardar = async (data) => {
    try {
      const solicitantes = getValues("r_solicitante");
      if (!solicitantes.length) {
        toast.error("Debes añadir minimo un solicitante", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const citados = getValues("r_citados");
      if (!citados.length) {
        toast.error("Debes añadir minimo un citado", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      setCargando(true);
      const url = idConciliacion
        ? `/conciliacion/solicitud/${idConciliacion}/`
        : `/conciliacion/solicitud/`;
      const method = idConciliacion ? "PATCH" : "POST";
      const { data: response } = await API({
        method,
        url,
        data: {
          ...data,
          d_fechaSolicitud: moment().format("YYYY-MM-DD"),
          // r_asesoria_casoJuridico: 10,
          t_pruebasAnexos: data.t_pruebasAnexos.map((a) => ({
            ...a,
            r_usuarios_persona: persona,
          })),
        },
      });
      setCargando(false);
      history.push(`/centro-de-conciliacion/solicitudes`);
    } catch (error) {
      setCargando(false);
      toast.error("😥 " + error.toString(), {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const cargarDetalle = async () => {
    try {
      setCargando(true);
      const { data } = await API(`/conciliacion/solicitud/${idConciliacion}/`);
      console.log(data);
      if (data) {
        Object.keys(data).forEach((k) => setValue(k, data[k]));
      }
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (idConciliacion) {
      setTimeout(() => cargarDetalle(), 400);
    }
  }, [idConciliacion]);

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_ESTUDIANTE, ROL_ASESOR]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <Page>
        <Spin cargando={cargando}>
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
            <Partes
              name="r_solicitante"
              title="Solicitantes"
              control={control}
              setValue={setValue}
              watch={watch}
              getValues={getValues}
              id="r_usuarios_solicitante"
              apiDelete="conciliacion/solicitante/"
              idConciliacion={idConciliacion}
            />
            <Partes
              name="r_citados"
              id="r_usuarios_citado"
              title="Citados"
              control={control}
              setValue={setValue}
              watch={watch}
              getValues={getValues}
              idConciliacion={idConciliacion}
              apiDelete="conciliacion/citado/"
            />
            <Card className="mt-1 mb-1">
              <Card.Body style={{ padding: "2.5rem" }}>
                <h2 className="title-line">
                  <span>Versión del solicitante</span>
                </h2>
                <Row className="mb-3">
                  <TiempoConflicto
                    control={control}
                    errors={errors}
                    readOnly={readOnly}
                  />
                  <Controller
                    name="a_cuantiaValor"
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
                    name="r_config_pais"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Ingrese el pais donde ocurrieron los hechos",
                    }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs={12} md={4}>
                        <Form.Label>
                          Pais <span className="required" />
                        </Form.Label>
                        <Country
                          field={field}
                          child="r_config_departamento"
                          setValue={setValue}
                          readOnly={readOnly}
                          plaintext={readOnly}
                        />
                        <Errors message={errors.r_config_pais?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_departamento"
                    control={control}
                    defaultValue=""
                    rules={{
                      required:
                        "Ingrese el departamento donde ocurrieron los hechos",
                    }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs={12} md={4}>
                        <Form.Label>
                          Departamento o Estado <span className="required" />
                        </Form.Label>
                        <State
                          field={field}
                          child="r_config_municipio"
                          setValue={setValue}
                          readOnly={readOnly}
                        />
                        <Errors
                          message={errors.r_config_departamento?.message}
                        />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_municipio"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Ingrese la ciudad donde ocurrieron los hechos",
                    }}
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
                        <Errors message={errors.r_config_municipio?.message} />
                      </Form.Group>
                    )}
                  />
                </Row>
                <Row className="mb-3">
                  <Controller
                    name="t_resumenHechos"
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
                    name="t_pretencionesIniciales"
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
              idConciliacion={idConciliacion}
              persona={persona}
            />
            <Button type="primary">Registrar</Button>
          </Form>
        </Spin>
      </Page>
    </Policy>
  );
};

export default CentroDeConciliacionSolicitar;
