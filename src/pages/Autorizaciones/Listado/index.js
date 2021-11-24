import { Button, Input, Space, Form } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import { Breadcrumb, Card, Table, Spinner } from "react-bootstrap";

import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Policy from "components/Policy";
import { ROL_ASESOR } from "constants/apiContants";

const ListadoAutorizaciones = () => {
    const [docs, setDoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    const getAutorizaciones = async () => {
        API.get("autorizaciones/autorizacion").then((response) => {
            console.log(JSON.stringify(response.data));
            setDoc(response.data);
        });
    };

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

    useEffect(() => {
        setTimeout(() => {
            getAutorizaciones();
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Policy policy={[]}>
            <Page>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/autorizaciones">Autorizaciones</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Listado de autorizaciones</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <Card.Body>
                        <h2 className="title-line" style={{marginTop: 10}}>
                            <span>Listado de autorizaciones</span>
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
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>No. radicado</th>
                                    <th>Fecha de proceso<br /> <small>(AAAA-MM-DD)</small></th>
                                    <th>Nombre del poderante</th>
                                    <th>Tipo de proceso</th>
                                    <th>Imprimir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {docs.map((d) => (
                                    <tr>
                                        <td>{d.a_numeroRadicado}</td>
                                        <td>{d.dt_fechaProceso}</td>
                                        <td>{d.a_nombrePoderante}</td>
                                        <td>{d.a_proceso}</td>
                                        <td>
                                            <a href={`localhost:8000/doc_autorizacion/${d.id}/`}>
                                                <PrinterOutlined />
                                            </a>
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

export default ListadoAutorizaciones;
