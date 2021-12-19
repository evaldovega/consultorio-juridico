import { Button, Input, Space } from "antd";
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
} from "react-bootstrap";
import { ExportToExcel } from "components/ExportToExcel";
import {
  SearchOutlined,
  PrinterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Policy from "components/Policy";
import { ROL_ASESOR, ROL_ADMIN, PAGE_SIZE } from "constants/apiContants";
import Spin from "components/Spin";

const ListadoAutorizaciones = () => {
  const [docs, setDocs] = useState([]);

  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });

  const getAutorizaciones = async () => {
    setCargando(true);
    API.get("autorizaciones/autorizacion", { params })
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
              <span>
                <a
                  target="_blank"
                  href={`${baseUrl}/doc_autorizacion/${d.id}/`}
                >
                  <PrinterOutlined
                    style={{
                      marginRight: "20px",
                      fontSize: "20px",
                    }}
                  />
                </a>
                <DeleteOutlined
                  onClick={() => eliminarAutorizacion(d.id)}
                  style={{
                    fontSize: "20px",
                    color: "red",
                  }}
                />
              </span>
            ),
          }))
        );
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
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

  useEffect(() => {
    getAutorizaciones();
  }, []);

  useEffect(() => {
    getAutorizaciones({});
  }, [params]);

  return (
    <Policy policy={[ROL_ADMIN, ROL_ASESOR]}>
      <Spin cargando={cargando}>
        <Page>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/autorizaciones">Documentos</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Listado de autorizaciones</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <Card.Body>
              <h2 className="title-line" style={{ marginTop: 10 }}>
                <span>Listado de autorizaciones</span>
              </h2>
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombres y apellidos</th>
                    <th>Documento de identidad</th>
                    <th>Clase proceso</th>
                    <th>Fecha de proceso</th>
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
                <ExportToExcel apiData={docs} fileName="documento" />
              ) : null}
            </Card.Footer>
          </Card>
        </Page>
      </Spin>
    </Policy>
  );
};

export default ListadoAutorizaciones;
