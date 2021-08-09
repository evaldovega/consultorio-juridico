import { Form, Input, Button, Breadcrumb, Typography, Card, Spin, notification, DatePicker, Select, Collapse, Checkbox, List } from 'antd'
import City from 'components/City';
import State from 'components/State';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SolicitarAsesoriaDocs from './Documentos';
import { CaretDownOutlined } from '@ant-design/icons';
import ArchivosAsesoria from './Archivos';
import { MDBDataTable } from 'mdbreact'
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
const { default: Page } = require("components/Page")
const { default: Policy } = require("components/Policy")
const { ROL_PERSONA } = require("constants/apiContants")


const SolicitarAsesoria = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const { Panel } = Collapse;

    const [registros, setRegistros] = useState([
        {
            icon: "",
            title: "Nombre del estudiante",
        },
        {
            icon: "",
            title: "Nombre del estudiante",
        },
    ]);

    const save = () => {
        setLoading(true);
        setTimeout(() => {
            notification.success({ duration: 5, message: 'Asesoria registrada correctamente', description: 'Su radicado es 2021-002, le notificaremos cuando se le asigne un abogado.' })
            setLoading(false)
            form.setFieldsValue({ asunto: "" })
        }, 2000)
    }

    return (
        <Policy policy={[]}>
            <Page>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/asesoria-juridica">Asesoría Jurídica</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Formato de registro</Breadcrumb.Item>
                </Breadcrumb>
                <div className='section-title'>
                    <Typography.Title level={4}>
                        Formato Registro de Asesoría Jurídica - Consultorio Jurídico
                    </Typography.Title>
                </div>
                <Form form={form} layout="vertical" onFinish={save}>
                    <Collapse
                        expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0} />}
                        expandIconPosition={'right'}
                        style={{ marginBottom: 20 }}
                    >
                        <Panel header="Datos del usuario" key="1">
                            <Card style={{ marginTop: 10 }}>
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
                                    <div className="grid-2">
                                        <div>
                                            <Form.Item label="Migrante" name="c_genero">
                                                <Select>
                                                    <Select.Option value="F">Femenino</Select.Option>
                                                    <Select.Option value="M">Masculino</Select.Option>
                                                    <Select.Option value="Otro">Otro</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                label="¿De dónde?"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="grid-4">
                                        <div>
                                            <Form.Item
                                                label="Dirección de residencia"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                label="Barrio"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <State />
                                        </div>
                                        <div>
                                            <City />
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div className="grid-2">
                                            <div>
                                                <Form.Item label="Vivienda" name="c_genero">
                                                    <Select>
                                                        <Select.Option value="F">Femenino</Select.Option>
                                                        <Select.Option value="M">Masculino</Select.Option>
                                                        <Select.Option value="Otro">Otro</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <Form.Item label="Estado civil" name="c_genero">
                                                    <Select>
                                                        <Select.Option value="F">Femenino</Select.Option>
                                                        <Select.Option value="M">Masculino</Select.Option>
                                                        <Select.Option value="Otro">Otro</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div>
                                            <Form.Item
                                                label="Teléfono celular"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div>
                                            <Form.Item
                                                label="Correo electrónico"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item label="Profesión u oficio" name="c_genero">
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
                                                <Form.Item label="Trabaja" name="c_genero">
                                                    <Select>
                                                        <Select.Option value="F">Femenino</Select.Option>
                                                        <Select.Option value="M">Masculino</Select.Option>
                                                        <Select.Option value="Otro">Otro</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                            <div>
                                                <Form.Item label="Servidor público" name="c_genero">
                                                    <Select>
                                                        <Select.Option value="F">Femenino</Select.Option>
                                                        <Select.Option value="M">Masculino</Select.Option>
                                                        <Select.Option value="Otro">Otro</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <Form.Item
                                                    label="Cargo"
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div>
                                            <Form.Item
                                                label="Nombre de la empresa donde labora"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item label="Presentación de SISBEN" name="c_genero">
                                                <Select>
                                                    <Select.Option value="F">Femenino</Select.Option>
                                                    <Select.Option value="M">Masculino</Select.Option>
                                                    <Select.Option value="Otro">Otro</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="grid-2">
                                        <div>
                                            <Form.Item label="Presentación de recibo de servicio público" name="c_genero">
                                                <Select>
                                                    <Select.Option value="F">Femenino</Select.Option>
                                                    <Select.Option value="M">Masculino</Select.Option>
                                                    <Select.Option value="Otro">Otro</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item label="Estrato" name="c_genero">
                                                <Select>
                                                    <Select.Option value="F">Femenino</Select.Option>
                                                    <Select.Option value="M">Masculino</Select.Option>
                                                    <Select.Option value="Otro">Otro</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Spin>
                            </Card>
                        </Panel>
                    </Collapse>
                    <Collapse
                        expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0} />}
                    >
                        <Panel header="Asunto de consulta" key="2">
                            <Spin spinning={loading}>
                                <Form.Item name="asunto" rules={[{ required: true, message: 'Describa los hechos' }]} tooltip="Describa detalladamente los hechos">
                                    <Input.TextArea rows={5} cols={5} maxLength={200} placeholder="Exponga su caso de manera breve..." />
                                </Form.Item>
                            </Spin>
                        </Panel>
                    </Collapse>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <Typography.Title level={5} className="title-blue">
                                Documentos anexados
                            </Typography.Title>
                        </div>
                        <div style={{ textAlign: 'right', flex: 1, marginTop: 50 }}>
                            <SolicitarAsesoriaDocs />

                        </div>
                    </div>
                    <Card className='card-shadown' style={{ marginTop: 34 }}>
                        <Spin spinning={loading}>
                            <ArchivosAsesoria />
                        </Spin>
                    </Card>
                    <Card className='card-shadown' style={{ marginTop: 64 }}>
                        <Spin spinning={loading}>
                            <div className="grid-3">
                                <div>
                                    <Form.Item
                                        label="Fecha de la asesoría"
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item
                                        label="Hora de la asesoría"
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item
                                        label="Lugar de atención de asesoría"
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </Spin>
                    </Card>
                    <Typography.Title level={5} className="title-blue">
                        Datos del estudiante
                    </Typography.Title>
                    <Card className='card-shadown' style={{ marginTop: 34 }}>
                        <Spin spinning={loading}>
                            <div className="grid-2">
                                <div>
                                    <Form.Item label="Seleccione el nombre del estudiante a asignar" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <List itemLayout="horizontal"
                                style={{
                                    marginBottom: 10
                                }}
                                dataSource={registros}
                                renderItem={item => (
                                    <List.Item extra={
                                        <Button
                                            style={{
                                                border: 0
                                            }}
                                        >
                                            <CloseOutlined style={{
                                                height: 30,
                                                color: "#b0b0b0"
                                            }} />
                                        </Button>
                                    }>
                                        <List.Item.Meta
                                            title={<a href="https://ant.design">{item.title}</a>}

                                        />
                                    </List.Item>
                                )}>

                            </List>
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
                                        label="Consultorio No."
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="grid-2">
                                <div>
                                    <Form.Item label="Área de la asesoría" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </Spin>
                    </Card>
                    <Typography.Title level={5} className="title-blue">
                        Datos del estudiante
                    </Typography.Title>
                    <Card className='card-shadown' style={{ marginTop: 34 }}>
                        <Spin spinning={loading}>
                            <Form.Item name="asunto" label="Recomendaciones">
                                <Input.TextArea rows={5} cols={5} />
                            </Form.Item>
                            <Form.Item name="asunto" label="Compromisos">
                                <Input.TextArea rows={5} cols={5} />
                            </Form.Item>
                            <div className="grid-4">
                                <div>
                                    <Form.Item label="Fecha para cumplir los compromisos" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item label="Nueva cita" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item label="Fecha" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item label="Hora" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        </Spin>
                    </Card>
                    <Typography.Title level={5} className="title-blue">
                        Seguimientos de asesoría
                    </Typography.Title>
                    <Card className='card-shadown' style={{ marginTop: 34 }}>
                        <Spin spinning={loading}>
                            <div style={{ marginBottom: 10 }}>
                                <strong style={{ marginRight: 20, fontSize: 20 }}>Actividades realizadas:</strong>
                                <strong style={{ marginRight: 20 }}>Asesorías</strong>
                                <Checkbox>
                                    Verbal
                                </Checkbox>
                                <Checkbox>
                                    Escrita
                                </Checkbox>
                            </div>
                            <div>
                                <strong style={{ marginRight: 20, fontSize: 20 }}>Clase de asesorías:</strong>
                                <strong style={{ marginRight: 20 }}>Penal</strong>
                                <Checkbox>
                                    Elaboración de denuncia
                                </Checkbox>
                                <strong style={{ marginLeft: 20, marginRight: 20 }}>Laboral</strong>
                                <Checkbox>
                                    Elaboración de liquidación
                                </Checkbox>
                            </div>
                        </Spin>
                    </Card>
                    <Typography.Title level={5} className="title-blue">
                        Procedimiento
                    </Typography.Title>
                    <Typography.Paragraph style={{ textAlign: 'left', color: '#707070', fontSize: 16 }}>
                        Escoge la acción recomendada para el caso
                    </Typography.Paragraph>
                    <Card className='card-shadown' style={{ marginTop: 34 }}>
                        <Spin spinning={loading}>
                            <div className="grid-2">
                                <div>
                                    <Form.Item
                                        label="Fecha de radicación"
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item label="Entidad ante la que se presenta" name="c_genero">
                                        <Select>
                                            <Select.Option value="F">Femenino</Select.Option>
                                            <Select.Option value="M">Masculino</Select.Option>
                                            <Select.Option value="Otro">Otro</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item name="asunto" label="Respuesta">
                                <Input.TextArea rows={3} cols={5} />
                            </Form.Item>
                        </Spin>
                    </Card>
                    <Card className='card-shadown' style={{ marginTop: 34 }}>
                        <Spin spinning={loading}>
                            <Form.Item name="asunto" label="Observación">
                                <Input.TextArea rows={5} cols={5} />
                            </Form.Item>
                            <Form.Item name="asunto" label="Se recomienda">
                                <Input.TextArea rows={3} cols={5} />
                            </Form.Item>
                            <div className="grid-3">
                                <div>
                                    <span style={{ marginRight: 10 }}>Nueva cita</span>
                                    <Checkbox>
                                        Si
                                    </Checkbox>
                                    <Checkbox>
                                        No
                                    </Checkbox>
                                </div>
                                <div>
                                    <span style={{ marginRight: 10 }}>Fecha y hora</span>
                                    <DatePicker />
                                </div>
                            </div>
                        </Spin>
                    </Card>
                    <Form.Item style={{ marginTop: 20, textAlign: 'right' }}>
                        <Button type='primary' htmlType='submit'>Guardar</Button>
                    </Form.Item>
                </Form>
            </Page>
        </Policy>
    );
}

export default SolicitarAsesoria