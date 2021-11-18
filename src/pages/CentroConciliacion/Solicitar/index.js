import { useContext, useEffect, useState, useRef } from "react";
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
import ArchivosAsesoria from "./Archivos";
import AsesoriaEstudiantes from "./Estudiantes";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA } = require("constants/apiContants");

const SolicitarConciliacion = () => {
  const {
    readOnly
  } = useContext(Context);

  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");
  const [solicitantes, setSolicitantes] = useState([])
  const [finalidades, setFinalidades] = useState([])
  const [casosGratuitos, setCasosGratuitos] = useState([])
  const [areas, setAreas] = useState([])
  const [temas, setTemas] = useState([])
  const [subtemas, setSubtemas] = useState([])
  const [tiemposConflicto, setTiemposConflicto] = useState([])

  const formPersona = useRef();
  const formAsesoria = useRef();

  const getSelectItems = async (data) => {
    API.get('configuracion/solicitante-servicio/')
      .then(({ data }) => {
        setSolicitantes(data)
      })
    API.get('configuracion/finalidad-solicitante/')
      .then(({ data }) => {
        setFinalidades(data)
      })
    API.get('configuracion/tipo-caso-gratuito/')
      .then(({ data }) => {
        setCasosGratuitos(data)
      })
    API.get('configuracion/area-asesoria/')
      .then(({ data }) => {
        setAreas(data)
      })
    API.get('configuracion/tema-conciliacion/')
      .then(({ data }) => {
        setTemas(data)
      })
    API.get('configuracion/subtema-conciliacion/')
      .then(({ data }) => {
        setSubtemas(data)
      })
    API.get('configuracion/tiempo-conflicto/')
      .then(({ data }) => {
        setTiemposConflicto(data)
      })
  }

  const guardarAsesoria = async (data) => {
    setLoading(true);
    const _data = {
      ...data
    };
    console.log(_data);
    API.post("conciliacion/solicitud/", _data)
      .then(({ data }) => {
        setLoading(false);
        toast.success("Conciliación registrada correctamente!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push("/centro-conciliacion");
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
    toast.info("😥 Ingresa la información faltante por favor!", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const loadDetail = () => { };

  //------Enviar el formulario de persona
  const save = () => {
    formPersona.current.click();
  };
  //-----Enviar el formulario de inscripcion
  const personaGuardada = ({ persona, success }) => {
    console.log({ success });
    if (success) {
      setValue("r_asesoria_casoJuridico", 1)
      setValue("r_solicitante", [{
        "a_nombreCompleto": persona.a_nombreCompleto
      }])
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
    getSelectItems()
    if (id) {
      loadDetail();
    }
  }, [id]);

  return (
    <Policy policy={[]}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/asesoria-juridica">Centro de conciliación</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Solicitar conciliación</Breadcrumb.Item>
        </Breadcrumb>
        <Context.Provider
          value={{ control, watch, errors, setValue, getValues, loading }}
        >
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className="d-flex justify-content-end">
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Ciudadano
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: "2.5rem" }}>
                  <PerfilMaster
                    id={personaId}
                    formRef={formPersona}
                    showButton={false}
                    allowSearchPerson={true}
                    clearOnFinish={true}
                    callback={personaGuardada}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
                  <span>Datos de conciliación</span>
                </h2>

                <Row className="mb-3">
                  <Controller
                    name="d_fechaSolicitud"
                    control={control}
                    // rules={{
                    //   required: "Ingrese una fecha",
                    // }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Fecha de solicitud
                        </Form.Label>
                        <Form.Control type="date" {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_solicitanteServicio"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Solicitante del servicio
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {solicitantes.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                </Row>
                <Row className="mb-3">
                  <Controller
                    name="r_config_finalidadSolicitante"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Finalidad del solicitante
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {finalidades.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_casoGratuito"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Caso gratuito
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {casosGratuitos.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="b_definicionAsunto"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Definición del asunto jurídico
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          <option value={true}>Si</option>
                          <option value={false}>No</option>
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_areaMateria"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Área o materia
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {areas.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_tema"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Tema
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {temas.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_subtema"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Subtema
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {subtemas.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_tiempoConflicto"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Tiempo de conflicto
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          {tiemposConflicto.map((el) => (
                            <option value={el.id}>{el.a_titulo}</option>
                          ))}
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="c_intencionSolicitante"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Intención del solicitante
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="">Seleccione...</option>
                          <option value="CONCILIAR">Conciliar</option>
                          <option value="CUMPLIR_PROCEDIBILIDAD">Cumplir procedibilidad</option>
                          <option value="DIALOGAR">Dialogar</option>
                          <option value="OTRO">Otro</option>
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_pais"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          País
                        </Form.Label>
                        <Country
                          field={field}
                          child="r_config_departamento"
                          setValue={setValue}
                          readOnly={readOnly}
                          plaintext={readOnly}
                        />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_departamento"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Departamento
                        </Form.Label>
                        <State
                          field={field}
                          child="r_config_municipio"
                          setValue={setValue}
                          readOnly={readOnly}
                        />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="r_config_municipio"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Municipio
                        </Form.Label>
                        <City field={field} setValue={setValue} readOnly={readOnly} />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="t_resumenHechos"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Definición del asunto jurídico
                        </Form.Label>
                        <Form.Control {...field} as="textarea" />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="t_pretencionesIniciales"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Pretensiones iniciales
                        </Form.Label>
                        <Form.Control {...field} as="textarea" />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="t_pruebasAnexos"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Pruebas y anexos
                        </Form.Label>
                        <Form.Control {...field} as="textarea" />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="a_cuantiaValor"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Cuantía o valor
                        </Form.Label>
                        <Form.Control {...field} as="text" />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="t_asuntoConsulta"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Indeterminada
                        </Form.Label>
                        <Form.Control {...field} as="text" />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="a_indeterminada"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Indeterminada
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="1">Una parte</option>
                          <option value="2">Las dos partes</option>
                          <option value="3">Mediante apoderado</option>
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="t_asuntoConsulta"
                    control={control}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Conciliador
                        </Form.Label>
                        <Form.Control {...field} as="select">
                          <option value="1">Una parte</option>
                          <option value="2">Las dos partes</option>
                          <option value="3">Mediante apoderado</option>
                        </Form.Control>
                        <Errors message={errors?.t_asuntoConsulta?.message} />
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
          </Form>
          <div className="d-flex justify-content-end mt-4">
            <Button onClick={save} size="lg" disabled={loading}>
              Registrar
            </Button>
          </div>
        </Context.Provider>
      </Page>
    </Policy>
  );
};

export default SolicitarConciliacion;
