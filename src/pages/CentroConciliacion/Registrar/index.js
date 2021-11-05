import React, { useEffect, useState } from "react";

import {
  Space,
  Layout,
  Typography,
  Breadcrumb,
  Card,
  Form,
} from "antd";

import { ACCESS_TOKEN_NAME, MODULES } from "../../../constants/apiContants";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import Page from 'components/Page'
import Policy from "components/Policy";
import AccessDenied from "components/Policy/AccessDenied";
import Context from "./Ctx"
import Header from "./Header"
import Solicitantes from "./Solicitantes";
import VersionSolicitante from "./VersionSolicitante";
import EscalaConflicto from "./Escala";
import Citados from "./Citados";
import API from '../../../utils/Axios'

const CentroDeConciliacionRegistrar = () => {
  const [numeroCaso, setNumeroCaso] = useState("")
  const [fechaSolicitud, setFechaSolicitud] = useState("")
  const [form] = useForm()

  useEffect(() => {
    setFechaSolicitud(new Date())
  }, [])


  return (
    <Policy policy={[]} feedback={<AccessDenied msn='Acceso denegado' />}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/centro-de-conciliacion">Centro de conciliación</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Registrar</Breadcrumb.Item>
        </Breadcrumb>
        <div className='section-title'>
          <Typography.Title level={4}>
            Registrar audiencia de conciliación
          </Typography.Title>
          <Typography.Paragraph>
          </Typography.Paragraph>
        </div>

        <Context.Provider value={{ numeroCaso, setNumeroCaso, fechaSolicitud, setFechaSolicitud, form}} >
          <Form form={form} layout="vertical">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Header />
            </div>
            <br></br>
            <Solicitantes />
            <br></br>
            <VersionSolicitante form={form} />
            <br></br>
            <EscalaConflicto form={form} />
            <br></br>
            <Citados />
          </Form>
        </Context.Provider>
      </Page>
    </Policy>
  )
}

export default CentroDeConciliacionRegistrar