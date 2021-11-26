import { Button, Input, Space, Form, Select } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import { Breadcrumb, Card, Col, Row, Table, Spinner } from "react-bootstrap";
import { Controller, useForm } from 'react-hook-form'

import { SearchOutlined, PrinterOutlined, DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Policy from "components/Policy";
import { ROL_ASESOR } from "constants/apiContants";

const ListadoRemisiones = () => {
    const [docs, setDoc] = useState([]);
    const [cedulas, setCedulas] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [cedulaEstudiante, setCedulaEstudiante] = useState("")

    const getRemisiones = async () => {
        await API.get("autorizaciones/remision/").then((response) => {
            console.log(JSON.stringify(response.data));
            setDoc(response.data)
        });
    };

    const eliminarRemision = async (id_delete) => {
        if (window.confirm('¿Seguro que desea eliminar esta remisión?')) {
            API.delete(`autorizaciones/remision/${id_delete}/`)
            .then(response => {
                window.location.reload()
            })
        }
    }

    const getColumnSearchProps = (dataIndex) => {
        let searchInput;
        const _props = {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={(node) => {
                            searchInput = node;
                        }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Buscar
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Limpiar
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({ closeDropdown: false });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            Resaltar
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    : "",
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ""}
                    />
                ) : (
                    text
                ),
        };
        return _props;
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(0);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
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
        setTimeout(() => {
            getRemisiones();
            setLoading(false);
        }, 1000);
    }, [cedulaEstudiante]);

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
                    <Breadcrumb.Item active>Listado de remisiones</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <Card.Body>
                        <h2 className="title-line" style={{ marginTop: 10 }}>
                            <span>Listado de remisiones</span>
                        </h2>
                        {loading && (
                            <div className="d-flex justify-content-center">
                                <Spinner
                                    animation="border"
                                    role="status"
                                    variant="primary"
                                ></Spinner>
                            </div>
                        )}
                        {/* <Row>
                            <Col md={4}>
                                <label>Cédula del estudiante</label>
                                <select 
                                    className="form-control"
                                    value={cedulaEstudiante}
                                    onChange={e => {
                                        setCedulaEstudiante(e.target.value)
                                    }}
                                >
                                    {cedulas.map((el, i) => (
                                        <option value={el.r_usuarios_estudiante.a_numeroDocumento}>{el.r_usuarios_estudiante.a_numeroDocumento}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row> */}
                        {/* <br /><br /> */}
                        <Row style={{marginBottom: "15px"}}>
                            <Col md={4}>
                                <label>Cédula del estudiante</label>
                                <input 
                                    className="form-control"
                                    value={cedulaEstudiante}
                                    onChange={e => {
                                        setCedulaEstudiante(e.target.value)
                                    }}
                                    placeholder="Buscar..."
                                />
                            </Col>
                        </Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Número</th>
                                    <th>Periodo</th>
                                    <th>Documento de identidad</th>
                                    <th>Nombre del estudiante</th>
                                    <th>Fecha</th>
                                    <th>Director</th>
                                    <th>Elaborado por</th>
                                    <th>Destinatario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {docs.filter(d => d.r_usuarios_estudiante.r_usuarios_persona.a_numeroDocumento.includes(cedulaEstudiante)).map((d) => (
                                    <tr>
                                        <td>
                                            <a href={`./generar-remision/${d.id}`}>
                                                {d.a_numeroRemision}
                                            </a>
                                        </td>
                                        <td>{d.r_usuarios_estudiante.a_anioInscripcion}-{d.r_usuarios_estudiante.a_semestreInscripcion}</td>
                                        <td>{d.r_usuarios_estudiante.r_usuarios_persona.a_numeroDocumento}</td>
                                        <td>{d.r_usuarios_estudiante.r_usuarios_persona.a_primerNombre} {d.r_usuarios_estudiante.r_usuarios_persona.a_segundoNombre} {d.r_usuarios_estudiante.r_usuarios_persona.a_primerApellido} {d.r_usuarios_estudiante.r_usuarios_persona.a_segundoApellido}</td>
                                        <td>{d.dt_fechaRemision}</td>
                                        <td>{d.r_usuarios_director.a_primerNombre} {d.r_usuarios_director.a_segundoNombre} {d.r_usuarios_director.a_primerApellido} {d.r_usuarios_director.a_segundoApellido}</td>
                                        <td>{d.r_usuarios_elaboradoPor.a_primerNombre} {d.r_usuarios_elaboradoPor.a_segundoNombre} {d.r_usuarios_elaboradoPor.a_primerApellido} {d.r_usuarios_elaboradoPor.a_segundoApellido} </td>
                                        <td>{d.r_config_autoridad.a_titulo}</td>
                                        <td>
                                            <a href={`http://localhost:8000/doc_remision/${d.id}/`}>
                                                <span title="Imprimir">
                                                    <PrinterOutlined
                                                        style={{
                                                            fontSize: "20px",
                                                            marginRight: "20px"
                                                        }} 
                                                    />
                                                </span>
                                            </a>
                                            <span title="Eliminar">
                                                <DeleteOutlined
                                                    onClick={() => eliminarRemision(d.id)}
                                                    style={{
                                                        fontSize: "20px",
                                                        color: 'red'
                                                    }}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Page>
        </Policy>
    );
};

export default ListadoRemisiones;
