import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Errors from "components/Errors";
import Context from "./Ctx";

const PerfilLaboral = () => {
  const { readOnly, control, errors, setValue, watch } = useContext(Context);

  const trabaja = watch("b_trabaja", false);

  const DatosLaborales = () => (
    <>
      <Row className="mb-3">
        <Controller
          name="b_servidorPublico"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Servior público</Form.Label>
              <Form.Check
                {...field}
                label="Seleccione si lo es"
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="a_nombreEmpresa"
          control={control}
          rules={{
            required: "Ingrese nombre de la empresa",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Nombre empresa <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_nombreEmpresa?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_cargoEmpresa"
          control={control}
          defaultValue=""
          rules={{
            required: "Ingrese cargo",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Cargo <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_cargoEmpresa?.message} />
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-3">
        <Controller
          name="a_barrioEmpresa"
          control={control}
          rules={{
            required: "Ingrese barrio",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Barrio empresa <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_barrioEmpresa?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_direccionEmpresa"
          control={control}
          defaultValue=""
          rules={{
            required: "Ingrese dirección",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Dirección empresa <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_direccionEmpresa?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_telefonoEmpresa"
          control={control}
          rules={{
            required: "Ingrese un teléfono",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Teléfono empresa <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_telefonoEmpresa?.message} />
            </Form.Group>
          )}
        />
      </Row>
    </>
  );
  return (
    <div>
      <h3 className="title-line">
        <span>Datos laborales</span>
      </h3>
      <Row className="mb-3">
        <Controller
          name="r_config_profesion"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>Profesión u oficio</Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="b_trabaja"
          control={control}
          defaultValue="No"
          render={({ field }) => (
            <Form.Group as={Col}>
              <Form.Label>Trabaja</Form.Label>
              <Form.Control
                as="select"
                {...field}
                xs="12"
                md="6"
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
          )}
        />
      </Row>
      {trabaja == "true" ? DatosLaborales() : null}
    </div>
  );
};

export default PerfilLaboral;
