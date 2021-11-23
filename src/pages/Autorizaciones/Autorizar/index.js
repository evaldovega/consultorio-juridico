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

const Autorizar = () => {
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

    const formPersona = useRef();
    const formAsesoria = useRef();

    const loadSelectData = async () => {
        API.get('usuarios/personas/?personal_admin=true')
            .then(response => {
                setPersonas(response.data)
            })
        API.get('configuracion/jornadas')
            .then(response => {
                setJornadas(response.data)
            })
        API.get('configuracion/grupo')
            .then(response => {
                setGrupos(response.data)
            })
        API.get('configuracion/consultorio')
            .then(response => {
                setConsultorios(response.data)
            })
        API.get('estudiantes/inscripcion')
            .then(response => {
                setInscripciones(response.data)
            })
        API.get('usuarios/empleados/empleadoscargos')
            .then(response => {
                setEmpleados(response.data)
            })
        API.get('configuracion/entidad')
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
        API.post("autorizaciones/autorizacion/", _data)
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
    const loadDetail = () => { };

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
        <Policy policy={[ROL_ADMIN]}>
            <Page>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/autorizaciones">Autorizaciones</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Autorizar</Breadcrumb.Item>
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
                                    <span>Datos de la autorización</span>
                                </h2>

                                <Row className="mb-3">
                                    <Controller
                                        name="a_numeroRadicado"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Group as={Col} xs="12" md="6">
                                                <Form.Label>
                                                    Número del radicado
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Fecha del proceso
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Nombre del poderante
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Proceso
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Observaciones
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Director
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

export default Autorizar;
