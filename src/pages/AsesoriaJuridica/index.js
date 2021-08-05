import React, { useState } from "react";

import {
  Space,
  Layout,
  Typography,
  Breadcrumb,
  Card,
} from "antd";

import { ACCESS_TOKEN_NAME, MODULES } from "../../constants/apiContants";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import Page from 'components/Page'

const AsesoriaJuridicaHome=()=>{
    return (
        <Page>
            <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Asesoria jurídica</Breadcrumb.Item>
          </Breadcrumb>
          <div className='section-title'>
            <Typography.Title level={4}>
            Asesoria jurídica
            </Typography.Title>
            <Typography.Paragraph>
            </Typography.Paragraph>
          </div>
          <div
           className='grid-2'
          >
            <Link to="/asesoria-juridica/solicitar">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/edit.png" width={42} />
                  <Typography.Title level={5} style={{margin:0}}>
                    Formato de Registro
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
            <Link to="/asesoria-juridica/solicitudes">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/file.png" width={42} />
                  <Typography.Title level={5} style={{margin:0}}>
                    Listado de solicitudes
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
        </div>
        </Page>
    )
}

export default AsesoriaJuridicaHome