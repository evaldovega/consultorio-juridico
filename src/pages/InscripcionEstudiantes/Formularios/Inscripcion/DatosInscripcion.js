import Errors from "components/Errors";
import LugarPractica from "components/LugarPracticas";
import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import API from "utils/Axios";
import Context from "./Ctx";

const DatosInscripcion = ({ watch }) => {
  const [jornadas, setJornadas] = useState([]);
  const [lugarPracticas, setLugarPracticas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { readOnly, control, errors, setValue } = useContext(Context);

  const load = () => {
    setLoading(true);
    setError(null);
    API("configuracion/jornadas/")
      .then(({ data }) => {
        setJornadas(data);
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.toString());
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    API("configuracion/consultorio/")
      .then(({ data }) => {
        setConsultorios(data);
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.toString());
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });

    API("configuracion/grupo/")
      .then(({ data }) => {
        setGrupos(data);
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
      <Card>
        <Card.Body>
          <h2>Datos de Inscripcion</h2>
          <Row className="mb-3">
            <Controller
              name="a_codigoEstudiantil"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Código estudiantil <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />

                  <Errors message={errors?.a_codigoEstudiantil?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="a_anioInscripcion"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Año
                    <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    type="number"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />

                  <Errors message={errors?.a_anioInscripcion?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="a_semestreInscripcion"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Semestre <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="select"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  >
                    <option value="">Seleccione</option>
                    <option value="1">Primer semestre</option>
                    <option value="2">Segundo semestre</option>
                    <option value="V">Vacacional</option>
                  </Form.Control>


                  <Errors message={errors?.a_semestreInscripcion?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="r_config_jornadaInscripcion"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Jornada <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="select"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  >
                    <option value="">Seleccione</option>
                    {jornadas.map((el, i) => (
                      <option value={el.id} key={i}>
                        {el.a_titulo}
                      </option>
                    ))}
                  </Form.Control>

                  <Errors
                    message={errors?.r_config_jornadaInscripcion?.message}
                  />
                </Form.Group>
              )}
            />
          </Row>

          <Row className="mb-3">
            <Controller
              name="r_config_numeroConsultorio"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Consultorio <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="select"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  >
                    <option value="">Seleccione</option>
                    {consultorios.map((el, i) => (
                      <option value={el.id} key={i}>
                        {el.a_titulo}
                      </option>
                    ))}
                  </Form.Control>

                  <Errors message={errors?.a_numeroConsultorio?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="r_config_grupo"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Grupo <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="select"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  >
                    <option value="">Seleccione</option>
                    {grupos.map((el, i) => (
                      <option value={el.id} key={i}>
                        {el.a_titulo}
                      </option>
                    ))}
                  </Form.Control>

                  <Errors message={errors?.r_config_grupo?.message} />
                </Form.Group>
              )}
            />

            <Controller
              name="r_config_lugarPracticas"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Lugar de las practicas <span className="required" />
                  </Form.Label>
                  <LugarPractica
                    watch={watch}
                    field={field}
                    name="r_config_lugarPracticas"
                  />
                  <Errors message={errors?.r_config_lugarPracticas?.message} />
                </Form.Group>
              )}
            />

            <Controller
              name="dt_fechaInscripcion"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Fecha de inscripción <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    type="date"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />

                  <Errors message={errors?.dt_fechaInscripcion?.message} />
                </Form.Group>
              )}
            />

            <Controller
              name="c_rolEstudiante"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group as={Col} xs="12" md="6" lg="6">
                  <Form.Label>
                    Rol del estudiante <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="select"
                    plaintext={readOnly}
                    readOnly={readOnly}
                  >
                    <option value="">Seleccione</option>
                    <option value="ASESOR">Asesor</option>
                    <option value="CONCILIADOR">Conciliador</option>
                    <option value="AUTOGESTION">Autogestión</option>
                  </Form.Control>

                  <Errors message={errors?.r_config_grupo?.message} />
                </Form.Group>
              )}
            />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
  {
    /* <div className="grid-2">
        


            <Form.Item label="Turno" name='a_turno' rules={rules}>
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

            <Form.Item label="Lugar" name='r_config_lugarPracticas' rules={rules}>
              <Select>
                {lugarPracticas.map((el, i) => (
                  <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>

            <Form.Item label="Fecha inscripción" name='dt_fechaInscripcion' rules={rules}>
              <DatePicker />
            </Form.Item>
          </div>

        </div>*/
  }
};

export default DatosInscripcion;
