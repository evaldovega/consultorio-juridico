import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import {
  Breadcrumb,
  Card,
  Table,
  Pagination,
  Form,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";

import Policy from "components/Policy";
import {
  ROL_ASESOR,
  ROL_ADMIN,
  ROL_DOCENTE,
  PAGE_SIZE,
} from "constants/apiContants";

import moment from "moment";
import InscripcionesFiltros from "./Filtros";
import Spin from "components/Spin";
import { FaPenAlt } from "react-icons/fa";

const ListadoIncripciones = () => {
  const [docs, setDocs] = useState([]);
  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [discapacidades, setDiscapacidades] = useState([]);

  const getInscripciones = async () => {
    try {
      setCargando(true);
      const { data } = await API.get("estudiantes/inscripcion/", { params });
      setDocs(data.results || []);
      setTotalRegistros(data.count || 0);
      setPaginacion({ paginas: data.total_pages, registros: data.count });
      setLinks(data.links);
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };
  const cargarDiscapacidades = () => {
    API("configuracion/discapacidad/").then(({ data }) => {
      setDiscapacidades(
        data.map((el) => ({ label: el.a_titulo, value: el.id }))
      );
    });
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
    cargarDiscapacidades();
    if (sessionStorage.getItem("inscripcion")) {
      setParams({
        ...params,
        codestudiante: sessionStorage.getItem("inscripcion"),
      });
      sessionStorage.removeItem("inscripcion");
    } else {
      getInscripciones({});
    }
  }, []);

  useEffect(() => {
    getInscripciones({});
  }, [params]);

  return (
    <Policy policy={[ROL_ASESOR, ROL_ADMIN, ROL_DOCENTE]}>
      <Page>
        <Spin cargando={cargando}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/inscripcion-estudiantes">Inscripción estudiantes</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Listado de incripciones</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <Card.Body>
              <InscripcionesFiltros
                totalRegistros={totalRegistros}
                params={params}
                setParams={setParams}
                discapacidades={discapacidades}
                docs={docs}
              />
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Identificación</th>
                    <th>Código estudiante</th>
                    <th>Estudiante</th>

                    <th>Año</th>
                    <th>Fecha inscripción</th>
                    <th>Semestre inscripción</th>

                    <th>Consultorio</th>
                    <th>Turno</th>
                    <th>Discapacidades</th>
                    <Policy policy={[ROL_ADMIN]}>
                      <th></th>
                    </Policy>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d) => (
                    <tr>
                      <td>{d?.r_usuarios_persona?.a_numeroDocumento}</td>
                      <td>{d.a_codigoEstudiantil}</td>
                      <td>
                        {d.r_usuarios_persona.a_primerNombre}{" "}
                        {d.r_usuarios_persona.a_primerApellido}
                      </td>

                      <td>{d.a_anioInscripcion}</td>
                      <td>
                        {moment(d.dt_fechaInscripcion).format("YYYY-MM-DD")}
                      </td>
                      <td>{d.a_semestreInscripcion}</td>

                      <td>
                        {d?.r_config_numeroConsultorio?.a_titulo ||
                          "No especificado"}
                      </td>
                      <td>{d.a_turno}</td>
                      <td>
                        {d?.r_usuarios_persona?.mm_discapacidad.map((di) => {
                          const _d = discapacidades.find(
                            (di2) => di2.value == parseInt(di)
                          );
                          return _d ? (
                            <Badge variant="danger" className="mr-1">
                              {_d.label}
                            </Badge>
                          ) : (
                            ""
                          );
                        })}
                      </td>
                      <Policy policy={[ROL_ADMIN]}>
                        <Link
                          to={`/inscripcion-estudiantes/inscripcion-practicas/${d.id}`}
                        >
                          <Button variant="link">
                            <FaPenAlt />
                          </Button>
                        </Link>
                      </Policy>
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
        </Spin>
      </Page>
    </Policy>
  );
};

export default ListadoIncripciones;
