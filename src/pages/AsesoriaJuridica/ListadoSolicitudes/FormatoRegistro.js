import { Form, Input, Button, Breadcrumb, Typography, Card, Spin, notification, Select, Collapse } from 'antd'
import City from 'components/City';
import State from 'components/State';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ArchivosInscripcion from "./Archivos";
import SolicitarAsesoriaDocs from './Documentos';
import { CaretRightOutlined } from '@ant-design/icons';
const { default: Page } = require("components/Page")
const { default: Policy } = require("components/Policy")
const { ROL_PERSONA } = require("constants/apiContants")


const SolicitarAsesoria = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const { Panel } = Collapse;

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
                    <Breadcrumb.Item>Solicitar asesoria</Breadcrumb.Item>
                </Breadcrumb>
                <div className='section-title'>
                    <Typography.Title level={4}>
                        Formato Registro de Asesoría Jurídica - Consultorio Jurídico
                    </Typography.Title>
                </div>
                <Form form={form} layout="vertical" onFinish={save}>
                    <Collapse
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{ marginBottom: 20 }}
                    >
                        <Panel header="Datos del usuario" key="1">
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
                        defaultActiveKey={['2']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    >
                        <Panel header="Asunto de consulta" key="2">
                            <Card className='card-shadown' style={{ marginTop: 34 }}>
                                <Spin spinning={loading}>
                                    <Form.Item name="asunto" rules={[{ required: true, message: 'Describa los hechos' }]} tooltip="Describa detalladamente los hechos">
                                        <Input.TextArea rows={5} cols={5} placeholder="Exponga su caso de manera breve..." />
                                    </Form.Item>
                                </Spin>
                            </Card>
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
                            <ArchivosInscripcion />
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