import Apoderado from "./Apoderado"
import {  UserOutlined,BankOutlined } from '@ant-design/icons';

const { Form, Select, Input,DatePicker,InputNumber,Avatar, Popconfirm } = require("antd")


const Solicitante=({form,field, remove, index})=>{
        const solicitantes=form.getFieldValue("solicitantes") 
        const solicitante = solicitantes[index]

        if(solicitante.type=="natural"){
                return (
                <div style={{borderLeft:"2px solid #00378b"}}>
                        <Popconfirm title="Se borrara el solicitante" onConfirm={()=>remove(index)}>
                                <Avatar icon={<UserOutlined/>} style={{marginLeft:"-16px"}}/>
                        </Popconfirm>

                        <div className="grid-3">
                        <Form.Item noStyle {...field} name={[field.name, 'type']} fieldKey={[field.fieldKey, 'type']}  rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}>
                        <Input type="hidden"/>
                        </Form.Item>
                <Form.Item size="middle" {...field} name={[field.name, 'tipoDocumento']} fieldKey={[field.fieldKey, 'tipoDocumento']} label="Tipo de documento"  rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}>
                        <Select size="middle">
                                <Select.Option value="">Tarjeta de identidad</Select.Option>
                                <Select.Option value="">Cédula de extranjeria</Select.Option>
                                <Select.Option value="">Pasaporte</Select.Option>
                        </Select>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'numeroPersonasConvive']} fieldKey={[field.fieldKey, 'numeroPersonasConvive']} label="N° personas con las que convive"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input/>
                </Form.Item>
                <Form.Item  {...field} name={[field.name, 'tipoVivienda']} fieldKey={[field.fieldKey, 'tipoVivienda']} label="Tipo de vivienda"  rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}>
                        <Select size="middle">
                                <Select.Option value="">Propia</Select.Option>
                                <Select.Option value="">Arrendada</Select.Option>
                                <Select.Option value="">Familiar</Select.Option>
                                <Select.Option value="">Otra</Select.Option>
                        </Select>
                </Form.Item>
                        </div>
                <div className="grid-3">
                <Form.Item {...field} name={[field.name, 'numeroIdentidad']} fieldKey={[field.fieldKey, 'numeroIdentidad']} label="N° de identidad"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'expeidoEn']} fieldKey={[field.fieldKey, 'expeidoEn']} label="Expedido en"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'direccion']} fieldKey={[field.fieldKey, 'direccion']} label="Dirección"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                </div>
                <div className="grid-3">
                <Form.Item {...field} name={[field.name, 'barrio']} fieldKey={[field.fieldKey, 'barrio']} label="Barrio"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'primerApellido']} fieldKey={[field.fieldKey, 'primerApellido']} label="Primer apellido"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'segundoApellido']} fieldKey={[field.fieldKey, 'segundoApellido']} label="Segundo apellido"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                </div>
                <div className="grid-3">
                <Form.Item {...field} name={[field.name, 'nombres']} fieldKey={[field.fieldKey, 'nombres']} label="Nombres"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'tel']} fieldKey={[field.fieldKey, 'tel']} label="Teléfono"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'correo']} fieldKey={[field.fieldKey, 'correo']} label="Correo electrónico"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                </div>
                <div className="grid-3">
                <Form.Item {...field} name={[field.name, 'nacimiento']} fieldKey={[field.fieldKey, 'nacimiento']} label="Fecha de nacimiento"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <DatePicker size="middle"/>
                </Form.Item> 
                <Form.Item {...field} name={[field.name, 'escolaridad']} fieldKey={[field.fieldKey, 'escolaridad']} label="Escolaridad"  rules={[{ required: true, message: 'Ingrese información' }]}>
                <Select size="middle">
                                <Select.Option value="">Analfabeto</Select.Option>
                                <Select.Option value="">Primaria</Select.Option>
                                <Select.Option value="">Bachiller</Select.Option>
                                <Select.Option value="">Técnico</Select.Option>
                                <Select.Option value="">Profesional</Select.Option>
                                <Select.Option value="">Especializado</Select.Option>
                        </Select>
                </Form.Item> 
                <Form.Item {...field} name={[field.name, 'ocupacion']} fieldKey={[field.fieldKey, 'ocupacion']} label="Ocupación"  rules={[{ required: true, message: 'Ingrese información' }]}>
                <Select size="middle">
                                <Select.Option value="">Estudiante</Select.Option>
                                <Select.Option value="">Trabajador</Select.Option>
                                <Select.Option value="">Independiente</Select.Option>
                                <Select.Option value="">Dependiente</Select.Option>
                                <Select.Option value="">Desempleado</Select.Option>
                        </Select>
                </Form.Item> 
                </div>
                <div className="grid-3">
                <Form.Item {...field} name={[field.name, 'lugarNacimiento']} fieldKey={[field.fieldKey, 'lugarNacimiento']} label="Lugar de nacimiento"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'municipioNacimiento']} fieldKey={[field.fieldKey, 'municipioNacimiento']} label="Municipio de nacimiento"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'empresaDondeLabora']} fieldKey={[field.fieldKey, 'empresaDondeLabora']} label="Si es dependiente, empresa para la cual trabaja" >
                        <Input size="middle"/>
                </Form.Item>
                </div>
                <div className="grid-3">
                <Form.Item {...field} name={[field.name, 'estadoCivil']} fieldKey={[field.fieldKey, 'estadoCivil']} label="Estado civil"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'sexo']} fieldKey={[field.fieldKey, 'sexo']} label="Sexo"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <div className="grid-2">
                <Form.Item {...field} name={[field.name, 'tiempoServicioEmpresa']} fieldKey={[field.fieldKey, 'tiempoServicioEmpresa']} label="Tiempo de servicio"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'telefonoEmpresa']} fieldKey={[field.fieldKey, 'telefonoEmpresa']} label="Teléfono"  rules={[{ required: true, message: 'Ingrese información' }]}>
                        <Input size="middle"/>
                </Form.Item>
                </div>
                        </div>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'orientacionSexual']} fieldKey={[field.fieldKey, 'orientacionSexual']} label="Tiempo de servicio"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'etnia']} fieldKey={[field.fieldKey, 'etnia']} label="Tiempo de servicio"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'actividad']} fieldKey={[field.fieldKey, 'actividad']} label="Si es independiente, cual es su actividad" >
                                        <Input size="middle"/>
                                </Form.Item>
                        </div>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'discapacidad']} fieldKey={[field.fieldKey, 'discapacidad']} label="Discapacidad"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Select size="middle">
                                                <Select.Option value="">Motora</Select.Option>
                                                <Select.Option value="">Visual</Select.Option>
                                                <Select.Option value="">Auditiva</Select.Option>
                                                <Select.Option value="">Cognitiva</Select.Option>
                                        </Select>
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'numeroHijos']} fieldKey={[field.fieldKey, 'numeroHijos']} label="Si es independiente, cual es su actividad" >
                                        <InputNumber size="middle"/>
                                </Form.Item>
                        </div>
                        <Apoderado field={field}/>
                </div>)
        }

        return (
                <div style={{borderLeft:"2px solid #00378b"}}>
                        <Popconfirm title="Se borrara el solicitante" onConfirm={()=>remove(index)}>
                                <Avatar icon={<BankOutlined/>} style={{marginLeft:"-16px"}}/>
                        </Popconfirm>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'nombreJuridico']} fieldKey={[field.fieldKey, 'nombreJuridico']} label="Nombre de la persona jurídica" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item> 
                                <Form.Item {...field} name={[field.name, 'correoElectronico']} fieldKey={[field.fieldKey, 'correoElectronico']} label="Correo electrónico" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item> 
                                <Form.Item {...field} name={[field.name, 'tel']} fieldKey={[field.fieldKey, 'tel']} label="Teléfono" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item>  
                        </div>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'nit']} fieldKey={[field.fieldKey, 'nit']} label="NIT" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item> 
                                <Form.Item {...field} name={[field.name, 'dir']} fieldKey={[field.fieldKey, 'dir']} label="Dirección para notificación" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input size="middle"/>
                                </Form.Item>  
                        </div>
                        <Apoderado field={field}/>
                </div>)
}

export default Solicitante