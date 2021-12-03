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
import Select from 'react-select';

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN, ROL_DOCENTE } = require("constants/apiContants");

const GenerarRemision = () => {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [personaId, setPersonaId] = useState("");
    const [personas, setPersonas] = useState([])
    const [inscripciones, setInscripciones] = useState([])
    const [jornadas, setJornadas] = useState([])
    const [grupos, setGrupos] = useState([])
    const [consultorios, setConsultorios] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [autoridades, setAutoridades] = useState([])
    const [directores, setDirectores] = useState([])

    const formPersona = useRef();
    const formAsesoria = useRef();

    const loadSelectData = async () => {
        API.get('usuarios/personas/')
            .then(response => {
                setPersonas(response.data)
            })
        API.get('configuracion/jornadas/')
            .then(response => {
                setJornadas(response.data)
            })
        API.get('configuracion/grupo/')
            .then(response => {
                setGrupos(response.data)
            })
        API.get('configuracion/consultorio/')
            .then(response => {
                setConsultorios(response.data)
            })
        API.get('estudiantes/inscripcion/')
            .then(response => {
                setInscripciones(response.data)
            })
        API.get('usuarios/empleados/empleadoscargos/?director=true')
            .then(response => {
                setDirectores(response.data)
            })
        API.get('usuarios/empleados/empleadoscargos/')
            .then(response => {
                setEmpleados(response.data)
            })
        API.get('configuracion/entidad/')
            .then(response => {
                setAutoridades(response.data)
            })
    }

    const guardarAsesoria = async (data) => {
        setLoading(true);
        const _data = {
            ...data
        };
        console.log(_data);
        API({
            url: "autorizaciones/remision/" + (id ? `${id}/` : ""),
            method: id ? "PATCH" : "POST",
            data: _data,
        })
            .then(({ data }) => {
                setLoading(false);
                toast.success("Se ha generado la remisión.", {
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
        toast.info("😥 Ingresa la información faltante por favor!", {
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
        loadSelectData()
        if (id) {
            loadDetail();
        }
    }, [id]);

    return (
        <Policy policy={[ROL_ADMIN, ROL_DOCENTE]}>
            <Page>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/autorizaciones">Documentos</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Generar remisión</Breadcrumb.Item>
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
                                    <span>Datos de la remisión</span>
                                </h2>
                                <Row className="mb-3">
                                    <Controller
                                        name="r_usuarios_estudiante"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Group as={Col} xs="12" md="6">
                                                <Form.Label>
                                                    Estudiante
                                                </Form.Label>
                                                <Form.Control as="select" {...field}>
                                                    <option value="">Seleccione...</option>
                                                    {inscripciones.map((el) => (
                                                        <option value={el.id}>({el.a_anioInscripcion}{el.a_semestreInscripcion}) - {el.r_usuarios_persona.a_primerNombre} {el.r_usuarios_persona.a_segundoNombre} {el.r_usuarios_persona.a_primerNombre} {el.r_usuarios_persona.a_primerNombre} </option>
                                                    ))}
                                                </Form.Control>
                                                <Errors message={errors?.ht_horaAsesoria?.message} />
                                            </Form.Group>
                                        )}
                                    />
                                    <Controller
                                        name="a_numeroRemision"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Group as={Col} xs="12" md="6">
                                                <Form.Label>
                                                    Número de la remisión
                                                </Form.Label>
                                                <Form.Control {...field} />
                                                <Errors message={errors?.a_numeroRemision?.message} />
                                            </Form.Group>
                                        )}
                                    />
                                    <Controller
                                        name="dt_fechaRemision"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Group as={Col} xs="12" md="6">
                                                <Form.Label>
                                                    Fecha de la remisión
                                                </Form.Label>
                                                <Form.Control type="date" {...field} />
                                                <Errors message={errors?.dt_fechaRemision?.message} />
                                            </Form.Group>
                                        )}
                                    />
                                    <Controller
                                        name="a_titulo"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Group as={Col} xs="12" md="6">
                                                <Form.Label>
                                                    Título
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Dirigido
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Director
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Elaborado por
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Autoridad
                                                </Form.Label>
                                                <Form.Control as="select" {...field}>
                                                    <option value="">Seleccione...</option>
                                                    {autoridades.map((el) => (
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
                                Registrar
                            </Button>
                        </div>
                    </Form>
                </Context.Provider>
            </Page>
        </Policy>
    );
};

export default GenerarRemision;
