import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl } from "utils/Axios";
import {
  Breadcrumb,
  Card,
  Table,
  Pagination,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import { ExportToExcel } from "components/ExportToExcel";
import { FaPrint, FaTrash, FaArrowUp } from "react-icons/fa";
import Policy from "components/Policy";
import { ROL_ASESOR, ROL_ADMIN, PAGE_SIZE } from "constants/apiContants";
import Spin from "components/Spin";
import Filtros from "./Filtros";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanDocumentos from "components/MigaPan/Documentos";

const ListadoAutorizaciones = () => {
  const [docs, setDocs] = useState([]);

  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [orderByDate, setOrderByDate] = useState(false)
  const [orderByName, setOrderByName] = useState(false)
  const [paramsSerialized, setParamsSerialized] = useState("")

  const getAutorizaciones = async () => {
    setCargando(true);
    API.get(`autorizaciones/autorizacion${orderByDate ? '?order_by_date' : ''}${orderByName ? '?order_by_name' : ''}`, { params })
      .then(({ data }) => {
        setDocs(
          data.results.map((d) => ({
            nombres_apellidos: `${d.r_estudiante.r_usuarios_persona.a_primerNombre} ${d.r_estudiante.r_usuarios_persona.a_segundoNombre} ${d.r_estudiante.r_usuarios_persona.a_primerApellido} ${d.r_estudiante.r_usuarios_persona.a_segundoApellido}`,
            documento: d.r_estudiante.r_usuarios_persona.a_numeroDocumento,
            clase_proceso: d.a_proceso,
            fecha: d.dt_fechaProceso,
            nro_autorizacion: d.a_numeroRadicado,
            observaciones: d.t_observaciones,
            acciones: (
              <div className="d-flex justify-content-between">
                <a
                  target="_blank"
                  href={`${baseUrl}/doc_autorizacion/${d.id}/`}
                >
                  <Button variant="primary">
                    <FaPrint />
                  </Button>
                </a>
                <Button
                  variant="danger"
                  onClick={() => eliminarAutorizacion(d.id)}
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
      .finally(() => setCargando(false));
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

  const eliminarAutorizacion = async (id_delete) => {
    if (window.confirm("¿Seguro quieres borrar este registro?")) {
      API.delete(`autorizaciones/autorizacion/${id_delete}/`).then(
        (response) => {
          window.location.reload();
        }
      );
    }
  };

  const exportToExcel = async () => {
    await API.get(`${baseUrl}/api/autorizaciones/autorizacion/exportar/?${paramsSerialized}`, {
      responseType: 'arraybuffer',
    }).then((response) => {
      var FileSaver = require('file-saver');
      var blob = new Blob([response.data], { type: 'application/xlsx' });
      FileSaver.saveAs(blob, "Autorizaciones.xlsx");
    })
  }

  const switchOrderDate = () => {
    setOrderByDate(!orderByDate)
    setOrderByName(false)
  }

  const switchOrderName = () => {
    setOrderByDate(false)
    setOrderByName(!orderByName)
  }

  useEffect(() => {
    getAutorizaciones();
  }, []);

  useEffect(() => {
    getAutorizaciones({});
  }, [params]);

  useEffect(() => {
    getAutorizaciones({});
  }, [orderByDate]);

  useEffect(() => {
    getAutorizaciones({});
  }, [orderByName]);

  return (
    <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
      <Spin cargando={cargando}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanDocumentos />
            <span>Listado de autorizaciones</span>
          </MigaPan>
          <Card>
            <Card.Body style={{overflow: "scroll"}}>
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Filtros params={params} setParams={setParams} />
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Nombres y apellidos <FaArrowUp onClick={() => switchOrderName()} /></th>
                    <th>Documento de identidad</th>
                    <th>Clase proceso</th>
                    <th>Fecha de proceso <FaArrowUp onClick={() => switchOrderDate()} /></th>
                    <th>No. autorizacion</th>
                    <th>Observaciones</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d) => (
                    <tr>
                      <td>{d.nombres_apellidos}</td>
                      <td>{d.documento}</td>
                      <td>{d.clase_proceso}</td>
                      <td>{d.fecha}</td>
                      <td>{d.nro_autorizacion}</td>
                      <td>{d.observaciones}</td>
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

export default ListadoAutorizaciones;
