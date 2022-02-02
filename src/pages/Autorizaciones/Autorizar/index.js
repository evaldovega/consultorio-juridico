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
  Table,
} from "react-bootstrap";
import PerfilMaster from "pages/Perfil/Master";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Context from "./Ctx";
import Errors from "components/Errors";
import AccessDenied from "components/Policy/AccessDenied";
import Autoridad from "components/Autoridad";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN } = require("constants/apiContants");

const Autorizar = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");
  const [personas, setPersonas] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  const [directores, setDirectores] = useState([]);
  const [cedula, setCedula] = useState("");
  const [idEstudiante, setIdEstudiante] = useState("");

  const formPersona = useRef();
  const formAsesoria = useRef();

  const loadSelectData = async () => {
    await API.get("usuarios/personas/?personal_admin=true").then((response) => {
      setPersonas(response.data);
    });
    await API.get("configuracion/jornadas/").then((response) => {
      setJornadas(response.data);
    });
    await API.get("configuracion/grupo/").then((response) => {
      setGrupos(response.data);
    });
    await API.get("configuracion/consultorio/").then((response) => {
      setConsultorios(response.data);
    });
    await API.get("usuarios/empleados/empleadoscargos/?director=true").then(
      (response) => {
        setDirectores(response.data);
      }
    );
    await API.get("usuarios/empleados/empleadoscargos/").then((response) => {
      setEmpleados(response.data);
    });
  };

  const getInscripciones = async () => {
    setInscripciones([]);

    await API.get(`estudiantes/inscripcion/?cedula=${cedula}`).then(
      (response) => {
        setInscripciones(response.data.results);
        setIdEstudiante(response.data.results.map((el) => el?.id)[0]);
      }
    );

    // await API.get("/estudiantes/inscripcion/").then((response) => {
    //   console.log(response.data);
    //   setInscripciones(
    //     response.data.filter((el) =>
    //       el.r_usuarios_persona.a_numeroDocumento.includes(cedula)
    //     )
    //   );
    //   setIdEstudiante(
    //     response.data
    //       .filter((el) => el.r_usuarios_persona.a_numeroDocumento === cedula)
    //       .map((el) => el.id)[0]
    //   );
    // });
  };

  const guardarAsesoria = async (data) => {
    setLoading(true);
    const _data = {
      ...data,
      r_estudiante: idEstudiante,
    };
    console.log(_data);
    API({
      url: "autorizaciones/autorizacion/" + (id ? `${id}/` : ""),
      method: id ? "PATCH" : "POST",
      data: _data,
    })
      .then(({ data }) => {
        setLoading(false);
        toast.success("Autorización registrada correctamente.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push("/autorizaciones");
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
  const loadDetail = () => {
    setLoadingDetail(true);
    API.get("autorizaciones/autorizacion/" + id + "/")
      .then(({ data }) => {
        setValue("a_numeroRadicado", data.a_numeroRadicado);
        setValue("dt_fechaProceso", data.dt_fechaProceso);
        setValue("a_nombrePoderante", data.a_nombrePoderante);
        setValue("t_observaciones", data.t_observaciones);
        setValue("r_estudiante", data.r_estudiante.id);
        setValue("r_usuarios_director", data.r_usuarios_director);
        setValue("r_config_autoridad", data.r_config_autoridad);
        setValue("r_usuarios_elaboradoPor", data.r_usuarios_elaboradoPor);
      })
      .finally(() => setLoadingDetail(false));
  };

  //------Enviar el formulario de persona
  const save = () => {
    // const estudiantesAsignados = getValues("mm_estudiantesAsignados") || [];
    // if (!estudiantesAsignados.length) {
    //     toast.info("Asigne estudiantes a la asesoria por favor", {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //     });
    //     return;
    // }
    // formPersona.current.click();
  };
  //-----Enviar el formulario de inscripcion
  const personaGuardada = ({ persona, success }) => {
    console.log({ success });
    if (success) {
      setValue("r_usuarios_persona", persona.id);
      formAsesoria.current.click();
    } else {
      toast.error("🦄 No se pudo guardar los datos del ciudadano!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    <Policy
      policy={[ROL_ADMIN]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanDocumentos />
          <span>Registrar autorización</span>
        </MigaPan>
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
                  <span>Datos de la autorización</span>
                </h2>
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
                          </tr>
                        </thead>
                        <tbody>
                          {inscripciones.map((el) => (
                            <tr>
                              <td>{el?.r_usuarios_persona?.a_numeroDocumento}</td>
                              <td>
                                {el?.r_usuarios_persona?.a_primerNombre} {el?.r_usuarios_persona?.a_segundoNombre}{" "}
                                {el?.r_usuarios_persona?.a_primerApellido} {el?.r_usuarios_persona?.a_segundoApellido}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Form.Group>
                  )}
                </Row>
                <Row className="mb-3">
                  <Controller
                    name="a_numeroRadicado"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Número del radicado</Form.Label>
                        <Form.Control type="number" {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="dt_fechaProceso"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Fecha del proceso</Form.Label>
                        <Form.Control type="date" {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="a_nombrePoderante"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Nombre del poderante</Form.Label>
                        <Form.Control {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="a_proceso"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Proceso</Form.Label>
                        <Form.Control {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="t_observaciones"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
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
                        <Errors message={errors?.ht_horaAsesoria?.message} />
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
                        <Errors message={errors?.ht_horaAsesoria?.message} />
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
                Registrar
              </Button>
            </div>
          </Form>
        </Context.Provider>
      </Page>
    </Policy>
  );
};

export default Autorizar;
