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
import { useContext } from "react";
import { Context as ContextPolicy } from "components/Policy/Ctx";
import AsignarAdmin from "./AsignarAdmin";

import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import MigaPan from "components/MigaPan";

const { default: Page } = require("components/Page");
const { default: Policy, policyAllow } = require("components/Policy");

const {
  ROL_PERSONA,
  ROL_ESTUDIANTE,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
} = require("constants/apiContants");

const SolicitarAsesoria = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");
  const formPersona = useRef();
  const formAsesoria = useRef();
  const { policies, persona: usuarioEnSession } = useContext(ContextPolicy);

  const guardarAsesoria = async (data) => {
    setLoading(true);
    const _data = {
      ...data,
      r_usuarios_persona: usuarioEnSession,
      mm_estudiantesAsignados: data.mm_estudiantesAsignados
        ? data.mm_estudiantesAsignados.map((e) => e.id)
        : [],
    };

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
        history.push(`/asesoria-juridica/caso/${data.id}/`);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        toast.error("Error al registrar asesoria");
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

  const loadDetail = () => {};

  //------Guardar como persona
  const guardarComoPersona = async () => {
    setValue("r_usuarios_solicitante", localStorage.getItem("id_persona"));
    formAsesoria.current.click();
  };
  //------Enviar el formulario de persona
  const save = () => {
    if (policyAllow(policies, [ROL_ADMIN, ROL_ASESOR])) {
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
    }
    formPersona.current.click();
  };
  //-----Enviar el formulario de inscripcion
  const personaGuardada = ({ persona, success, error }) => {
    if (success) {
      setValue("r_usuarios_solicitante", persona.id);
      formAsesoria.current.click();
    } else {
      console.log(error.response);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        toast.warn(error.response.data.non_field_errors.join(", "), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
    <Policy
      policy={[ROL_ESTUDIANTE, ROL_PERSONA, ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE]}
    >
      <Page>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanAsesoriaJuridica />
          <span>Solicitar asesoria</span>
        </MigaPan>

        <Context.Provider
          value={{ control, watch, errors, setValue, getValues, loading }}
        >
          <Policy policy={[ROL_ESTUDIANTE, ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE]}>
            <Accordion defaultActiveKey="0">
              <Card className="mb-4">
                <Card.Header className="d-flex justify-content-end">
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Ocultar / Mostrar información del ciudadano
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ padding: "2.5rem" }}>
                    <h2 className="mb-4">Ciudadano</h2>
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
          </Policy>

          <Form
            noValidate
            onSubmit={handleSubmit(guardarAsesoria, onError)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Card className="mb-4">
              <Card.Body style={{ padding: "2.5rem" }}>
                <h2>Datos de asesoría</h2>
                <Policy
                  policy={[ROL_ESTUDIANTE, ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE]}
                >
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
                            Fecha de asesoría <span className="required" />
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
                            Hora de asesoría <span className="required" />
                          </Form.Label>
                          <Form.Control type="time" {...field} />
                          <Errors message={errors?.ht_horaAsesoria?.message} />
                        </Form.Group>
                      )}
                    />
                  </Row>
                </Policy>
                <Row className="mb-3">
                  <Controller
                    name="t_asuntoConsulta"
                    control={control}
                    rules={{
                      required: "Ingrese un asunto",
                    }}
                    render={({ field }) => (
                      <Form.Group as={Col} xs="12">
                        <Form.Label>
                          Asunto <span className="required" />
                        </Form.Label>
                        <Form.Control as="textarea" rows="6" {...field} />
                        <Errors message={errors?.t_asuntoConsulta?.message} />
                      </Form.Group>
                    )}
                  />
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body style={{ padding: "2.5rem" }}>
                <h2>Anexar documentos</h2>
                <ArchivosAsesoria />
              </Card.Body>
            </Card>
            <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
              <AsesoriaEstudiantes />
            </Policy>

            <Policy policy={[ROL_ADMIN]}>
              <AsignarAdmin />
            </Policy>

            <Button
              hidden={true}
              type="submit"
              ref={formAsesoria}
              disabled={loading}
            >
              {!id ? "Solicitar nueva asesoria" : "Modificar asesoria"}
            </Button>
          </Form>
          <div className="d-flex justify-content-end mt-4">
            <Policy policy={[ROL_ESTUDIANTE, ROL_ADMIN, ROL_ASESOR]}>
              <Button onClick={save} size="lg" disabled={loading}>
                {!id ? "Solicitar nueva asesoria" : "Modificar asesoria"}
              </Button>
            </Policy>

            <Policy policy={[ROL_PERSONA]}>
              <Button onClick={guardarComoPersona} size="lg" disabled={loading}>
                {!id ? "Solicitar nueva asesoria" : "Modificar asesoria"}
              </Button>
            </Policy>
          </div>
        </Context.Provider>
      </Page>
    </Policy>
  );
};

export default SolicitarAsesoria;
