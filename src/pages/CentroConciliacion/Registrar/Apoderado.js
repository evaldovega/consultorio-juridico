import { Typography } from "antd"
const { Form, Select, Input,DatePicker,InputNumber,Avatar } = require("antd")

const Apoderado=({field})=>{
        return (
                <div style={{marginLeft:"10px"}}>
                        <Typography.Title level={2}>Información del apoderado</Typography.Title>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'apoderadoNombre']} fieldKey={[field.fieldKey, 'apoderadoNombre']} label="Nombres y apellidos" >
                                        <Input size="middle"/>
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'apoderadoCel']} fieldKey={[field.fieldKey, 'apoderadoCel']} label="Celular" >
                                        <Input size="middle"/>
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'apoderadoTell']} fieldKey={[field.fieldKey, 'apoderadoTell']} label="Teléfono" >
                                        <Input size="middle"/>
                                </Form.Item>
                        </div>
                        <div className="grid-3">
                                <Form.Item {...field} name={[field.name, 'apoderadoTP']} fieldKey={[field.fieldKey, 'apoderadoTP']} label="TP N°" >
                                        <Input size="middle"/>
                                </Form.Item>
                                <Form.Item {...field} name={[field.name, 'apoderadoDir']} fieldKey={[field.fieldKey, 'apoderadoDir']} label="Dirección" >
                                        <Input size="middle"/>
                                </Form.Item>
                        </div>
                </div>
        )
}

export default Apoderado