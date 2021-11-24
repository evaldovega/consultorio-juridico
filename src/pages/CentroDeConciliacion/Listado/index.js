import Page from "components/Page";
import Policy from "components/Policy";
import { ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE } from "constants/apiContants";
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
} from "react-bootstrap";
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

  const cargar = async (params) => {
    try {
      setCargando(true);
      const { data } = await API.get("/conciliacion/solicitud/", { params });
      setDocs(data);
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  const onFilter = (filtros) => {
    cargar(filtros);
  };

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
          <Filtros onFilter={onFilter} cargando={cargando} />

          <Card>
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
                      <div className="btn-group">
                        <Button onClick={() => setId(d.id)}>
                          <FaEye />
                        </Button>
                        <Policy policy={[ROL_ASESOR, ROL_ADMIN]}>
                          <Button className="ml-1">
                            <Link
                              to={`/centro-de-conciliacion/registrar/${d.id}`}
                            >
                              <FaPenAlt color="#ffff" />
                            </Link>
                          </Button>
                        </Policy>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card.Body></Card.Body>
          </Card>
        </Spin>
      </Page>
    </Policy>
  );
};

export default CentroDeConciliacionListado;
