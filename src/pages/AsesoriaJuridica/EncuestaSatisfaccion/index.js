import React from 'react'
import Page from 'components/Page'
import {
    Card,
    Form,
    Breadcrumb,
    Button,
    Accordion,
    Row,
    Col,
    Table,
} from "react-bootstrap"
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Policy from 'components/Policy'
import { ROL_ADMIN, ROL_PERSONA } from 'constants/apiContants'
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import Errors from "components/Errors";
import API from 'utils/Axios';
import { useHistory } from "react-router-dom";

export default function EncuestaSatisfaccion() {
    const history = useHistory()
    const [loading, setLoading] = React.useState(false)

    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    const save = async (data) => {
        setLoading(true);
        const _data = {
            ...data,
            r_usuarios_persona: localStorage.getItem('id_persona')
        };
        console.log(_data)
        API({
            url: "asesorias/encuesta/",
            method: "POST",
            data: _data,
        })
            .then(({ data }) => {
                setLoading(false);
                toast.success("Su encuesta ha sido enviada.", {
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
    }

    const onError = (e) => {
        toast.info("Por favor, ingrese la información faltante.", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
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

    const servicio = watch("c_servicios")

    return (
        <Policy policy={[ROL_PERSONA, ROL_ADMIN]}>
            <Page>
                <MigaPan>
                    <MigaPanInicio />
                    <MigaPanAsesoriaJuridica />
                    <span>Encuesta de satisfacción</span>
                </MigaPan>
                <Form
                    noValidate
                    onSubmit={handleSubmit(save, onError)}
                    onKeyDown={(e) => checkKeyDown(e)}
                >
                    <Card>
                        <Card.Body style={{ padding: "2.5rem" }}>
                            <h2 className="title-line">
                                <span>Encuesta de satisfacción</span>
                            </h2>
                            <Row className="mb-3">
                                <Controller
                                    name="c_servicios"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Group as={Col} xs="12">
                                            <Form.Label>¿Cómo se entero de los servicios del Consultorio Jurídico de la Universidad del Atlántico?</Form.Label>
                                            <Form.Control as="select" {...field}>
                                                <option value="">Seleccione...</option>
                                                <option value="RECOMENDACION">Recomendación de familiares o conocidos</option>
                                                <option value="FOLLETOS">Folletos y publicidad del consultorio Jurídico</option>
                                                <option value="OTRO">Otro</option>
                                            </Form.Control>
                                            <Errors message={errors?.c_servicios?.message} />
                                        </Form.Group>
                                    )}
                                />
                                {servicio === "OTRO" && (
                                    <Controller
                                        name="a_servicios_otro"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Group as={Col} xs="12">
                                                <Form.Label>¿Cuál?</Form.Label>
                                                <Form.Control {...field} />
                                                <Errors message={errors?.a_numeroRemision?.message} />
                                            </Form.Group>
                                        )}
                                    />
                                )}
                                <Controller
                                    name="c_tiempo_espera"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Group as={Col} xs="12" md="6">
                                            <Form.Label>¿Cómo se entero de los servicios del Consultorio Jurídico de la Universidad del Atlántico?</Form.Label>
                                            <Form.Control as="select" {...field}>
                                                <option value="">Seleccione...</option>
                                                <option value="MENOSDE5MIN">Menos de 5 minutos</option>
                                                <option value="ENTRE5Y10MIN">Entre 5 y 10 minutos</option>
                                                <option value="MASDE10MIN">Más de 10 minutos</option>
                                            </Form.Control>
                                            <Errors message={errors?.c_tiempo_espera?.message} />
                                        </Form.Group>
                                    )}
                                />
                                <Controller
                                    name="c_calificacion_estudiante"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Group as={Col} xs="12" md="6">
                                            <Form.Label>Con respecto al tramite de la asesoría,¿como califica la atención del estudiante asesor?</Form.Label>
                                            <Form.Control as="select" {...field}>
                                                <option value="">Seleccione...</option>
                                                <option value="EXCELENTE">Excelente</option>
                                                <option value="BUENO">Bueno</option>
                                                <option value="REGULAR">Regular</option>
                                                <option value="MALO">Malo</option>
                                            </Form.Control>
                                            <Errors message={errors?.c_tiempo_espera?.message} />
                                        </Form.Group>
                                    )}
                                />
                                <Controller
                                    name="a_razon_calificacion"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Group as={Col} xs="12">
                                            <Form.Label>¿Por qué?</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="6"
                                                {...field}
                                            />
                                            <Errors message={errors?.a_numeroRemision?.message} />
                                        </Form.Group>
                                    )}
                                />
                            </Row>
                            <div className="d-flex justify-content-end mt-4">
                                <Button type="submit" size="lg">
                                    Registrar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Form>
            </Page>
        </Policy>
    )
}