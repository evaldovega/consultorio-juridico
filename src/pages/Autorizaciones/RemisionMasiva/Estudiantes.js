import { Spin } from "antd";
import { PAGE_SIZE } from "constants/apiContants";
import { useEffect, useState, useRef, useContext } from "react";
import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Row,
  Col,
  Table,
  Pagination,
} from "react-bootstrap";
import API from "utils/Axios";

const Estudiantes = ({ getValues, setValue, watch }) => {
  const [docs, setDocs] = useState([]);
  const [links, setLinks] = useState(null);
  const [paginacion, setPaginacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });

  const checked = watch("r_usuarios_estudiante", []);

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

  const cargar = () => {
    setCargando(true);
    API.get("estudiantes/inscripcion/", { params })
      .then(({ data }) => {
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
        setCargando(false);
        setDocs(
          data.results.map((el) => ({
            label: `${el.r_usuarios_persona.a_primerNombre} ${el.r_usuarios_persona.a_segundoNombre} ${el.r_usuarios_persona.a_primerApellido} ${el.r_usuarios_persona.a_segundoApellido} `,
            value: el.id,
            documento: el.r_usuarios_persona.a_numeroDocumento,
          }))
        );
      })
      .catch((error) => {
        setCargando(false);
      });
  };

  const onChange = (check) => {
    let values = getValues("r_usuarios_estudiante") || [];
    const index = values.indexOf(check.value);
    if (index < 0) {
      values.push(check.value);
    } else {
      values.splice(index, 1);
    }
    setValue("r_usuarios_estudiante", values);
  };

  useEffect(() => {
    cargar();
  }, [params]);

  return (
    <Spin cargando={cargando}>
      <Card>
        <Card.Header>
          <h2>Seleccione los estudiantes para remisión</h2>
        </Card.Header>

        <Table className="table-inside" bordered style={{ marginTop: 1 }}>
          <thead>
            <tr>
              <th></th>
              <th>Documento</th>
              <th>Estudiante</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((el) => (
              <tr>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={checked?.some((c) => c == el.value)}
                    onChange={(e) => onChange(e.target)}
                    value={el.value}
                  />
                </td>
                <td>{el.documento}</td>
                <td>{el.label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="d-flex justify-content-between">
          <Form.Group className="d-flex align-items-center">
            <Form.Label>Por pagína</Form.Label>;
            <Form.Control
              as="select"
              style={{ width: 80 }}
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
          <b>Estudiantes seleccionados {checked?.length || 0}</b>
        </Card.Footer>
      </Card>
    </Spin>
  );
};

export default Estudiantes;
