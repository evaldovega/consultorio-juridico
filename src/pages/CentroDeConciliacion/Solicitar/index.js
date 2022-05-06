import React, { useState } from "react";

import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "../../../constants/apiContants";
import { Link } from "react-router-dom";
import Page from "components/Page";
import Policy from "components/Policy";
import AccessDenied from "components/Policy/AccessDenied";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Table
} from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Errors from "components/Errors";
import Anexos from "./Anexos";
import Partes from "./Partes";
import Spin from "components/Spin";
import API from "utils/Axios";
import moment from "moment";

import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Context as ContextPolicy } from "components/Policy/Ctx";
import { useContext } from "react";
import Clasificar from "./Clasificar";
import VersionSolicitante from "./VersionSolicitante";
import { FaInfoCircle } from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanConciliacion from "components/MigaPan/CentroConciliacion";

const CentroDeConciliacionSolicitar = () => {
  const history = useHistory();
  const { id: idConciliacion, asesoria } = useParams();
  const [conciliadores, setConciliadores] = useState([]);
  const [salasConciliacion, setSalasConciliacion] = useState([])
  const [cargando, setCargando] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [today, setToday] = useState(new Date())
  const { persona, policies } = useContext(ContextPolicy);
  const [cedula, setCedula] = useState("");
  const [idEstudiante, setIdEstudiante] = useState("");
  const [asesoriaDetail, setAsesoriaDetail] = useState(null)

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
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

  const modalidad = watch('c_modalidad')

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

  const guardar = async (data) => {
    console.log(data)
    try {
      const solicitantes = getValues("r_solicitante");
      if (!solicitantes.length) {
        toast.error("Debes añadir minimo un solicitante", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const citados = getValues("r_citados");
      if (!citados.length) {
        toast.error("Debe citar al menos a una persona.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setCargando(true);
      const url = idConciliacion
        ? `/conciliacion/solicitud/${idConciliacion}/`
        : `/conciliacion/solicitud/`;
      const method = idConciliacion ? "PATCH" : "POST";
      let pruebasanexos = data.t_pruebasAnexos || []
      const payload = {
        ...data,
        t_pruebasAnexos: pruebasanexos.map((a) => ({
          ...a,
          r_usuarios_persona: persona,
        })),
        r_usuarios_conciliador: idEstudiante,
        r_citados: citados
      };
      if (method == "POST") {
        payload.d_fechaSolicitud = moment().format("YYYY-MM-DD");
      }
      console.log({ payload })
      const { data: response } = await API({
        method,
        url,
        data: payload,
      });
      setCargando(false);
      sessionStorage.setItem("conciliacion", response.id);
      history.push(`/centro-de-conciliacion/solicitudes`);
    } catch (error) {
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
      setCargando(false);
    }
  };

  const cargarDetalle = async () => {
    try {
      setCargando(true);
      const { data } = await API(`/conciliacion/solicitud/${idConciliacion}/`);
      if (data) {
        Object.keys(data).forEach((k) => setValue(k, data[k]));
      }
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  const cargarAsesoria = async () => {
    API(`asesorias/solicitud/${asesoria}/`)
      .then(response => {
        setAsesoriaDetail(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  useEffect(() => {
    if (idConciliacion) {
      setTimeout(() => cargarDetalle(), 400);
    }
  }, [idConciliacion]);

  useEffect(() => {
    if (asesoria) {
      setValue("r_asesoria_solicitudAsesoria", asesoria);
      cargarAsesoria();
    }
  }, [asesoria]);

  const load = async () => {
    // await API.get("usuarios/personas/?personal_estudiantil=1").then((response) => {
    //   setConciliadores(response.data);
    // });
    await API.get("configuracion/salas-conciliacion").then((response) => {
      setSalasConciliacion(response.data);
    });
  }

  const getEstudiantes = async () => {
    setConciliadores([]);

    await API.get(`/estudiantes/inscripcion/?cedula=${cedula}`).then(
      (response) => {
        let ret = response.data.results[0]
        setConciliadores([response.data.results[0]]);
        setIdEstudiante(response.data.results[0].r_usuarios_persona.id);
      }
    );
  }

  useEffect(() => {
    load()
  }, []);

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_ESTUDIANTE, ROL_ASESOR, ROL_DOCENTE, ROL_PERSONA]}
      feedback={<AccessDenied msn="Acceso denegado" />}
    >
      <Page>
        <Spin cargando={cargando}>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanConciliacion />
            <span>Solicitar conciliación</span>
          </MigaPan>

          {asesoria ? (
            <Alert
              variant="info"
              className="d-flex justify-content-start align-items-center"
            >
              <p className="mr-2">
                <FaInfoCircle />
              </p>
              <p>Esta conciliación quedara relacionada a una asesoria</p>
            </Alert>
          ) : null}
          <Form
            noValidate
            onSubmit={handleSubmit(guardar, onError)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            {asesoria ? (
              <Controller
                name="r_asesoria_solicitudAsesoria"
                control={control}
                render={(field) => <input type="hidden" {...field} />}
              />
            ) : null}
            <Partes
              name="r_solicitante"
              title="Solicitantes"
              control={control}
              setValue={setValue}
              watch={watch}
              getValues={getValues}
              id="r_usuarios_solicitante"
              apiDelete="conciliacion/solicitante/"
              idConciliacion={idConciliacion}
              btnTextAdd="Añadir Solicitante"
              persona={persona}
              asesoriaDetail={asesoriaDetail && asesoriaDetail}
              policies={policies}
              autoIncluir={true}
              citado={false}
            />
            <Partes
              name="r_citados"
              id="r_usuarios_citado"
              title="Citados"
              control={control}
              setValue={setValue}
              watch={watch}
              getValues={getValues}
              idConciliacion={idConciliacion}
              apiDelete="conciliacion/citado/"
              btnTextAdd="Añadir Citado"
              citado={true}
              policies={policies}
            />
            <VersionSolicitante
              control={control}
              readOnly={readOnly}
              errors={errors}
              cargando={cargando}
              setValue={setValue}
              watch={watch}
            />

            <Anexos
              control={control}
              setValue={setValue}
              watch={watch}
              getValues={getValues}
              idConciliacion={idConciliacion}
              persona={persona}
            />
            <Policy policy={[ROL_ADMIN, ROL_ESTUDIANTE]}>
              <Clasificar
                control={control}
                setValue={setValue}
                watch={watch}
                getValues={getValues}
                idConciliacion={idConciliacion}
                persona={persona}
              />
            </Policy>

            <Policy policy={[ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE]}>
              <Card>
                <Card.Body>
                  <h2>Datos de la audiencia</h2>
                  <Row className="mb-1">
                    {!idConciliacion && (
                      <>
                        <Col xs="12" md="6">
                          <Controller
                            name="d_fechaInicialAudiencia"
                            control={control}
                            rules={{
                              required: "Ingrese información",
                            }}
                            render={({ field }) => (
                              <Form.Group>
                                <Form.Label>Fecha inicial de la audiencia</Form.Label>
                                <Form.Control type="datetime-local" min={today} {...field} />
                                <Errors
                                  message={errors?.r_usuarios_conciliador?.message}
                                />
                              </Form.Group>
                            )}
                          />
                        </Col>
                        <Col xs="12" md="6">
                          <Controller
                            name="d_fechaFinalAudiencia"
                            control={control}
                            rules={{
                              required: "Ingrese información",
                            }}
                            render={({ field }) => (
                              <Form.Group>
                                <Form.Label>Fecha final de la audiencia</Form.Label>
                                <Form.Control type="datetime-local" min={today} {...field} />
                                <Errors
                                  message={errors?.r_usuarios_conciliador?.message}
                                />
                              </Form.Group>
                            )}
                          />
                        </Col>
                        <Col xs="12" md="6">
                          <Controller
                            name="c_modalidad"
                            control={control}
                            rules={{
                              required: "Ingrese información",
                            }}
                            render={({ field }) => (
                              <Form.Group>
                                <Form.Label>Modalidad</Form.Label>
                                <Form.Control as="select" {...field}>
                                  <option value="">Seleccione...</option>
                                  <option value="VIRTUAL">Virtual</option>
                                  <option value="PRESENCIAL">Presencial</option>
                                </Form.Control>
                                <Errors
                                  message={errors?.r_usuarios_conciliador?.message}
                                />
                              </Form.Group>
                            )}
                          />
                        </Col>
                        {modalidad === "VIRTUAL" && (
                          <Col xs="12" md="6">
                            <Controller
                              name="a_enlaceVirtual"
                              control={control}
                              render={({ field }) => (
                                <Form.Group>
                                  <Form.Label>Enlace de la reunión</Form.Label>
                                  <Form.Control type="input" {...field} />
                                  <Errors
                                    message={errors?.r_usuarios_conciliador?.message}
                                  />
                                </Form.Group>
                              )}
                            />
                          </Col>
                        )}
                        {modalidad === "PRESENCIAL" && (
                            <Col xs="12" md="6">
                                <Controller
                                    name="r_config_salaConciliacion"
                                    control={control}
                                    rules={{
                                        required: "Ingrese información",
                                    }}
                                    render={({ field }) => (
                                        <Form.Group>
                                            <Form.Label>Sala de conciliación</Form.Label>
                                            <Form.Control as="select" {...field}>
                                                <option value="">Seleccione...</option>
                                                {salasConciliacion.map((el) => (
                                                    <option value={el.id}>
                                                        {el.a_titulo}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            <Errors
                                                message={errors?.r_usuarios_conciliador?.message}
                                            />
                                        </Form.Group>
                                    )}
                                />
                            </Col>
                        )}
                      </>
                    )}
                    <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
                      <Form.Group as={Col} xs="12" md="7">
                        <label>
                          <strong>Estudiante conciliador</strong>
                        </label>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <input
                            className="form-control"
                            placeholder="No. de identificación (CC, TI...)"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                          />
                          <Button onClick={() => getEstudiantes()}>Buscar</Button>
                        </span>
                      </Form.Group>
                      {conciliadores.length > 0 && (
                        <Form.Group as={Col} xs="12" md="12">
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Documento</th>
                                <th>Nombre del estudiante</th>
                              </tr>
                            </thead>
                            <tbody>
                              {conciliadores.map((el) => (
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
                    </Policy>
                  </Row>
                </Card.Body>
              </Card>
            </Policy>
            <div className="d-flex justify-content-end mt-4">
              <Button type="primary" size="lg">
                {idConciliacion
                  ? "Modificar conciliación"
                  : "Solicitar conciliación"}
              </Button>
            </div>
          </Form>
        </Spin>
      </Page>
    </Policy>
  );
};

export default CentroDeConciliacionSolicitar;
