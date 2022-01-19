import Page from "components/Page";
import Policy from "components/Policy";
import {
  PAGE_SIZE,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "constants/apiContants";
import Spin from "components/Spin";
import { useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
  Alert,
} from "react-bootstrap";
import { ExportToExcel } from "components/ExportToExcel";
import { Link } from "react-router-dom";
import API from "utils/Axios";
import { useEffect } from "react";
import { FaEye, FaPenAlt, FaArrowUp } from "react-icons/fa";
import CentroDeConciliacionDetalle from "../Detalle";
import Filtros from "./Filtros";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanConciliacion from "components/MigaPan/CentroConciliacion";

const CentroDeConciliacionListado = () => {
  const [cargando, setCargando] = useState(false);
  const [docs, setDocs] = useState([]);
  const [id, setId] = useState(null);
  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [orderByDate, setOrderByDate] = useState(false)

  const cargar = async () => {
    try {
      setCargando(true);
      const { data } = await API.get(`/conciliacion/solicitud/?${orderByDate ? 'date_reverse' : ''}`, { params });
      setDocs(data.results || []);
      setPaginacion({ paginas: data.total_pages, registros: data.count });
      setLinks(data.links);
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
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

  const switchOrderDate = () => {
    setOrderByDate(!orderByDate)
    console.log(orderByDate)
    console.log("Hola")
  }

  useEffect(() => {
    const ids = sessionStorage.getItem("conciliacion");
    if (ids) {
      sessionStorage.removeItem("conciliacion");
      setId(ids);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [params]);

  useEffect(() => {
    cargar();
  }, [orderByDate]);

  return (
    <Policy
      policy={[ROL_ESTUDIANTE, ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE, ROL_PERSONA]}
    >
      <Page>
        <CentroDeConciliacionDetalle
          id={id}
          setId={setId}
          onHide={() => setId(null)}
        />
        <Spin cargando={cargando}>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanConciliacion />
            <span>Todas las conciliaciones</span>
          </MigaPan>

          <Card>
            <Card.Body>
              <Filtros
                setParams={setParams}
                params={params}
                cargando={cargando}
              />
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table>
                <thead>
                  <tr>
                    <th>Fecha solicitud <FaArrowUp onClick={() => switchOrderDate()} /></th>
                    <th>Resumen</th>
                    <th>Intenciones</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d) => (
                    <tr>
                      <td>{d.d_fechaSolicitud}</td>
                      <td className="crop">{d.t_resumenHechos}</td>
                      <td className="crop">{d.c_intencionSolicitante}</td>
                      <td>
                        <div className="d-flex justify-content-end">
                          <div
                            className="circle-icon mr-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => setId(d.id)}
                          >
                            <FaEye />
                          </div>

                          <Policy policy={[ROL_ASESOR, ROL_ADMIN]}>
                            <Link
                              to={`/centro-de-conciliacion/registrar/${d.id}`}
                            >
                              <div className="circle-icon">
                                <FaPenAlt />
                              </div>
                            </Link>
                          </Policy>
                        </div>
                      </td>
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
              <ExportToExcel apiData={docs} fileName="documento" />
            </Card.Footer>
          </Card>
        </Spin>
      </Page>
    </Policy>
  );
};

export default CentroDeConciliacionListado;
