import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
import Errors from "components/Errors";
import Context from "./Ctx";
import { ROL_ESTUDIANTE } from "constants/apiContants";

const PerfilUbicacion = () => {
  const { readOnly, control, errors, setValue, policies, persona } =
    useContext(Context);

  if (readOnly) {
    return (
      <div className="mb-4">
        <h2 className="mb-4">Datos de ubicación</h2>
        <table width={"100%"}>
          <tr>
            <th>Pais de nacimiento</th>
            <th>Departamento de nacimiento</th>
            <th>Ciudad de nacimiento</th>
            <th>Barrio</th>
          </tr>
          <tr>
            <td>
              <Country
                field={{ value: persona?.r_config_paisNacimiento }}
                child="str_config_departamento"
                plaintext={true}
              />
            </td>
            <td>
              <State
                field={{
                  name: "str_config_departamento",
                  value: persona?.r_config_departamento,
                }}
                child="str_config_ciudadNacimiento"
                plaintext={true}
              />
            </td>
            <td>
              <City
                field={{
                  value: persona?.r_config_ciudadNacimiento,
                  name: "str_config_ciudadNacimiento",
                }}
                plaintext={true}
              />
            </td>
            <td>{persona?.a_barrio}</td>
          </tr>
          <tr>
            <th>Dirección</th>
            <th>Teléfono fijo</th>
            <th>Celular</th>
            <th>Correo electrónico</th>
          </tr>
          <tr>
            <td>{persona?.a_direccion}</td>
            <td>{persona?.a_telefonoFijo}</td>
            <td>{persona?.a_celular}</td>
            <td>{persona?.a_correoElectronico}</td>
          </tr>
        </table>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <h2 className="mb-4">Datos de ubicación</h2>
      <Row className="mb-1">
        <Controller
          name="r_config_paisNacimiento"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese su pais de nacimiento" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
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
            <Form.Group as={Col} xs={12} md={6}>
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
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>
                Ciudad <span className="required" />
              </Form.Label>
              <City field={field} setValue={setValue} readOnly={readOnly} />
              <Errors message={errors.r_config_ciudadNacimiento?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_barrio"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese un barrio" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
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
            <Form.Group as={Col} xs={12} md={6}>
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
        <Controller
          name="a_telefonoFijo"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
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
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
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
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
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
