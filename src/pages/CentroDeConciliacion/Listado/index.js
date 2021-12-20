import Page from "components/Page";
import Policy from "components/Policy";
import {
  PAGE_SIZE,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
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
import { FaEye, FaPenAlt } from "react-icons/fa";
import CentroDeConciliacionDetalle from "../Detalle";
import Filtros from "./Filtros";

const CentroDeConciliacionListado = () => {
  const [cargando, setCargando] = useState(false);
  const [docs, setDocs] = useState([]);
  const [id, setId] = useState(null);
  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });

  const cargar = async () => {
    try {
      setCargando(true);
      const { data } = await API.get("/conciliacion/solicitud/", { params });
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

  useEffect(() => {
    cargar();
  }, [params]);

  return (
    <Policy policy={[ROL_ESTUDIANTE, ROL_ADMIN, ROL_ASESOR]}>
      <Page>
        <CentroDeConciliacionDetalle
          id={id}
          setId={setId}
          onHide={() => setId(null)}
        />
        <Spin cargando={cargando}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/centro-de-conciliacion">Centro de conciliación</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Casos</Breadcrumb.Item>
          </Breadcrumb>

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
                    <th>Fecha solicitud</th>
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
                          <Button
                            variant="primary"
                            className="mr-1"
                            onClick={() => setId(d.id)}
                          >
                            <FaEye />
                          </Button>
                          <Policy policy={[ROL_ASESOR, ROL_ADMIN]}>
                            <Link
                              to={`/centro-de-conciliacion/registrar/${d.id}`}
                            >
                              <Button variant="primary">
                                <FaPenAlt />
                              </Button>
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
