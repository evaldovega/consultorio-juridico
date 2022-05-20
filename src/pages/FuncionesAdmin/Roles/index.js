import React, { useEffect, useRef, useState } from 'react'
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
import Spin from "components/Spin";

const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { ROL_PERSONA, ROL_ADMIN } = require("constants/apiContants");

const Roles = () => {
    const [cedula, setCedula] = useState(null)
    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(false)

    const btn = useRef();
    const btnCollapsed = useRef();

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

    const getInfo = async () => {
        try {
            setLoading(true)
            const { data } = await API(`detallado/?numero_documento=${cedula}`)
            setInfo(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Policy policy={[ROL_ADMIN]}>
            <Page>
                <Form
                    noValidate
                >
                    <Card>
                        <Card.Body style={{ padding: "2.5rem" }}>
                            <h2 className="title-line">
                                <span>Consultar usuario</span>
                            </h2>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} xs="12" md="6">
                                    <span
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "20px",
                                        }}
                                    >
                                        <input
                                            placeholder="Cédula del usuario"
                                            className="form-control"
                                            value={cedula}
                                            onChange={(e) => setCedula(e.target.value)}
                                        />
                                    </span>
                                </Form.Group>
                                <Button 
                                    onClick={getInfo}
                                >
                                    Buscar usuario
                                </Button>
                            </Row>
                            <Spin cargando={loading}>
                                <Row className="mb-3">
                                    {info && (
                                        <Form.Group as={Col} xs="12" md="12">
                                                {info.map((el, i) => (
                                                    <Card key={i}>
                                                        <Card.Header>
                                                            <h3>
                                                                <strong>Usuario de acceso: </strong> {el?.users?.username}
                                                            </h3>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <b>ROL DE USUARIO: </b> {el?.users?.rol}
                                                            <br />
                                                            {el?.inscripcion && (
                                                                <span>
                                                                    <b>INSCRIPCIÓN: </b> {el?.inscripcion?.anio}-{el?.inscripcion?.semestre}, {el?.inscripcion?.consultorio}, GRUPO {el?.inscripcion?.grupo}
                                                                </span>
                                                            )}
                                                            <br />
                                                            {el?.casos && (
                                                                <span>
                                                                    <b>CASOS: </b>
                                                                    <Table striped bordered hover>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>No. caso</th>
                                                                                <th>Fecha de asesoría</th>
                                                                                <th>Fecha de registro en el sistema</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>    
                                                                            {el?.casos.map((item, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <a href={`asesoria-juridica/caso/${item?.no_caso}`}>
                                                                                            {item?.no_caso}
                                                                                        </a>
                                                                                    </td>
                                                                                    <td>
                                                                                        {item?.fecha_asesoria || "-"}
                                                                                    </td>
                                                                                    <td>
                                                                                        {item?.fecha_registro_sistema || "-"}
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </Table>
                                                                </span>
                                                            )}
                                                            {el?.docente && (
                                                                <span>
                                                                <b>DOCENTE DE: </b> {el?.docente?.anio}-{el?.docente?.semestre}, {el?.docente?.consultorio}, GRUPO {el?.docente?.grupo}
                                                            </span>  
                                                            )}
                                                        </Card.Body>
                                                    </Card>
                                                ))}
                                        </Form.Group>
                                    )}
                                </Row>
                            </Spin>
                        </Card.Body>
                    </Card>
                </Form>
            </Page>
        </Policy>
    )
}

export default Roles