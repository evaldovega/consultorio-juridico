import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Context from "./Ctx";
import Errors from "components/Errors";
import API from "utils/Axios";
import { ROL_ESTUDIANTE } from "constants/apiContants";
import moment from "moment";

const PerfilDemografico = () => {
  const { readOnly, control, errors, setValue, policies, persona, citado } =
    useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orientaciones, setOrientaciones] = useState([]);
  const [etnias, setEtnias] = useState([]);
  const [estadosCiviles, setEstadosCiviles] = useState([]);
  const [escolaridades, setEscolaridades] = useState([])

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      API("configuracion/orientacion/"),
      API("configuracion/etnia/"),
      API("configuracion/estado-civil/"),
      API("configuracion/escolaridad/")
    ])
      .then(
        ([
          { data: r_orientaciones },
          { data: r_etnias },
          { data: r_estadoCivil },
          { data: r_escolaridades },
        ]) => {
          setOrientaciones(r_orientaciones);
          setEtnias(r_etnias);
          setEstadosCiviles(r_estadoCivil);
          setEscolaridades(r_escolaridades);
          setLoading(false);
        }
      )
      .catch((error) => {
        setLoading(false);
        setError(error.response ? error.response.statusText : error.toString());
      });
  };

  useEffect(() => {
    load();
  }, [readOnly]);

  if (readOnly) {
    const orientacion = orientaciones.find(
      (o) => o.id == persona?.r_config_orientacion
    );
    const etnia = etnias.find((o) => o.id == persona?.r_config_etnia);
    const estadoCivil = estadosCiviles.find(
      (o) => o.id == persona?.r_config_estadoCivil
    );
    const escolaridad = escolaridades.find(
      (o) => o.id == persona?.r_config_escolaridad
    );

    return (
      <div className="mb-4">
        <h2 className="mb-4">Datos Demográficos</h2>
        <table width={"100%"}>
          <tr>
            <th>Fecha de nacimiento</th>
            <th>Lugar de nacimiento</th>
            <th>Genero</th>
            <th>Orientación sexual</th>
          </tr>
          <tr>
            <td>{moment(persona?.a_fechaNacimiento).format("YYYY-MM-DD")}</td>
            <td>{persona?.a_lugarNacimiento || "No especificado"}</td>
            <td>{persona?.c_genero || "No especificado"}</td>
            <td>{orientacion?.a_titulo || "No especificada"}</td>
          </tr>
          <tr>
            <th>Etnia</th>
            <th>Número de hijos</th>
            <th>Estado civil</th>
            <th>Nivel de escolaridad</th>
          </tr>
          <tr>
            <td>{etnia?.a_titulo || "No especificada"}</td>
            <td>{persona?.a_numeroHijos || "No especificado"}</td>
            <td>{estadoCivil?.a_titulo || "No especificado"}</td>
            <td>{escolaridad?.a_titulo || "No especificada"}</td>
          </tr>
          <tr>
            <th>Estrato</th>
          </tr>
          <tr>
            <td>{persona?.c_estrato || "No especificado"}</td>
          </tr>
        </table>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="mb-4">Datos Demográficos</h2>
      <Row className="mb-1">
        <Controller
          name="a_fechaNacimiento"
          control={control}
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Fecha de nacimiento {!citado && (<span className="required" />)}
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
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="12" lg="6">
              <Form.Label>Lugar de nacimiento {!citado && (<span className="required" />)}</Form.Label>
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
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Genero {!citado && (<span className="required" />)}
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
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Orientación sexual {!citado && (<span className="required" />)}
              </Form.Label>
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
              <Errors message={errors?.r_config_orientacion?.message} />
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-1">
        <Controller
          name="r_config_etnia"
          control={control}
          rules={!citado && {required: "Ingrese información"}}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Etnia {!citado && (<span className="required" />)}
              </Form.Label>
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
              <Errors message={errors?.r_config_etnia?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_estadoCivil"
          control={control}
          rules={!citado && {required: "Ingrese información"}}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Estado civil {!citado && (<span className="required" />)}
              </Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                {estadosCiviles.map((ec) => (
                  <option key={ec.id} value={ec.id}>
                    {ec.a_titulo}
                  </option>
                ))}
              </Form.Control>
              <Errors message={errors?.r_config_estadoCivil?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_numeroHijos"
          control={control}
          rules={!citado && {required: "Ingrese información"}}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Número de hijos {!citado && (<span className="required" />)}
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors?.a_numeroHijos?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_escolaridad"
          control={control}
          rules={!citado && {required: "Ingrese información"}}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Escolaridad {!citado && (<span className="required" />)}
              </Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                {escolaridades.map((ec) => (
                  <option key={ec.id} value={ec.id}>
                    {ec.a_titulo}
                  </option>
                ))}
              </Form.Control>
              <Errors message={errors?.r_config_escolaridad?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="c_estrato"
          control={control}
          rules={!citado && {required: "Ingrese información"}}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="6">
              <Form.Label>
                Estrato {!citado && (<span className="required" />)}
              </Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                disabled={readOnly}
                plaintext={readOnly}
              >
                <option value="">Seleccione</option>
                <option value="1">Estrato uno</option>
                <option value="2">Estrato dos</option>
                <option value="3">Estrato tres</option>
                <option value="4">Estrato cuatro</option>
                <option value="5">Estrato cinco</option>
                <option value="6">Estrato seis</option>
              </Form.Control>
              <Errors message={errors?.r_config_escolaridad?.message} />
            </Form.Group>
          )}
        />
      </Row>
    </div>
  );
};

export default PerfilDemografico;
