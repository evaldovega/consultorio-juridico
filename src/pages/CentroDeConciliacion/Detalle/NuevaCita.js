import React, { useState } from 'react'
import Policy from "components/Policy";
import { ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE } from "constants/apiContants";
import Spin from "components/Spin";
import { Controller, useForm } from 'react-hook-form'
import Errors from "components/Errors";
import {
    Breadcrumb,
    Row,
    Col,
    Card,
    Form,
    Modal,
    Button,
    Table,
    Spinner,
    Tab,
    Tabs,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API, { baseUrl } from "utils/Axios";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { PERSONA_JURIDICA, PERSONA_NATURAL } from "constants/apiContants";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const NuevaCita = ({ id, setId, onHide, show }) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(show)
    const [salasConciliacion, setSalasConciliacion] = useState([])
    const [cargando, setCargando] = useState(false);
    const [today, setToday] = useState(new Date())

    const load = async () => {
        const { data } = await API.get("configuracion/salas-conciliacion")
        if (data) {
            setSalasConciliacion(data)
        }
    }

    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault();
    };

    useEffect(() => {
        load()
    }, [])

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
        try {
            setCargando(true);
            const url = `/conciliacion/agenda/`;
            const method = "POST";
            const payload = {
                ...data,
                r_conciliacion_solicitudConciliacion: id
            };
            const { data: response } = await API({
                method,
                url,
                data: payload,
            });
            setCargando(false);
            sessionStorage.setItem("conciliacion", response.id);
            onHide();
        } catch (error) {
            setCargando(false);
            toast.error(error.toString(), {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <Modal
            show={show} 
            onHide={() => {
                onHide()
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Agendar nueva cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    onSubmit={handleSubmit(guardar, onError)}
                    onKeyDown={(e) => checkKeyDown(e)}
                >
                    <Row className="mb-1">
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
                    </Row>
                    <div className="d-flex justify-content-end mt-4">
                        <Button type="submit">
                            Agendar cita
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NuevaCita