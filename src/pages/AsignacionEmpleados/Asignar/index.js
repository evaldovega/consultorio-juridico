import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "utils/Axios";
import { useParams, useHistory } from "react-router-dom";
import { Controller } from "react-hook-form";
import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Accordion,
  Row,
  Col,
} from "react-bootstrap";
import PerfilMaster from "pages/Perfil/Master";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Context from "./Ctx";
import Errors from "components/Errors";

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN } = require("constants/apiContants");

const AsignarEmpleado = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");
  const [personas, setPersonas] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const formAsesoria = useRef();

  const loadSelectData = async () => {
    API.get("usuarios/personas/?personal_admin=true").then((response) => {
      setPersonas(response.data);
    });
    API.get("configuracion/jornadas").then((response) => {
      setJornadas(response.data);
    });
    API.get("configuracion/grupo").then((response) => {
      setGrupos(response.data);
    });
    API.get("configuracion/consultorio").then((response) => {
      setConsultorios(response.data);
    });
  };

  const guardarAsesoria = async (data) => {
    setLoading(true);
    const _data = {
      ...data,
    };
    const url =
      id && id.length
        ? "asignacion/empleados/" + id + "/"
        : "asignacion/empleados/";
    const method = id && id.length ? "patch" : "post";
    API({
      url,
      method,
      data: _data,
    })
      .then(({ data }) => {
        setLoading(false);
        toast.success("Empleado registrado correctamente.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push("/asignacion-docentes/listado");
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };
  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };
  const onError = (e) => {
    toast.info("Ingresa la información faltante por favor!", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const loadDetail = async () => {
    try {
      setLoading(true);
      const { data } = await API(`asignacion/empleados/${id}/`);
      Object.keys(data).forEach((k) => setValue(k, data[k]));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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

  useEffect(() => {
    loadSelectData();
    if (id) {
      loadDetail();
    }
  }, [id]);

  return (
    <Policy policy={[ROL_ADMIN]}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/asignacion-docentes">Asignación de docentes</Link>
          </Breadcrumb.Item>
          {id && id.length ? (
            <Breadcrumb.Item>
              <Link to="/asignacion-docentes/listado">Listado</Link>
            </Breadcrumb.Item>
          ) : null}
          <Breadcrumb.Item active>Asignar</Breadcrumb.Item>
        </Breadcrumb>
        <Context.Provider
          value={{ control, watch, errors, setValue, getValues, loading }}
        >
          <br />
          <br />
          <Form
            noValidate
            onSubmit={handleSubmit(guardarAsesoria, onError)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Card>
              <Card.Body style={{ padding: "2.5rem" }}>
                <h2 className="title-line">
                  <span>Datos de docente</span>
                </h2>

                <Row className="mb-3">
                  <Controller
                    name="r_usuarios_persona"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Docente a asignar</Form.Label>
                        <Form.Control as="select" {...field}>
                          <option value="">Seleccione...</option>
                          {personas.map((el) => (
                            <option value={el.id}>
                              {`${el.a_primerNombre} ${el.a_segundoNombre} ${el.a_primerApellido} ${el.a_segundoApellido}`}
                            </option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="a_anioValidez"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Año de validez</Form.Label>
                        <Form.Control type="number" {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="a_semestreValidez"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Semestre</Form.Label>
                        <Form.Control as="select" {...field}>
                          <option value="">Seleccione...</option>
                          <option value="1">Primer semestre</option>
                          <option value="2">Segundo semestre</option>
                          <option value="V">Vacacional</option>
                        </Form.Control>
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_jornadaValidez"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Jornada de validez</Form.Label>
                        <Form.Control as="select" {...field}>
                          <option value="">Seleccione...</option>
                          {jornadas.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_numeroConsultorio"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Número de consultorio</Form.Label>
                        <Form.Control as="select" {...field}>
                          <option value="">Seleccione...</option>
                          {consultorios.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_grupo"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Grupo</Form.Label>
                        <Form.Control as="select" {...field}>
                          <option value="">Seleccione...</option>
                          {grupos.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                </Row>
              </Card.Body>
            </Card>
            <br />
            <br />
            <Button
              hidden={true}
              type="submit"
              ref={formAsesoria}
              disabled={loading}
            >
              Registrar
            </Button>
            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" size="lg">
                {id && id.length
                  ? "Modificar asignación"
                  : "Registrar nueva asignación"}
              </Button>
            </div>
          </Form>
        </Context.Provider>
      </Page>
    </Policy>
  );
};

export default AsignarEmpleado;
