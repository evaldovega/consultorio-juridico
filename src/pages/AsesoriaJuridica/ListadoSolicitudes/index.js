import { Typography, Input, Space } from "antd";
import {
  Table,
  Breadcrumb,
  Card,
  Button,
  Form,
  Pagination,
  Alert,
} from "react-bootstrap";
import { ExportToExcel } from "components/ExportToExcel";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API, { baseUrl } from "utils/Axios";
import Policy from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_DOCENTE,
  ROL_PERSONA,
  PAGE_SIZE,
} from "constants/apiContants";
import Spin from "components/Spin";
import moment from "moment";
import { FaEye, FaArrowUp } from "react-icons/fa";
import Filtros from "./Filtros";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";
import MigaPan from "components/MigaPan";

const ListadoSolicitudes = () => {
  const [docs, setDocs] = useState([]);
  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });
  const [orderByDate, setOrderByDate] = useState(false)

  const getSolicitudes = async () => {
    setCargando(true);
    API.get(`asesorias/solicitud/?${orderByDate ? 'date_reverse' : ''}`, { params })
      .then(({ data }) => {
        setDocs(data.results || []);
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
  
  const switchOrderDate = () => {
    setOrderByDate(!orderByDate)
    console.log(orderByDate)
    console.log("Hola")
  }

  useEffect(() => {
    getSolicitudes();
  }, []);
  useEffect(() => {
    getSolicitudes({});
  }, [params]);
  useEffect(() => {
    getSolicitudes({});
  }, [orderByDate])

  return (
    <Policy
      policy={[ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE, ROL_ESTUDIANTE, ROL_PERSONA]}
    >
      <Spin cargando={cargando}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanAsesoriaJuridica />
            <span>Todas las solicitudes o casos</span>
          </MigaPan>
          <Card>
            <Filtros params={params} setParams={setParams} />
            <Card.Body>
              {!cargando && !docs.length ? (
                <Alert variant="warning">No se encontraron registros</Alert>
              ) : (
                ""
              )}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No. caso</th>
                    <Policy
                      policy={[
                        ROL_ADMIN,
                        ROL_ASESOR,
                        ROL_DOCENTE,
                        ROL_ESTUDIANTE,
                      ]}
                    >
                      <th>Nombre y apellidos</th>
                      <th>Documento de identidad</th>
                    </Policy>
                    <th>Fecha <FaArrowUp onClick={() => switchOrderDate()} /></th>
                    <th>Asunto</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((d, i) => (
                    <tr key={i}>
                      <td>{d.id} </td>
                      <Policy
                        policy={[
                          ROL_ADMIN,
                          ROL_ASESOR,
                          ROL_DOCENTE,
                          ROL_ESTUDIANTE,
                        ]}
                      >
                        <td>
                          {d?.r_usuarios_solicitante?.a_primerNombre}{" "}
                          {d?.r_usuarios_solicitante?.a_segundoNombre}{" "}
                          {d?.r_usuarios_solicitante?.a_primerApellido}{" "}
                          {d?.r_usuarios_solicitante?.a_segundoApellido}
                        </td>
                        <td>{d?.r_usuarios_solicitante?.a_numeroDocumento}</td>
                      </Policy>
                      <td>
                        {d?.dt_fechaAsesoria
                          ? moment(d?.dt_fechaAsesoria).format("YYYY-MM-DD") +
                          " " +
                          d?.ht_horaAsesoria
                          : "No definida"}
                      </td>
                      <td className="crop">{d?.t_asuntoConsulta}</td>
                      <td>
                        <Link to={`/asesoria-juridica/caso/${d.id}`}>
                          <div className="circle-icon">
                            <FaEye />
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-center">
                <Link to="/" className="mr-4">
                  Volver al inicio
                </Link>
              </div>
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
                <a href={`${baseUrl}/exportar_casos_asesoria/`}>
                  <Button
                    variant="success"
                    size="sm"
                  >
                    Exportar a Excel
                  </Button>
                </a>
              ) : null}
            </Card.Footer>
          </Card>
        </Page>
      </Spin>
    </Policy>
  );
};

export default ListadoSolicitudes;
