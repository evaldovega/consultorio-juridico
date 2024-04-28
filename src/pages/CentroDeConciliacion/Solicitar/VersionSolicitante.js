import Spin from "components/Spin";
import { useEffect } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import API from "utils/Axios";
import Errors from "components/Errors";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
import TiempoConflicto from "./TiempoConflicto";
const { Card, Row, Col, Form } = require("react-bootstrap");

const VersionSolicitante = ({
  control,
  readOnly,
  errors,
  cargando,
  setValue,
  watch,
}) => {
  const [intenciones, setIntenciones] = useState([]);
  const a_indeterminada = watch("a_indeterminada");
  const a_cuantiavalor = watch("a_cuantiaValor");

  const cargarIntenciones = () => {
    API("configuracion/intenciones-conciliacion").then(({ data }) =>
      setIntenciones(data)
    );
  };

  useEffect(() => {
    cargarIntenciones();
  }, []);

  useEffect(() => {
    if (a_indeterminada && a_indeterminada.length) {
      setValue("a_cuantiaValor", "");
    }
  }, [a_indeterminada]);

  useEffect(() => {
    if (a_cuantiavalor && a_cuantiavalor.length) {
      setValue("a_indeterminada", "");
    }
  }, [a_cuantiavalor]);

  return (
    <Card className="mb-4">
      <Card.Body style={{ padding: "2.5rem" }}>
        <h2>Versión del solicitante</h2>

        <Row className="mt-4 mb-3">
          <TiempoConflicto
            control={control}
            errors={errors}
            readOnly={readOnly}
          />
          <Controller
            name="a_cuantiaValor"
            rules={{
              required: "Ingrese una cuantía",
            }}
            control={control}
            render={({ field }) => (
              <Form.Group as={Col} xs="12" md="4">
                <Form.Label>Cuantia <span className="required" /></Form.Label>
                <Form.Control
                  {...field}
                  disabled={cargando || readOnly}
                  readonly={readOnly}
                />
                <Errors message={errors.a_cuantiaValor?.message} />
              </Form.Group>
            )}
          />
          <Controller
            name="a_indeterminada"
            control={control}
            render={({ field }) => (
              <Form.Group as={Col} xs="12" md="4">
                <Form.Label>Cuantia indeterminada</Form.Label>
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
                  País <span className="required" />
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
              required: "Ingrese el departamento donde ocurrieron los hechos",
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
                <Errors message={errors.r_config_departamento?.message} />
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
                <City field={field} setValue={setValue} readOnly={readOnly} />
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
                  Pretensiones iniciales <span className="required" />
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
            name="r_config_intencionSolicitante"
            control={control}
            defaultValue=""
            rules={{
              required: "Intenciones",
            }}
            render={({ field }) => (
              <Form.Group as={Col} xs={12} md={4}>
                <Form.Label>
                  Intenciones <span className="required" />
                </Form.Label>
                <Form.Control as="select" {...field}>
                  <option value="">Seleccione</option>
                  {intenciones.map((i) => (
                    <option value={i.id} key={i.id}>
                      {i.a_titulo}
                    </option>
                  ))}
                </Form.Control>
                <Errors message={errors.c_intencionSolicitante?.message} />
              </Form.Group>
            )}
          />
        </Row>

        <Row className="mb-3"></Row>
      </Card.Body>
    </Card>
  );
};

export default VersionSolicitante;
