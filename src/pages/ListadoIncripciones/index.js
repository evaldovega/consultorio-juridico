import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl }  from "utils/Axios";
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
import { FaPenAlt, FaArrowUp } from "react-icons/fa";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";

const ListadoIncripciones = () => {
  const [docs, setDocs] = useState([]);
  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [discapacidades, setDiscapacidades] = useState([]);
  const [orderByDate, setOrderByDate] = useState(false)
  const [orderByName, setOrderByName] = useState(false)
  const [orderByYear, setOrderByYear] = useState(false)
  const [orderByDocument, setOrderByDocument] = useState(false)
  const [orderByCode, setOrderByCode] = useState(false)
  const [orderBySemester, setOrderBySemester] = useState(false)
  const [paramsSerialized, setParamsSerialized] = useState("")

  const getInscripciones = async () => {
    try {
      setCargando(true);
      const { data } = await API.get(`estudiantes/inscripcion/${orderByDate ? '?order_by_date' : ''}${orderByName ? '?name_reverse' : ''}${orderByYear ? '?year_reverse' : ''}${orderByDocument ? '?document_reverse' : ''}${orderByCode ? '?code_reverse' : ''}${orderBySemester ? '?semester_reverse' : ''}`, { params });
      setDocs(data.results || []);
      setTotalRegistros(data.count || 0);
      setPaginacion({ paginas: data.total_pages, registros: data.count });
      setLinks(data.links);
      setCargando(false);
      let u = new URLSearchParams(params).toString();
      setParamsSerialized(u)
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

  const exportToExcel = async () => {
    await API.post(`${baseUrl}/api/estudiantes/inscripcion/exportar/?${paramsSerialized}`, { "1": "2" }, {
      responseType: 'arraybuffer',
    }).then((response) => {
      var FileSaver = require('file-saver');
      var blob = new Blob([response.data], { type: 'application/xlsx' });
      FileSaver.saveAs(blob, "inscripcion-estudiantes.xlsx");
    })
  }

  const switchOrderDate = () => {
    setOrderByDate(!orderByDate)
    setOrderByName(false)
    setOrderByYear(false)
    setOrderByDocument(false)
    setOrderByCode(false)
    setOrderBySemester(false)
  }

  const switchOrderName = () => {
    setOrderByDate(false)
    setOrderByName(!orderByName)
    setOrderByYear(false)
    setOrderByDocument(false)
    setOrderByCode(false)
    setOrderBySemester(false)
  }

  const switchOrderYear = () => {
    setOrderByDate(false)
    setOrderByName(false)
    setOrderByYear(!orderByYear)
    setOrderByDocument(false)
    setOrderByCode(false)
    setOrderBySemester(false)
  }

  const switchOrderDocument = () => {
    setOrderByDate(false)
    setOrderByName(false)
    setOrderByYear(false)
    setOrderByDocument(!orderByDocument)
    setOrderByCode(false)
    setOrderBySemester(false)
  }

  const switchOrderCode = () => {
    setOrderByDate(false)
    setOrderByName(false)
    setOrderByYear(false)
    setOrderByDocument(false)
    setOrderByCode(!orderByCode)
    setOrderBySemester(false)
  }

  const switchOrderSemester = () => {
    setOrderByDate(false)
    setOrderByName(false)
    setOrderByYear(false)
    setOrderByDocument(false)
    setOrderByCode(false)
    setOrderBySemester(!orderBySemester)
  }

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

  useEffect(() => {
    getInscripciones({});
  }, [orderByDate]);

  useEffect(() => {
    getInscripciones({});
  }, [orderByName]);

  useEffect(() => {
    getInscripciones({});
  }, [orderByYear]);

  useEffect(() => {
    getInscripciones({});
  }, [orderByDocument]);

  useEffect(() => {
    getInscripciones({});
  }, [orderByCode]);

  useEffect(() => {
    getInscripciones({});
  }, [orderBySemester]);

  return (
    <Policy policy={[ROL_ASESOR, ROL_ADMIN, ROL_DOCENTE]}>
      <Page>
        <Spin cargando={cargando}>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanInscripcionEstudiante />
            <span>Todas las inscripciones</span>
          </MigaPan>

          <Card>
            <InscripcionesFiltros
              totalRegistros={totalRegistros}
              params={params}
              setParams={setParams}
              discapacidades={discapacidades}
              docs={docs}
            />
            <Card.Body>
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Identificación <FaArrowUp onClick={() => switchOrderDocument()} /></th>
                    <th>Código estudiante <FaArrowUp onClick={() => switchOrderCode()} /></th>
                    <th>Estudiante <FaArrowUp onClick={() => switchOrderName()} /></th>

                    <th>Año <FaArrowUp onClick={() => switchOrderYear()} /></th>
                    <th>
                      Fecha inscripción
                      <FaArrowUp onClick={() => switchOrderDate()} />
                    </th>
                    <th>Semestre inscripción <FaArrowUp onClick={() => switchOrderSemester()} /></th>

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
                    <tr key={d.id}>
                      <td>{d?.r_usuarios_persona?.a_numeroDocumento}</td>
                      <td>{d.a_codigoEstudiantil}</td>
                      <td>
                        {d.r_usuarios_persona.a_primerNombre}{" "}
                        {d.r_usuarios_persona.a_segundoNombre}{" "}
                        {d.r_usuarios_persona.a_primerApellido}{" "}
                        {d.r_usuarios_persona.a_segundoApellido}
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
                      <td>{d.a_turno || "No especificado"}</td>
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
                        <td>
                          <Link
                            to={`/inscripcion-estudiantes/inscripcion-practicas/${d.id}`}
                          >
                            <div className="circle-icon">
                              <FaPenAlt />
                            </div>
                          </Link>
                        </td>
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
        </Spin>
      </Page>
    </Policy>
  );
};

export default ListadoIncripciones;
