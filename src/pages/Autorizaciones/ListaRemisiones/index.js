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
  Form,
  Pagination,
  Alert,
} from "react-bootstrap";
import { ExportToExcel } from "components/ExportToExcel";
import { Controller, useForm } from "react-hook-form";
import Spin from "components/Spin";

import {
  SearchOutlined,
  PrinterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Policy from "components/Policy";
import { ROL_ADMIN, PAGE_SIZE } from "constants/apiContants";

const ListadoRemisiones = () => {
  const [docs, setDocs] = useState([]);
  const [cedulaEstudiante, setCedulaEstudiante] = useState("");

  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });

  const getRemisiones = async () => {
    setCargando(true);
    await API.get("autorizaciones/remision/", { params })
      .then(({ data }) => {
        setDocs(
          data.results.map((el) => ({
            numero: (
              <a target="_blank" href={`${baseUrl}/generar-remision/${el.id}`}>
                {el.a_numeroRemision}
              </a>
            ),
            periodo: `${el.r_usuarios_estudiante.a_anioInscripcion}-${el.r_usuarios_estudiante.a_semestreInscripcion}`,
            documento:
              el.r_usuarios_estudiante.r_usuarios_persona.a_numeroDocumento,
            nombre_estudiante: `${
              el.r_usuarios_estudiante.r_usuarios_persona.a_primerNombre
            } ${
              el.r_usuarios_estudiante.r_usuarios_persona.a_segundoNombre !==
              null
                ? el.r_usuarios_estudiante.r_usuarios_persona.a_segundoNombre
                : ""
            } ${el.r_usuarios_estudiante.r_usuarios_persona.a_primerApellido} ${
              el.r_usuarios_estudiante.r_usuarios_persona.a_segundoApellido !==
              null
                ? el.r_usuarios_estudiante.r_usuarios_persona.a_segundoApellido
                : ""
            } `,
            fecha: el.dt_fechaRemision,
            director: `${el.r_usuarios_director.a_primerNombre} ${
              el.r_usuarios_director.a_segundoNombre !== null
                ? el.r_usuarios_director.a_segundoNombre
                : ""
            } ${el.r_usuarios_director.a_primerApellido} ${
              el.r_usuarios_director.a_segundoApellido !== null
                ? el.r_usuarios_director.a_segundoApellido
                : ""
            }`,
            elaborado_por: `${el.r_usuarios_elaboradoPor.a_primerNombre} ${
              el.r_usuarios_elaboradoPor.a_segundoNombre !== null
                ? el.r_usuarios_elaboradoPor.a_segundoNombre
                : ""
            } ${el.r_usuarios_elaboradoPor.a_primerApellido} ${
              el.r_usuarios_elaboradoPor.a_segundoApellido !== null
                ? el.r_usuarios_elaboradoPor.a_segundoApellido
                : ""
            }`,
            destinatario: el.r_config_autoridad.a_titulo,
            acciones: (
              <span>
                <a target="_blank" href={`${baseUrl}/doc_remision/${el.id}/`}>
                  <span title="Imprimir">
                    <PrinterOutlined
                      style={{
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    />
                  </span>
                </a>
                <span title="Eliminar">
                  <DeleteOutlined
                    onClick={() => eliminarRemision(el.id)}
                    style={{
                      fontSize: "18px",
                      color: "red",
                    }}
                  />
                </span>
              </span>
            ),
          }))
        );
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
        setCargando(false);
      })
      .catch((error) => {
        setCargando(false);
      });
  };

  const eliminarRemision = async (id_delete) => {
    if (window.confirm("¿Seguro que desea eliminar esta remisión?")) {
      API.delete(`autorizaciones/remision/${id_delete}/`).then((response) => {
        window.location.reload();
      });
    }
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
    getRemisiones();
  }, [cedulaEstudiante]);
  useEffect(() => {
    getRemisiones();
  }, [params]);
  return (
    <Policy policy={[ROL_ADMIN]}>
      <Spin cargando={cargando}>
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
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Periodo</th>
                    <th>Documento de identidad</th>
                    <th>Nombres del estudiante</th>
                    <th>Fecha</th>
                    <th>Director</th>
                    <th>Elaborado por</th>
                    <th>Destinatario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d) => (
                    <tr>
                      <td>{d.numero}</td>
                      <td>{d.periodo}</td>
                      <td>{d.documento}</td>
                      <td>{d.nombre_estudiante}</td>
                      <td>{d.fecha}</td>
                      <td>{d.director}</td>
                      <td>{d.elaborado_por}</td>
                      <td>{d.destinatario}</td>
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

export default ListadoRemisiones;
