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

    const { readOnly } = useContext(Context)

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

    const checked = watch("r_usuarios_estudiante", []);

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
                setInscripciones(response.data.map((el) => ({
                    // label: `${el.r_usuarios_persona.a_primerNombre} ${el.r_usuarios_persona.a_segundoNombre} ${el.r_usuarios_persona.a_primerApellido} ${el.r_usuarios_persona.a_segundoApellido} `,
                    value: el.id,
                    // documento: el.r_usuarios_persona.a_numeroDocumento
                })))
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
            "a_numeroRemision": data.a_numeroRemision,
            "dt_fechaRemision": data.dt_fechaRemision,
            "a_titulo": data.a_titulo,
            "a_dirigido": data.a_dirigido,
            "r_usuarios_director": data.r_usuarios_director,
            "r_usuarios_elaboradoPor": data.r_usuarios_elaboradoPor,
            "r_config_autoridad": data.r_config_autoridad,
            "r_usuarios_estudiante_list": data.r_usuarios_estudiante
        };
        console.log(_data);
        API({
            url: "autorizaciones/remision/" + (id ? `${id}/` : ""),
            method: id ? "PATCH" : "POST",
            data: _data
        })
            .then(({ data }) => {

            })
            .catch((err) => {
                console.log(err.response.data);
                setLoading(false);
            })
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

    const onChange = (check) => {
        let values = getValues("r_usuarios_estudiante") || [];
        const index = values.indexOf(check.value);
        if (index < 0) {
            values.push(check.value);
        } else {
            values.splice(index, 1);
        }
        setValue("r_usuarios_estudiante", values);
    };

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



    useEffect(() => {
        loadSelectData()
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
                                <h2 className="title-line" style={{ marginTop: "20px" }}>
                                    <span>Estudiantes para remisión</span>
                                </h2>
                                <Row className="mb-3">
                                    <Form.Group as={Col} xs="12" md="12">
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Documento</th>
                                                    <th>Estudiante</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inscripciones.map((el) => (
                                                    <tr>
                                                        <td>
                                                            <Form.Check
                                                                type="checkbox"
                                                                disabled={readOnly}
                                                                checked={checked?.some((c) => c == el.value)}
                                                                onChange={(e) => onChange(e.target)}
                                                                value={el.value}
                                                            />
                                                        </td>
                                                        <td>{el.value}</td>
                                                        {/* <td>{el.label}</td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Form.Group>
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

export default RemisionMasiva;
