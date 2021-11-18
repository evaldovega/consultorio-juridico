import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
import Errors from "components/Errors";
import Context from "./Ctx";

const PerfilUbicacion = () => {
  const { readOnly, control, errors, setValue } = useContext(Context);
  return (
    <div>
      <h3 className="title-line">
        <span>Datos de ubicación</span>
      </h3>
      <Row className="mb-1">
        <Controller
          name="r_config_paisNacimiento"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese su pais de nacimiento" }}
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
              />
              <Errors message={errors.r_config_paisNacimiento?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_departamento"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese su pais de nacimiento" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Departamento o Estado <span className="required" />
              </Form.Label>
              <State
                field={field}
                child="r_config_ciudadNacimiento"
                setValue={setValue}
                readOnly={readOnly}
              />
              <Errors message={errors.r_config_departamento?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_ciudadNacimiento"
          control={control}
          defaultValue=""
          rules={{ required: "Seleccione la ciudad de nacimiento" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Ciudad <span className="required" />
              </Form.Label>
              <City field={field} setValue={setValue} readOnly={readOnly} />
              <Errors message={errors.r_config_ciudadNacimiento?.message} />
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-1">
        <Controller
          name="a_barrio"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese un barrio" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Barrio <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
              <Errors message={errors.a_barrio?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_direccion"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese una dirección" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Dirección <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
              <Errors message={errors.a_direccion?.message} />
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-1">
        <Controller
          name="a_telefonoFijo"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="a_celular"
          control={control}
          defaultValue=""
          rules={{
            required: "Ingrese un número de celular",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Celular <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
              <Errors message={errors?.a_celular?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_correoElectronico"
          control={control}
          defaultValue=""
          rules={{
            required: "Ingrese un correo eletrónico",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Correo eletrónico <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
              <Errors message={errors?.a_correoElectronico?.message} />
            </Form.Group>
          )}
        />
      </Row>
    </div>
  );
};

export default PerfilUbicacion;
