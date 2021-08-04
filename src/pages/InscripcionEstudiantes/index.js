import React, { useState } from "react";
import Policy from 'components/Policy';
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


const InscripcionEstudiantes = () => {
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  return (
    <Policy policy={['asesor']}>
    <Page>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Inicio</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Inscripción estudiantes</Breadcrumb.Item>
      </Breadcrumb>
      <div className='section-title'>
        <Typography.Title level={4}>
          Modulo Inscripción estudiantes
        </Typography.Title>
        <Typography.Paragraph>
          Escoge el formulario según tus necesidades
        </Typography.Paragraph>
      </div>

          <div
            style={{
              animationDelay: 0.2,gap:'24px!important'
            }}
            className='grid-2'
          >
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/edit.png" width={42} />
                  <Typography.Title level={5} style={{margin:0}}>
                    Inscripción a prácticas de Consultorio Jurídico
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
            <Link to="/inscripcion-estudiantes/listado">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/file.png" width={42} />
                  <Typography.Title level={5} style={{margin:0}}>
                    Listado de incripciones
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/user.png" width={42}  />
                  <Typography.Title level={5} style={{margin:0}}>
                    Asignación de estudiantes
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/folder.png" width={42}/>
                  <Typography.Title level={5} style={{margin:0}}>
                    Reportes
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
            <Link to="/inscripcion-estudiantes/inscripcion-practicas">
              <Card className='card-small card-shadown'>
                <Space style={{display:'flex',alignItems:'center'}}>
                  <img src="/icons/file.png" width={42}/>
                  <Typography.Title level={5} style={{margin:0}}>
                    Formatos
                  </Typography.Title>
                </Space>
              </Card>
            </Link>
          </div>
        
      
        </Page>
        </Policy>
  );
};
export default InscripcionEstudiantes;
