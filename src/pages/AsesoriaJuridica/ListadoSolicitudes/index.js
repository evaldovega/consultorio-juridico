import { Typography, Input, Space } from "antd";
import { Table, Breadcrumb, Card, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import { useImmer } from "use-immer";
import TextNew from "components/TextNew";
import API from "utils/Axios";
import { FolderViewOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Policy from "components/Policy";
import { ROL_ASESOR } from "constants/apiContants";

const ListadoSolicitudes = () => {
  const [docs, setDoc] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSolicitudes = async () => {
    API.get("asesorias/solicitud/").then((response) => {
      console.log(JSON.stringify(response.data));
      setDoc(response.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getSolicitudes();
      setLoading(false);
      //setDoc(draft=>inscripciones)
    }, 1000);
  }, []);

  return (
    <Policy policy={[ROL_ASESOR]}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/asesoria-juridica">Asesoría Jurídica</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Casos</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form style={{ flex: 1 }}>
                <Form.Group>
                  <Form.Control placeholder="Buscar..." />
                </Form.Group>
              </Form>
              <div style={{ flex: 1 }}></div>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>No. caso</th>
                  <th>Nombre y apellidos</th>
                  <th>Documento de identidad</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <Link to={`/asesoria-juridica/caso/${d.id}`}>{d.id}</Link>
                    </td>
                    <td>
                      {d.r_usuarios_solicitante.a_primerNombre}{" "}
                      {d.r_usuarios_solicitante.a_primerApellido}
                    </td>
                    <td>{d.r_usuarios_solicitante.a_numeroDocumento}</td>
                    <td>
                      {d.dt_fechaAsesoria} {d.ht_horaAsesoria}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ListadoSolicitudes;
