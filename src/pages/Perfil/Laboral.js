import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Errors from "components/Errors";
import Context from "./Ctx";
import API from "utils/Axios";
import { ROL_ESTUDIANTE } from "constants/apiContants";

const PerfilLaboral = () => {
  const { readOnly, control, errors, setValue, watch, policies, persona } =
    useContext(Context);

  const trabaja = watch("b_trabaja", false);

  const [profesiones, setProfesiones] = useState([]);

  const getProfesiones = async () => {
    API("configuracion/profesion/").then((response) => {
      setProfesiones(response.data || []);
    });
  };

  useEffect(() => {
    getProfesiones();
  }, []);

  const DatosLaborales = () => (
    <>
      <Row className="mb-3">
        <Controller
          name="b_servidorPublico"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Servidor público</Form.Label>
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
        <Controller
          name="a_rangoSalarial"
          control={control}
          rules={{
            required: "Ingrese rango salarial",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Rango salarial <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_rangoSalarial?.message} />
            </Form.Group>
          )}
        />
      </Row>
    </>
  );

  if (readOnly) {
    const _profesion = profesiones.find(
      (p) => p.id == persona?.r_config_profesion
    );
    return (
      <div className="mb-4">
        <h3 className="title-line">
          <span>Datos laborales</span>
        </h3>
        <table width={"100%"}>
          <tr>
            <th>Profesión u oficio</th>
            <th colSpan={3}>Trabaja</th>
          </tr>
          <tr>
            <td>{_profesion?.a_titulo || "No especificada"}</td>
            <td colSpan={3}>{persona && persona?.b_trabaja ? "Si" : "No"}</td>
          </tr>
        </table>

        {persona?.b_trabaja ? (
          <table width={"100%"} className="mt-2">
            <tr>
              <th>Servidor público</th>
              <th>Empresa</th>
              <th>Cargo</th>
              <th>Rango salarial</th>
            </tr>
            <tr>
              <td>{persona?.b_servidorPublico ? "Si" : "No"}</td>
              <td>{persona?.a_nombreEmpresa || "No especificado"}</td>
              <td>{persona?.a_cargoEmpresa || "No especificado"}</td>
              <td>{persona?.a_rangoSalarial || "No especificado"}</td>
            </tr>
            <tr>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th colSpan={2}></th>
            </tr>
            <tr>
              <td>
                {persona?.a_barrioEmpresa} {persona?.a_direccionEmpresa}
              </td>
              <td>{persona?.a_telefonoEmpresa}</td>
              <td colSpan={2}></td>
            </tr>
          </table>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mb-4">
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
                as="select"
                {...field}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione...</option>
                {profesiones.map((el) => (
                  <option value={el.id}>{el.a_titulo}</option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
        />
        <Controller
          name="b_trabaja"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col}>
              <Form.Label>Trabaja</Form.Label>
              <Form.Check
                {...field}
                xs="12"
                md="6"
                checked={field.value}
                disabled={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
      </Row>
      {trabaja == true ? DatosLaborales() : null}
    </div>
  );
};

export default PerfilLaboral;
