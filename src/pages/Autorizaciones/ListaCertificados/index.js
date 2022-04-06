import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl } from "utils/Axios";
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Table,
  Alert,
  Pagination,
  Form,
  Button,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaPrint, FaTrash, FaArrowUp } from "react-icons/fa";
import Policy from "components/Policy";
import { ROL_ASESOR, ROL_ADMIN, PAGE_SIZE } from "constants/apiContants";
import { ExportToExcel } from "components/ExportToExcel";
import Spin from "components/Spin";
import Filtros from "./Filtros";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";

const ListadoCertificados = () => {
  const [docs, setDocs] = useState([]);

  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [paramsSerialized, setParamsSerialized] = useState("")
  const [orderByDate, setOrderByDate] = useState(false)
  const [orderByName, setOrderByName] = useState(false)

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

  const getCertificados = async () => {
    setCargando(true);
    await API.get(`autorizaciones/certificacion/${orderByDate ? '?order_by_date' : ''}${orderByName ? '?order_by_name' : ''}`, { params })
      .then(({ data }) => {
        setDocs(
          data.results.map((el) => ({
            nombre_estudiante: (
              <a href={`/autorizaciones/generar-certificado/${el.id}`}>
                {el?.r_usuarios_estudiante?.a_primerNombre}{" "}
                {el?.r_usuarios_estudiante?.a_segundoNombre}{" "}
                {el?.r_usuarios_estudiante?.a_primerApellido}{" "}
                {el?.r_usuarios_estudiante?.a_segundoApellido}
              </a>
            ),
            documento: el?.r_usuarios_estudiante?.a_numeroDocumento,
            elaborado_por: `${el?.r_usuarios_elaboradoPor?.a_primerNombre} ${el?.r_usuarios_elaboradoPor?.a_segundoNombre} ${el?.r_usuarios_elaboradoPor?.a_primerApellido} ${el?.r_usuarios_elaboradoPor?.a_segundoApellido}`,
            director: `${el?.r_usuarios_director?.a_primerNombre} ${el?.r_usuarios_director?.a_segundoNombre} ${el?.r_usuarios_director?.a_primerApellido} ${el?.r_usuarios_director?.a_segundoApellido}`,
            fecha: el?.dt_fechaProceso,
            acciones: (
              <div className="d-flex justify-content-between">
                <a href={`${baseUrl}/doc_certificacion/${el.id}/`}>
                  <Button variant="primary">
                    <FaPrint />
                  </Button>
                </a>
                <Button
                  variant="danger"
                  onClick={() => eliminarCertificado(el.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            ),
          }))
        );
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
        let u = new URLSearchParams(params).toString();
        setParamsSerialized(u)
        setCargando(false);
      })
      .catch((error) => {
        console.log(error);
        setCargando(false);
      });
  };

  const eliminarCertificado = async (id_delete) => {
    if (window.confirm("¿Seguro quieres borrar este registro?")) {
      API.delete(`autorizaciones/certificacion/${id_delete}/`).then(
        (response) => {
          window.location.reload();
        }
      );
    }
  };

  const exportToExcel = async () => {
    await API.get(`${baseUrl}/api/autorizaciones/certificacion/exportar/?${paramsSerialized}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      var FileSaver = require('file-saver');
      var blob = new Blob([response.data], { type: 'application/xlsx' });
      FileSaver.saveAs(blob, "Certificados.xlsx");
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

  const switchOrderDate = () => {
    setOrderByDate(!orderByDate)
    setOrderByName(false)
  }

  const switchOrderName = () => {
    setOrderByDate(false)
    setOrderByName(!orderByName)
  }

  useEffect(() => {
    getCertificados();
  }, []);

  useEffect(() => {
    getCertificados();
  }, [params]);

  useEffect(() => {
    getCertificados();
  }, [orderByDate]);

  useEffect(() => {
    getCertificados();
  }, [orderByName]);

  return (
    <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
      <Spin cargando={cargando}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanDocumentos />
            <span>Historico de certificados</span>
          </MigaPan>

          <Card>
            <Card.Body style={{overflow: "scroll"}}>
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Filtros setParams={setParams} params={params} />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre del estudiante <FaArrowUp onClick={() => switchOrderName()} /></th>
                    <th>Documento de identidad</th>
                    <th>Elaborado por</th>
                    <th>Director</th>
                    <th>Fecha <FaArrowUp onClick={() => switchOrderDate()} /></th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d) => (
                    <tr>
                      <td>{d.nombre_estudiante}</td>
                      <td>{d.documento}</td>
                      <td>{d.elaborado_por}</td>
                      <td>{d.director}</td>
                      <td>{d.fecha}</td>
                      <td>{d.acciones}</td>
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

export default ListadoCertificados;
