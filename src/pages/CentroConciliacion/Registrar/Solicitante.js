import React, { useState, useEffect, useContext } from 'react'
import Apoderado from "./Apoderado"
import { UserOutlined, BankOutlined } from '@ant-design/icons';
import API from '../../../utils/Axios'
import { Checkbox } from 'antd'
import Context from './Ctx'

const { Form, Select, Input, DatePicker, InputNumber, Avatar, Popconfirm } = require("antd")


const Solicitante = ({ form, field, remove, index }) => {
        const solicitantes = form.getFieldValue("solicitantes")
        const solicitante = solicitantes[index]
        const [tiposDocumento, setTiposDocumento] = useState([])
        const [tiposVivienda, setTiposVivienda] = useState([])
        const [escolaridades, setEscolaridades] = useState([])
        const [ocupaciones, setOcupaciones] = useState([])
        const [discapacidades, setDiscapacidades] = useState([])
        const [estadosCiviles, setEstadosCiviles] = useState([])

        const load = async () => {
                API('configuracion/tipo-documento/')
                        .then(({ data }) => {
                                console.log(data)
                                setTiposDocumento(data)
                        })
                API('configuracion/tipo-vivienda/')
                        .then(({ data }) => {
                                console.log(data)
                                setTiposVivienda(data)
                        })
                API('configuracion/escolaridad/')
                        .then(({ data }) => {
                                console.log(data)
                                setEscolaridades(data)
                        })
                API('configuracion/profesion/')
                        .then(({ data }) => {
                                console.log(data)
                                setOcupaciones(data)
                        })
                API('configuracion/discapacidad/')
                        .then(({ data }) => {
                                data.map((el) => (
                                        discapacidades.push({ 'label': el.a_titulo, 'value': el.id })
                                ))
                        })
                API('configuracion/estado-civil/')
                        .then(({ data }) => {
                                console.log(data)
                                setEstadosCiviles(data)
                        })
        }

        useEffect(() => {
                load()
        }, [])

        if (solicitante.type == "natural") {
                return (
                        <div style={{ borderLeft: "2px solid #00378b", paddingLeft: "20px" }}>
                                <Popconfirm title="Se borrara el solicitante" onConfirm={() => remove(index)}>
                                        <Avatar icon={<UserOutlined />} style={{ marginLeft: "-36px" }} />
                                </Popconfirm>

                                <div className="grid-3">
                                        <Form.Item noStyle {...field} name={[field.name, 'type']} fieldKey={[field.fieldKey, 'type']} rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}>
                                                <Input type="hidden" />
                                        </Form.Item>
                                        <Form.Item size="middle" {...field} name={[field.name, 'tipoDocumento']} fieldKey={[field.fieldKey, 'tipoDocumento']} label="Tipo de documento" rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}>
                                                <Select size="middle">
                                                        {tiposDocumento.map((el) => (
                                                                <Select.Option key={el.id} value={el.id}>{el.a_titulo}</Select.Option>
                                                        ))}
                                                </Select>
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'numeroPersonasConvive']} fieldKey={[field.fieldKey, 'numeroPersonasConvive']} label="N° personas con las que convive" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input />
                                        </Form.Item>
                                        <Form.Item  {...field} name={[field.name, 'tipoVivienda']} fieldKey={[field.fieldKey, 'tipoVivienda']} label="Tipo de vivienda" rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}>
                                                <Select size="middle">
                                                        {tiposVivienda.map((el) => (
                                                                <Select.Option key={el.id} value={el.id}>{el.a_titulo}</Select.Option>
                                                        ))}
                                                </Select>
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'a_numeroIdentificacion']} fieldKey={[field.fieldKey, 'numeroIdentidad']} label="N° de identidad" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'a_lugarExpedicion']} fieldKey={[field.fieldKey, 'expeidoEn']} label="Expedido en" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'a_direccion']} fieldKey={[field.fieldKey, 'direccion']} label="Dirección" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'barrio']} fieldKey={[field.fieldKey, 'barrio']} label="Barrio" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'primerApellido']} fieldKey={[field.fieldKey, 'primerApellido']} label="Primer apellido" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'segundoApellido']} fieldKey={[field.fieldKey, 'segundoApellido']} label="Segundo apellido" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'a_nombreCompleto']} fieldKey={[field.fieldKey, 'nombres']} label="Nombres" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'tel']} fieldKey={[field.fieldKey, 'tel']} label="Teléfono" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'correo']} fieldKey={[field.fieldKey, 'correo']} label="Correo electrónico" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'nacimiento']} fieldKey={[field.fieldKey, 'nacimiento']} label="Fecha de nacimiento" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <DatePicker size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'escolaridad']} fieldKey={[field.fieldKey, 'escolaridad']} label="Escolaridad" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Select size="middle">
                                                        {escolaridades.map((el) => (
                                                                <Select.Option key={el.id} value={el.id}>{el.a_titulo}</Select.Option>
                                                        ))}
                                                </Select>
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'ocupacion']} fieldKey={[field.fieldKey, 'ocupacion']} label="Ocupación" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Select size="middle">
                                                        {ocupaciones.map((el) => (
                                                                <Select.Option key={el.id} value={el.id}>{el.a_titulo}</Select.Option>
                                                        ))}
                                                </Select>
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'lugarNacimiento']} fieldKey={[field.fieldKey, 'lugarNacimiento']} label="Lugar de nacimiento" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'municipioNacimiento']} fieldKey={[field.fieldKey, 'municipioNacimiento']} label="Municipio de nacimiento" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'empresaDondeLabora']} fieldKey={[field.fieldKey, 'empresaDondeLabora']} label="Si es dependiente, empresa para la cual trabaja" >
                                                <Input size="middle" />
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'estadoCivil']} fieldKey={[field.fieldKey, 'estadoCivil']} label="Estado civil" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Select size="middle">
                                                        {estadosCiviles.map((el) => (
                                                                <Select.Option key={el.id} value={el.id}>{el.a_titulo}</Select.Option>
                                                        ))}
                                                </Select>
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'sexo']} fieldKey={[field.fieldKey, 'sexo']} label="Sexo" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Select size="middle">
                                                        <Select.Option value="M">Masculino</Select.Option>
                                                        <Select.Option value="F">Femenino</Select.Option>
                                                </Select>
                                        </Form.Item>
                                        <div className="grid-2">
                                                <Form.Item {...field} name={[field.name, 'tiempoServicioEmpresa']} fieldKey={[field.fieldKey, 'tiempoServicioEmpresa']} label="Tiempo de servicio" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                        <Input size="middle" />
                                                </Form.Item>
                                                <Form.Item {...field} name={[field.name, 'telefonoEmpresa']} fieldKey={[field.fieldKey, 'telefonoEmpresa']} label="Teléfono" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                        <Input size="middle" />
                                                </Form.Item>
                                        </div>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'orientacionSexual']} fieldKey={[field.fieldKey, 'orientacionSexual']} label="Tiempo de servicio" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'etnia']} fieldKey={[field.fieldKey, 'etnia']} label="Tiempo de servicio" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Input size="middle" />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'actividad']} fieldKey={[field.fieldKey, 'actividad']} label="Si es independiente, cual es su actividad" >
                                                <Input size="middle" />
                                        </Form.Item>
                                </div>
                                <div className="grid-3">
                                        <Form.Item {...field} name={[field.name, 'discapacidad']} fieldKey={[field.fieldKey, 'discapacidad']} label="Discapacidad" rules={[{ required: true, message: 'Ingrese información' }]}>
                                                <Checkbox.Group
                                                        options={discapacidades}
                                                        style={{ width: "100%" }}
                                                />
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'numeroHijos']} fieldKey={[field.fieldKey, 'numeroHijos']} label="Si es independiente, cual es su actividad" >
                                                <InputNumber size="middle" />
                                        </Form.Item>
                                </div>
                                <Apoderado field={field} />
                        </div>)
        }

        return (
                <div style={{ borderLeft: "2px solid #00378b", paddingLeft: "20px" }}>
                        <Popconfirm title="Se borrara el solicitante" onConfirm={() => remove(index)}>
                                <Avatar icon={<BankOutlined />} style={{ marginLeft: "-36px" }} />
                        </Popconfirm>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'nombreJuridico']} fieldKey={[field.fieldKey, 'nombreJuridico']} label="Nombre de la persona jurídica" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle" />
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'correoElectronico']} fieldKey={[field.fieldKey, 'correoElectronico']} label="Correo electrónico" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle" />
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'tel']} fieldKey={[field.fieldKey, 'tel']} label="Teléfono" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle" />
                                </Form.Item>
                        </div>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'nit']} fieldKey={[field.fieldKey, 'nit']} label="NIT" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle" />
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'dir']} fieldKey={[field.fieldKey, 'dir']} label="Dirección para notificación" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle" />
                                </Form.Item>
                        </div>
                        <Apoderado field={field} />
                </div>)
}

export default Solicitante