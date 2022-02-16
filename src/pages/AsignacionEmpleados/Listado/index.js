import { Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import {
  Breadcrumb,
  Card,
  Table,
  Pagination,
  Button,
  Form,
  Alert,
} from "react-bootstrap";

import { SearchOutlined, PrinterOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Policy from "components/Policy";
import { ROL_ADMIN, PAGE_SIZE } from "constants/apiContants";
import Spin from "components/Spin";
import AsignacionesFiltros from "./Filtros";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsignacionDocentes from "components/MigaPan/AsignacionDocentes";

const ListadoAsignaciones = () => {
  const [docs, setDoc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });

  const getAutorizaciones = async () => {
    setLoading(true);
    API.get("asignacion/empleados/", { params })
      .then(({ data }) => {
        console.log(data);
        setDoc(data.results);
        setTotalRegistros(data.count || 0);
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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

  const next = () => {
    const page = links.next.match(/page=[0-9]+/);
    console.log(page);
    setParams({ ...params, page: page[0].split("=")[1] });
  };
  const prev = () => {
    const text = links.previous.match(/page=[0-9]+/);
    const page = text ? text[0].split("=")[1] : 1;
    setParams({ ...params, page });
  };
  const calcularPaginas = () => {
    if (paginacion && docs.length) {
      let startPage, endPage;
      if (paginacion.paginas <= 10) {
        startPage = 1;
        endPage = paginacion.paginas;
      } else {
        if (params.page <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (params.page + 4 >= paginacion.paginas) {
          startPage = paginacion.paginas - 9;
          endPage = paginacion.paginas;
        } else {
          startPage = params.page - 5;
          endPage = params.page + 4;
        }
      }
      const paginas = [];
      console.log(startPage, endPage);
      for (let i = startPage; i <= endPage; i++) {
        paginas.push(i);
      }
      return paginas.map((i) => {
        const p = { active: i == params.page };
        if (!p.active) {
          p.onClick = () => {
            setParams({ ...params, page: i });
          };
        }
        return <Pagination.Item {...p}>{i}</Pagination.Item>;
      });
    }
  };

  useEffect(() => {
    getAutorizaciones();
  }, []);
  useEffect(() => {
    getAutorizaciones();
  }, [params]);
  return (
    <Policy policy={[ROL_ADMIN]}>
      <Spin cargando={loading}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanAsignacionDocentes />
            <span>Listado de asignaciones</span>
          </MigaPan>

          <Card>
            <Card.Body>
              <AsignacionesFiltros
                docs={docs}
                totalRegistros={totalRegistros}
                params={params}
                setParams={setParams}
              />
              {!loading && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No. radicado</th>
                    <th colSpan={2}>Docente</th>
                    <th>Año de validez</th>
                    <th>Semestre de validez</th>
                    <th>Jornada</th>
                    <th>Consultorio</th>
                    <th>Grupo</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d) => (
                    <tr>
                      <td>
                        <Link to={`/asignacion-docentes/asignar/${d.id}`}>
                          {d.id}
                        </Link>
                      </td>
                      <td>
                        {d?.r_usuarios_persona?.a_primerNombre}{" "}
                        {d?.r_usuarios_persona?.a_segundoNombre}{" "}
                        {d?.r_usuarios_persona?.a_primerApellido}{" "}
                        {d?.r_usuarios_persona?.a_segundoApellido}
                      </td>
                      <td>{d?.r_usuarios_persona?.a_numeroDocumento}</td>
                      <td>{d.a_anioValidez}</td>
                      <td>{d.a_semestreValidez}</td>
                      <td>{d?.r_config_jornadaValidez?.a_titulo}</td>
                      <td>{d?.r_config_numeroConsultorio?.a_titulo}</td>
                      <td>{d?.r_config_grupo?.a_titulo}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Form.Group className="d-flex align-items-center">
                <Form.Label>Número de registros</Form.Label>&nbsp;
                <Form.Control
                  as="select"
                  style={{ width: 150 }}
                  onChange={(e) =>
                    setParams({ ...params, page: 1, page_size: e.target.value })
                  }
                >
                  <option value={10} selected={params.page_size == 10}>
                    10
                  </option>
                  <option value={50} selected={params.page_size == 50}>
                    50
                  </option>
                  <option value={100} selected={params.page_size == 100}>
                    100
                  </option>
                  <option value={500} selected={params.page_size == 500}>
                    500
                  </option>
                </Form.Control>
              </Form.Group>
              <Pagination>
                {links && links.previous ? (
                  <Pagination.Prev onClick={prev} />
                ) : (
                  <Pagination.Prev disabled />
                )}
                {calcularPaginas()}
                {links && links.next ? (
                  <Pagination.Next onClick={next} />
                ) : (
                  <Pagination.Next disabled />
                )}
              </Pagination>
              <strong>Registros encontrados {totalRegistros || 0}</strong>
            </Card.Footer>
          </Card>
        </Page>
      </Spin>
    </Policy>
  );
};

export default ListadoAsignaciones;
