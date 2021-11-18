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
import ArchivosAsesoria from "./Archivos";
import AsesoriaEstudiantes from "./Estudiantes";

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA } = require("constants/apiContants");

const SolicitarAsesoria = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");

  const formPersona = useRef();
  const formAsesoria = useRef();

  const guardarAsesoria = async (data) => {
    setLoading(true);
    const _data = {
      ...data,
      mm_estudiantesAsignados: data.mm_estudiantesAsignados.map((e) => e.id),
    };
    console.log(_data);
    API.post("asesorias/solicitud/", _data)
      .then(({ data }) => {
        setLoading(false);
        toast.success("Asesoria registrada correctamente!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        history.push("/asesoria-juridica");
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
  const loadDetail = () => {};

  //------Enviar el formulario de persona
  const save = () => {
    const estudiantesAsignados = getValues("mm_estudiantesAsignados") || [];
    if (!estudiantesAsignados.length) {
      toast.info("Asigne estudiantes a la asesoria por favor", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    formPersona.current.click();
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
            <Link to="/asesoria-juridica">Asesoria jurídica</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Solicitar asesoria</Breadcrumb.Item>
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
                  <span>Datos de asesoria</span>
                </h2>

                <Row className="mb-3">
                  <Controller
                    name="dt_fechaAsesoria"
                    control={control}
                    rules={{
                      required: "Ingrese una fecha",
                    }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Fecha de asesoria <span className="required" />
                        </Form.Label>
                        <Form.Control type="date" {...field} />
                        <Errors message={errors?.dt_fechaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                  <Controller
                    name="ht_horaAsesoria"
                    control={control}
                    rules={{
                      required: "Ingrese una hora",
                    }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Hora de asesoria <span className="required" />
                        </Form.Label>
                        <Form.Control type="time" {...field} />
                        <Errors message={errors?.ht_horaAsesoria?.message} />
                      </Form.Group>
                    )}
                  />
                </Row>
                <Row className="mb-3">
                  <Controller
                    name="t_asuntoConsulta"
                    control={control}
                    rules={{
                      required: "Ingrese un asunto",
                    }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12" md="6">
                        <Form.Label>
                          Asunto <span className="required" />
                        </Form.Label>
                        <Form.Control as="textarea" {...field} />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                </Row>
              </Card.Body>
            </Card>
            <br />
            <br />
            <Card>
              <Card.Body style={{ padding: "2.5rem" }}>
                <h2 className="title-line">
                  <span>Anexar documentos</span>
                </h2>
                <ArchivosAsesoria />
              </Card.Body>
            </Card>
            <br />
            <br />
            <AsesoriaEstudiantes />
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

export default SolicitarAsesoria;
