import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Context from "./Ctx";
import Errors from "components/Errors";
import API from "utils/Axios";

const PerfilDemografico = () => {
  const { readOnly, control, errors, setValue } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orientaciones, setOrientaciones] = useState([]);
  const [etnias, setEtnias] = useState([]);

  const load = () => {
    setLoading(true);
    setError(null);
    API("configuracion/orientacion/")
      .then(({ data }) => {
        setOrientaciones(data);
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.toString());
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    API("configuracion/etnia/")
      .then(({ data }) => {
        setEtnias(data);
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

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h3 className="title-line">
        <span>Datos Demográficos</span>
      </h3>
      <Row className="mb-1">
        <Controller
          name="a_fechaNacimiento"
          control={control}
          rules={{
            required: "Ingrese fecha de nacimiento",
          }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Fecha de nacimiento <span className="required" />
              </Form.Label>
              <Form.Control
                type="date"
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
              <Errors message={errors?.a_fechaNacimiento?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_lugarNacimiento"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Lugar de nacimiento</Form.Label>
              <Form.Control
                {...field}
                plaintext={readOnly}
                readOnly={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="c_genero"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Genero <span className="required" />
              </Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
                <option value="Otro">Otro</option>
              </Form.Control>
              <Errors message={errors.c_genero?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_orientacion"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Orientación sexual</Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                {orientaciones.map((el, i) => (
                  <option value={el.id} key={i}>
                    {el.a_titulo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-1">
        <Controller
          name="r_config_etnia"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Etnia</Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                {etnias.map((el, i) => (
                  <option value={el.id} key={i}>
                    {el.a_titulo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
        />
        <Controller
          name="c_estadoCivil"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Estado civil</Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                <option value="F">Soltero</option>
                <option value="M">Casado</option>
              </Form.Control>
            </Form.Group>
          )}
        />
        <Controller
          name="c_numeroHijos"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>Número de hijos</Form.Label>
              <Form.Control
                type="number"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
      </Row>
    </>
  );
};

export default PerfilDemografico;
