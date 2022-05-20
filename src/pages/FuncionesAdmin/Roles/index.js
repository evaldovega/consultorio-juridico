import React from 'react'
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
    Table
} from "react-bootstrap";
import PerfilMaster from "pages/Perfil/Master";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Errors from "components/Errors";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsignacionDocentes from "components/MigaPan/AsignacionDocentes";

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN } = require("constants/apiContants");

const Roles = () => {
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

    return (
        <Policy policy={[ROL_ADMIN]}>
            <Page>
                <br />
                <br />
                <Form
                    noValidate
                >
                    <Card>
                        <Card.Body style={{ padding: "2.5rem" }}>
                            <h2 className="title-line">
                                <span>Consultar usuario</span>
                            </h2>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs="12" md="6">
                                    <label><strong>Cédula del usuario</strong></label>
                                    <span
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "20px",
                                        }}
                                    >
                                        <input
                                            className="form-control"
                                        />
                                    </span>
                                </Form.Group>
                                <Button>Buscar usuario</Button>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} xs="12" md="12">
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </Page>
        </Policy>
    )
}

export default Roles