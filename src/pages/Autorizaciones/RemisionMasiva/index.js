import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import API from "utils/Axios";
import { useParams, useHistory } from "react-router-dom";
import { Controller } from "react-hook-form";
import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import PerfilMaster from "pages/Perfil/Master";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Errors from "components/Errors";
import Spin from "components/Spin";
import Estudiantes from "./Estudiantes";
import { FaColumns, FaTimes } from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";
import Autoridad from "components/Autoridad";
const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN } = require("constants/apiContants");

const RemisionMasiva = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");
  const [personas, setPersonas] = useState([]);
  const [modo, setModo] = useState(0);

  const [jornadas, setJornadas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [autoridades, setAutoridades] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [inscripciones, setInscripciones] = useState([])
  const [cedula, setCedula] = useState("")
  const [idsInscripciones, setIdsInscripciones] = useState([])

  const formPersona = useRef();
  const formAsesoria = useRef();

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

  const loadSelectData = async () => {
    API.get("usuarios/personas/").then((response) => {
      setPersonas(response.data);
    });
    API.get("configuracion/jornadas/").then((response) => {
      setJornadas(response.data);
    });
    API.get("configuracion/grupo/").then((response) => {
      setGrupos(response.data);
    });
    API.get("configuracion/consultorio/").then((response) => {
      setConsultorios(response.data);
    });

    API.get("usuarios/empleados/empleadoscargos/?director=true").then(
      (response) => {
        setDirectores(response.data);
      }
    );
    API.get("usuarios/empleados/empleadoscargos/").then((response) => {
      setEmpleados(response.data);
    });
    API.get("configuracion/entidad/").then((response) => {
      setAutoridades(response.data);
    });
  };

  const getInscripciones = async () => {
    await API.post("/academusoft/estudiantes/inscripcion/", { estudiante: cedula }).then(
      (response) => {
        setInscripciones(array => [...array, response.data]);
        setIdsInscripciones(array => [...array, response.data.id])
      }
    );

    // await API.get(`/estudiantes/inscripcion/?cedula=${cedula}`).then(
    //   (response) => {
    //     setInscripciones(array => [...array, response.data.results[0]]);
    //     setIdsInscripciones(array => [...array, response.data.results[0].id])
    //   }
    // );
  };

  const eliminarEstudiante = (index) => {
    inscripciones.splice(index, 1)
  }

  const guardarRemisiones = async (data) => {
    setLoading(true);
    const _data = {
      a_numeroRemision: data.a_numeroRemision,
      dt_fechaRemision: data.dt_fechaRemision,
      a_titulo: data.a_titulo,
      a_dirigido: data.a_dirigido,
      r_usuarios_director: data.r_usuarios_director,
      r_usuarios_elaboradoPor: data.r_usuarios_elaboradoPor,
      r_config_autoridad: data.r_config_autoridad,
      mm_usuarios_estudianteList: idsInscripciones,
    };
    API({
      url: "autorizaciones/remision/" + (id ? `${id}/` : ""),
      method: id ? "PATCH" : "POST",
      data: _data,
    })
      .then(({ data }) => { })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
    setLoading(false);
    toast.success("Se han generado las remisiones.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    history.push("/autorizaciones");
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
  const loadDetail = () => {
    setLoadingDetail(true);
    API.get("autorizaciones/remision/" + id + "/")
      .then(({ data }) => {
        setValue("a_numeroRemision", data.a_numeroRemision);
        setValue("r_usuarios_estudiante", data.r_usuarios_estudiante.id);
        setValue("r_usuarios_director", data.r_usuarios_director.id);
        setValue("r_usuarios_elaboradoPor", data.r_usuarios_elaboradoPor.id);
        setValue("dt_fechaRemision", data.dt_fechaProceso);
        setValue("a_titulo", data.a_titulo);
        setValue("a_dirigido", data.a_dirigido);
        setValue("r_config_autoridad", data.r_config_autoridad);
      })
      .finally(() => setLoadingDetail(false));
  };

  useEffect(() => {
    setModo(localStorage.getItem("mr") || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("mr", modo);
  }, [modo]);

  useEffect(() => {
    loadSelectData();
    if (id) {
      loadDetail();
    }
  }, [id]);

  return (
    <Policy policy={[ROL_ADMIN]}>
      <Spin cargando={loading}>
        <Page>
          <div className="d-flex justify-content-between align-items-center">
            <MigaPan>
              <MigaPanInicio />
              <MigaPanDocumentos />
              <span>Generar remisión masiva</span>
            </MigaPan>
            <Button
              variant={modo == 1 ? "primary" : "secondary"}
              onClick={() => setModo(modo == 1 ? 0 : 1)}
              size="md"
            >
              <FaColumns></FaColumns>
            </Button>
          </div>
          <Form
            noValidate
            onSubmit={handleSubmit(guardarRemisiones, onError)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Row style={{ marginBottom: "10px" }}>
              <Col xs="12" md={modo == 1 ? 6 : 12}>
                <Card>
                  <Card.Header>
                    <h2>Datos de la remisión</h2>
                  </Card.Header>
                  <Card.Body style={{ padding: "2.5rem" }}>
                    <Row className="mb-3">
                      <Controller
                        name="a_numeroRemision"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Form.Label>Número de la remisión</Form.Label>
                            <Form.Control {...field} />
                            <Errors
                              message={errors?.a_numeroRemision?.message}
                            />
                          </Form.Group>
                        )}
                      />
                      <Controller
                        name="dt_fechaRemision"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Form.Label>Fecha de la remisión</Form.Label>
                            <Form.Control type="date" {...field} />
                            <Errors
                              message={errors?.dt_fechaRemision?.message}
                            />
                          </Form.Group>
                        )}
                      />
                      <Controller
                        name="a_titulo"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Form.Label>Título</Form.Label>
                            <Form.Control as="select" {...field}>
                              <option value="">Seleccione...</option>
                              <option value="DOCTOR">Doctor</option>
                              <option value="DOCTORA">Doctora</option>
                              <option value="SEÑOR">Señor</option>
                              <option value="SEÑORA">Señora</option>
                            </Form.Control>
                            <Errors message={errors?.a_titulo?.message} />
                          </Form.Group>
                        )}
                      />
                      <Controller
                        name="a_dirigido"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Form.Label>Dirigido</Form.Label>
                            <Form.Control {...field} />
                            <Errors message={errors?.a_dirigido?.message} />
                          </Form.Group>
                        )}
                      />
                      <Controller
                        name="r_usuarios_director"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Form.Label>Director</Form.Label>
                            <Form.Control as="select" {...field}>
                              <option value="">Seleccione...</option>
                              {directores.map((el) => (
                                <option value={el.id}>{el.nombres}</option>
                              ))}
                            </Form.Control>
                            <Errors
                              message={errors?.ht_horaAsesoria?.message}
                            />
                          </Form.Group>
                        )}
                      />
                      <Controller
                        name="r_usuarios_elaboradoPor"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Form.Label>Elaborado por</Form.Label>
                            <Form.Control as="select" {...field}>
                              <option value="">Seleccione...</option>
                              {empleados.map((el) => (
                                <option value={el.id}>{el.nombres}</option>
                              ))}
                            </Form.Control>
                            <Errors
                              message={errors?.ht_horaAsesoria?.message}
                            />
                          </Form.Group>
                        )}
                      />
                      <Controller
                        name="r_config_autoridad"
                        control={control}
                        render={({ field }) => (
                          <Form.Group as={Col} xs="12" md="6">
                            <Autoridad field={field} setValue={setValue} />
                            <Errors message={errors?.ht_horaAsesoria?.message} />
                          </Form.Group>
                        )}
                      />
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card>
              <Card.Header>
                <h2>Estudiantes a remitir</h2>
              </Card.Header>
              <Card.Body style={{ padding: "2.5rem" }} s>
                <Row className="mb-3">
                  <Form.Group as={Col} xs="12" md="7">
                    <label>Cédula del estudiante</label>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                      }}
                    >
                      <input
                        className="form-control"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                      />
                      <Button onClick={() => getInscripciones()}>Buscar</Button>
                    </span>
                  </Form.Group>
                  {inscripciones.length > 0 && (
                    <Form.Group as={Col} xs="12" md="12">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Documento</th>
                            <th>Nombre del estudiante</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {inscripciones.map((el, i) => (
                            <tr>
                              <td>{el?.r_usuarios_persona?.a_numeroDocumento}</td>
                              <td>
                                {el?.r_usuarios_persona?.a_primerNombre} {el?.r_usuarios_persona?.a_segundoNombre}{" "}
                                {el?.r_usuarios_persona?.a_primerApellido} {el?.r_usuarios_persona?.a_segundoApellido}
                              </td>
                              <td>
                                <Button onClick={() => eliminarEstudiante(i)}>
                                  <FaTimes />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Form.Group>
                  )}
                </Row>
              </Card.Body>
            </Card>

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
                Registrar remision masiva
              </Button>
            </div>
          </Form>
        </Page>
      </Spin>
    </Policy>
  );
};

export default RemisionMasiva;
