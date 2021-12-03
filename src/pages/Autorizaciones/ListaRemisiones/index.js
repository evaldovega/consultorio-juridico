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
import { MDBDataTable } from 'mdbreact';

const ListadoRemisiones = () => {
    const [docs, setDoc] = useState([]);
    const [cedulas, setCedulas] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [cedulaEstudiante, setCedulaEstudiante] = useState("")

    const [headerTable, setHeaderTable] = useState([
        {
            label: 'Número',
            field: 'numero'
        },
        {
            label: 'Periodo',
            field: 'periodo'
        },
        {
            label: 'Documento de identidad',
            field: 'documento'
        },
        {
            label: 'Nombre del estudiante',
            field: 'nombre_estudiante'
        },
        {
            label: 'Fecha',
            field: 'fecha'
        },
        {
            label: 'Director',
            field: 'director'
        },
        {
            label: 'Elaborado por',
            field: 'elaborado_por'
        },
        {
            label: 'Destinatario',
            field: 'destinatario'
        },
        {
            label: 'Acciones',
            field: 'acciones'
        }
    ])
    const [tableData, setTableData] = useState([])

    const getRemisiones = async () => {
        await API.get("autorizaciones/remision/").then((response) => {
            console.log(JSON.stringify(response.data));
            setDoc(response.data)
            setTableData(response.data.map((el) => ({
                "numero": <a href={`./generar-remision/${el.id}`}>{el.a_numeroRemision}</a>,
                "periodo": `${el.r_usuarios_estudiante.a_anioInscripcion}-${el.r_usuarios_estudiante.a_semestreInscripcion}`,
                "documento": el.r_usuarios_estudiante.r_usuarios_persona.a_numeroDocumento,
                "nombre_estudiante": `${el.r_usuarios_estudiante.r_usuarios_persona.a_primerNombre} ${el.r_usuarios_estudiante.r_usuarios_persona.a_segundoNombre !== null ? el.r_usuarios_estudiante.r_usuarios_persona.a_segundoNombre : ""} ${el.r_usuarios_estudiante.r_usuarios_persona.a_primerApellido} ${el.r_usuarios_estudiante.r_usuarios_persona.a_segundoApellido !== null ? el.r_usuarios_estudiante.r_usuarios_persona.a_segundoApellido : ""} `,
                "fecha": el.dt_fechaRemision,
                "director": `${el.r_usuarios_director.a_primerNombre} ${el.r_usuarios_director.a_segundoNombre !== null ? el.r_usuarios_director.a_segundoNombre : ""} ${el.r_usuarios_director.a_primerApellido} ${el.r_usuarios_director.a_segundoApellido !== null ? el.r_usuarios_director.a_segundoApellido : ""}`,
                "elaborado_por": `${el.r_usuarios_elaboradoPor.a_primerNombre} ${el.r_usuarios_elaboradoPor.a_segundoNombre !== null ? el.r_usuarios_elaboradoPor.a_segundoNombre : ""} ${el.r_usuarios_elaboradoPor.a_primerApellido} ${el.r_usuarios_elaboradoPor.a_segundoApellido !== null ? el.r_usuarios_elaboradoPor.a_segundoApellido : ""}`,
                "destinatario": el.r_config_autoridad.a_titulo,
                "acciones": <span>
                    <a href={`http://179.0.29.155:8000/doc_remision/${el.id}/`}>
                        <span title="Imprimir">
                            <PrinterOutlined
                                style={{
                                    fontSize: "18px",
                                    marginRight: "20px"
                                }}
                            />
                        </span>
                    </a>
                    <span title="Eliminar">
                        <DeleteOutlined
                            onClick={() => eliminarRemision(el.id)}
                            style={{
                                fontSize: "18px",
                                color: 'red'
                            }}
                        />
                    </span>
                </span>
            })))
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
                        <MDBDataTable
                            hover
                            entriesOptions={[5, 15, 25]}
                            entries={15}
                            entriesLabel="Mostrar entradas"
                            searchLabel="Buscar"
                            infoLabel={["Mostrando", "a", "de", "entradas"]}
                            noRecordsFoundLabel="No se han encontrado registros."
                            paginationLabel={["Anterior", "Siguiente"]}
                            pagesAmount={4}
                            data={{
                                columns: headerTable,
                                rows: tableData
                            }}
                            fullPagination
                        />
                    </Card.Body>
                </Card>
            </Page>
        </Policy>
    );
};

export default ListadoRemisiones;
