import { Form, Input, Button, Breadcrumb, Typography, Card, Spin, notification, Select } from 'antd'
import City from 'components/City';
import State from 'components/State';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SolicitarAsesoriaDocs from './Documentos';
const { default: Page } = require("components/Page")
const { default: Policy } = require("components/Policy")
const { ROL_PERSONA } = require("constants/apiContants")


const SolicitarAsesoria = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const save = () => {
    setLoading(true);
    setTimeout(() => {
      notification.success({ duration: 5, message: 'Asesoria registrada correctamente', description: 'Su radicado es 2021-002, le notificaremos cuando se le asigne un abogado.' })
      setLoading(false)
      form.setFieldsValue({ asunto: "" })
    }, 2000)
  }

  return (
    <Policy policy={[ROL_PERSONA]}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Solicitar asesoria</Breadcrumb.Item>
        </Breadcrumb>
        <div className='section-title'>
          <Typography.Title level={4}>
            Formato Registro de Asesoría Jurídica - Consultorio Jurídico
          </Typography.Title>
          <Typography.Title style={{ color: '#003789', fontWeight: 'bold', fontSize: 24, textAlign: 'left', marginTop: 50 }}>
            Datos del usuario
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: 'left', color: '#707070', fontSize: 16 }}>
            Con base en nuestra Política de Tratamiento de Datos Personales, Resolución Rectoral 001425 de agosto 9 de 2016, La Universidad del Atlántico proporciona los medios para garantizar y no vulnerar los derechos de la privacidad, la intimidad personal y el buen nombre con el tratamiento de datos personales consignados en nuestras bases de datos.
          </Typography.Paragraph>
        </div>
        <Form form={form} layout="vertical" onFinish={save}>
          <Card className='card-shadown' style={{ marginTop: 64 }}>
            <Spin spinning={loading}>
              <div className="grid-2">
                <div>
                  <Form.Item
                    label="Nombres y apellidos"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Edad"
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <Form.Item
                  label="Documento de identidad"
                >
                  <Input />
                </Form.Item>
                <div className="grid-2">
                  <div>
                    <Form.Item
                      label="Número de identidad"
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="Expedido en"
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Spin>
          </Card>
          <Card className='card-shadown' style={{ marginTop: 54 }}>
            <Spin spinning={loading}>
              <div className="grid-4">
                <div>
                  <Form.Item label="Género" name="c_genero">
                    <Select>
                      <Select.Option value="F">Femenino</Select.Option>
                      <Select.Option value="M">Masculino</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Orientación sexual" name="c_genero">
                    <Select>
                      <Select.Option value="F">Femenino</Select.Option>
                      <Select.Option value="M">Masculino</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Etnia" name="c_genero">
                    <Select>
                      <Select.Option value="F">Femenino</Select.Option>
                      <Select.Option value="M">Masculino</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Nivel educativo" name="c_genero">
                    <Select>
                      <Select.Option value="F">Femenino</Select.Option>
                      <Select.Option value="M">Masculino</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <div className="grid-2">
                  <div>
                    <Form.Item label="Discapacidad" name="c_genero">
                      <Select>
                        <Select.Option value="F">Femenino</Select.Option>
                        <Select.Option value="M">Masculino</Select.Option>
                        <Select.Option value="Otro">Otro</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item label="Mujer cabeza de familia" name="c_genero">
                      <Select>
                        <Select.Option value="F">Femenino</Select.Option>
                        <Select.Option value="M">Masculino</Select.Option>
                        <Select.Option value="Otro">Otro</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <Form.Item label="Afectado por la violencia" name="c_genero">
                    <Select>
                      <Select.Option value="F">Femenino</Select.Option>
                      <Select.Option value="M">Masculino</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <State />

              <City />

              <Form.Item label="Asunto" name="asunto" rules={[{ required: true, message: 'Describa los hechos' }]} tooltip="Describa detalladamente los hechos">
                <Input.TextArea rows={5} cols={5} />
              </Form.Item>


              <SolicitarAsesoriaDocs />
              <br></br>
              <Form.Item>
                <Button type='primary' htmlType='submit'>Solicitar</Button>
              </Form.Item>
            </Spin>
          </Card>
        </Form>
      </Page>
    </Policy>
  );
}

export default SolicitarAsesoria