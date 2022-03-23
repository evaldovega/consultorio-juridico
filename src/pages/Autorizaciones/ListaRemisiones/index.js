import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl } from "utils/Axios";
import {
  Breadcrumb,
  Card,
  Table,
  Form,
  Pagination,
  Alert,
  Button,
} from "react-bootstrap";
import { ExportToExcel } from "components/ExportToExcel";
import { Controller, useForm } from "react-hook-form";
import Spin from "components/Spin";

import Policy from "components/Policy";
import { ROL_ADMIN, PAGE_SIZE } from "constants/apiContants";
import { FaPrint, FaTrash, FaArrowUp } from "react-icons/fa";
import Filtros from "./Filtros";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";

const ListadoRemisiones = () => {
  const [docs, setDocs] = useState([]);
  const [cedulaEstudiante, setCedulaEstudiante] = useState("");

  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [paramsSerialized, setParamsSerialized] = useState("")
  const [orderByDate, setOrderByDate] = useState(false)
  const [orderByName, setOrderByName] = useState(false)
  const [orderByNum, setOrderByNum] = useState(false)
  const [orderByDestinatario, setOrderByDestinatario] = useState(false)

  const getRemisiones = async () => {
    setCargando(true);
    await API.get(`autorizaciones/remision/${orderByDate ? '?order_by_date' : ''}${orderByName ? '?order_by_name' : ''}${orderByDestinatario ? '?order_by_destinatario' : ''}${orderByNum ? '?order_by_num' : ''}`, { params })
      .then(({ data }) => {
        console.log(data.results)
        setDocs(data.results)
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
        let u = new URLSearchParams(params).toString();
        setParamsSerialized(u)
        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);
      });
  };

  const eliminarRemision = async (id_delete) => {
    if (window.confirm("¿Seguro que desea eliminar esta remisión?")) {
      API.delete(`autorizaciones/remision/${id_delete}/`).then((response) => {
        getRemisiones();
      });
    }
  };

  const exportToExcel = async () => {
    await API.get(`${baseUrl}/api/autorizaciones/remision/exportar/?${paramsSerialized}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      var FileSaver = require('file-saver');
      var blob = new Blob([response.data], { type: 'application/xlsx' });
      FileSaver.saveAs(blob, "Remisiones.xlsx");
    })
  }

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

  const switchOrderDate = () => {
    setOrderByDate(!orderByDate)
    setOrderByName(false)
    setOrderByDestinatario(false)
    setOrderByNum(false)
  }

  const switchOrderName = () => {
    setOrderByDate(false)
    setOrderByName(!orderByName)
    setOrderByDestinatario(false)
    setOrderByNum(false)
  }

  const switchOrderDestinatario = () => {
    setOrderByDate(false)
    setOrderByName(false)
    setOrderByDestinatario(!orderByDestinatario)
    setOrderByNum(false)
  }

  const switchOrderNum = () => {
    setOrderByDate(false)
    setOrderByName(false)
    setOrderByDestinatario(false)
    setOrderByNum(!orderByNum)
  }

  useEffect(() => {
    getRemisiones();
  }, [cedulaEstudiante]);

  useEffect(() => {
    getRemisiones();
  }, [params]);

  useEffect(() => {
    getRemisiones();
  }, [orderByDate]);

  useEffect(() => {
    getRemisiones();
  }, [orderByName]);

  useEffect(() => {
    getRemisiones();
  }, [orderByDestinatario]);

  useEffect(() => {
    getRemisiones();
  }, [orderByNum]);

  return (
    <Policy policy={[ROL_ADMIN]}>
      <Spin cargando={cargando}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanDocumentos />
            <span>Historico de remisiones</span>
          </MigaPan>
          <Card>
            <Card.Body style={{ overflow: "scroll" }}>
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Filtros setParams={setParams} params={params} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {/* <th>Número <FaArrowUp onClick={() => switchOrderNum()} /></th> */}
                    <th>Fecha<br /> (AAAA-MM-DD) <FaArrowUp onClick={() => switchOrderDate()} /></th>
                    <th>Destinatario <FaArrowUp onClick={() => switchOrderDestinatario()} /></th>
                    <th>Estudiante</th>
                    <th>Director</th>
                    <th>Elaborado por</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((el) => (
                    <tr>
                      <td>{el?.dt_fechaRemision}</td>
                      <td>{el?.a_dirigido} - {el?.r_config_autoridad?.a_titulo}</td>
                      <td>
                        {el.r_usuarios_estudiante ? (
                          <>
                          {el?.r_usuarios_estudiante?.r_usuarios_persona?.a_primerNombre}{" "}{el?.r_usuarios_estudiante?.r_usuarios_persona?.a_segundoNombre}{" "}
                          {el?.r_usuarios_estudiante?.r_usuarios_persona?.a_primerApellido}{" "}{el?.r_usuarios_estudiante?.r_usuarios_persona?.a_segundoApellido}
                          </>
                        ) : (
                          <i>Remisión hecha de forma masiva</i>
                        )}
                      </td>
                      <td>{el?.r_usuarios_director?.a_primerNombre} {el?.r_usuarios_director?.a_segundoNombre !== null
                        ? el?.r_usuarios_director?.a_segundoNombre
                        : ""
                      } {el?.r_usuarios_director?.a_primerApellido} {el?.r_usuarios_director?.a_segundoApellido !== null
                        ? el?.r_usuarios_director?.a_segundoApellido
                        : ""
                        }</td>
                      <td>{el?.r_usuarios_elaboradoPor?.a_primerNombre} {el?.r_usuarios_elaboradoPor?.a_segundoNombre !== null
                        ? el?.r_usuarios_elaboradoPor?.a_segundoNombre
                        : ""
                      } {el?.r_usuarios_elaboradoPor?.a_primerApellido} {el?.r_usuarios_elaboradoPor?.a_segundoApellido !== null
                        ? el?.r_usuarios_elaboradoPor?.a_segundoApellido
                        : ""
                        }</td>
                      <td><div className="d-flex justify-content-between">
                        <a target="_blank" href={`${baseUrl}/doc_remision/${el?.id}/`}>
                          <Button variant="primary">
                            <FaPrint />
                          </Button>
                        </a>
                        <Button
                          variant="danger"
                          onClick={() => eliminarRemision(el?.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div></td>
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
                    setParams({
                      ...params,
                      page: 1,
                      page_size: e.target.value,
                    })
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
              {docs.length > 0 ? (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => exportToExcel()}
                >
                  Exportar a Excel
                </Button>
              ) : null}
            </Card.Footer>
          </Card>
        </Page>
      </Spin>
    </Policy>
  );
};

export default ListadoRemisiones;
