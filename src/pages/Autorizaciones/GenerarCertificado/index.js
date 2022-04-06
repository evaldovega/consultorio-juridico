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
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";
const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN } = require("constants/apiContants");

const GenerarCertificado = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");
  const [personas, setPersonas] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [autoridades, setAutoridades] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [cedula, setCedula] = useState("");
  const [idEstudiante, setIdEstudiante] = useState("");

  const formPersona = useRef();
  const formAsesoria = useRef();

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
    setInscripciones([]);
    setSearching(true)
    // console.log(cedula);
    // await API.get('/estudiantes/inscripcion/')
    //   .then(response => {
    //     setInscripciones(response.data.results.filter(el => el.r_usuarios_persona.a_numeroDocumento === cedula))
    //     setIdEstudiante(response.data.results.filter(el => el.r_usuarios_persona.a_numeroDocumento === cedula).map(el => (el.r_usuarios_persona.id))[0])
    //   })

    await API.post("/academusoft/estudiantes/", { estudiante: cedula }).then(
      (response) => {
        setInscripciones([response.data]);
        setIdEstudiante([response.data].map((el) => el.id)[0]);
        setSearching(false)
      }
    ).catch(err => {
      toast.error(`No se ha encontrado este estudiante.`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setSearching(false)
    });

    // inscripciones.map((el) => (
    //   console.log(el),
    //   setIdEstudiante(el.id)
    // ))
  };

  const guardarAsesoria = async (data) => {
    if (idEstudiante !== "") {
      setLoading(true);
      const _data = {
        ...data,
        r_usuarios_estudiante: idEstudiante,
      };
      console.log(_data);
      API({
        url: "autorizaciones/certificacion/" + (id ? `${id}/` : ""),
        method: id ? "PATCH" : "POST",
        data: _data,
      })
        .then(({ data }) => {
          setLoading(false);
          toast.success("Se ha generado la certificación.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          history.push("/autorizaciones");
        })
        .catch((error) => {
          console.log(error.response.data);
          const e =
            error.response && error.response.data
              ? error.response.data.detail
              : error.toString();
          toast.error(`${e}`, {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error(`Debe ingresar a un estudiante para poder generar su certificado.`, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
    API.get("autorizaciones/certificacion/" + id + "/")
      .then(({ data }) => {
        setValue("r_usuarios_estudiante", data.r_usuarios_estudiante.id);
        setValue("r_usuarios_director", data.r_usuarios_director.id);
        setValue("r_usuarios_elaboradoPor", data.r_usuarios_elaboradoPor.id);
        setValue("dt_fechaProceso", data.dt_fechaProceso);
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
      toast.error("No se pudo guardar los datos del ciudadano!", {
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
    <Policy policy={[ROL_ADMIN]}>
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanDocumentos />
          <span>Generar certificado</span>
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
                  <span>Datos del certificado</span>
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
                        onKeyDown={(event) => {event.key === "Enter" && getInscripciones()}}
                      />
                      <Button 
                        onClick={() => getInscripciones()}
                        disabled={searching}
                      >
                        {searching ? "Buscando..." : "Buscar"}
                      </Button>
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
                              <td>{el.a_numeroDocumento}</td>
                              <td>
                                {el.a_primerNombre} {el.a_segundoNombre}{" "}
                                {el.a_primerApellido} {el.a_segundoApellido}
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

export default GenerarCertificado;
