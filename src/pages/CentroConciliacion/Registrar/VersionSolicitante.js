import { UploadOutlined } from '@ant-design/icons';
import Adjunto from './Adjunto';
import { useEffect } from 'react';
import Country from '../../../components/Country'
import State from '../../../components/State'
import City from '../../../components/City'

const { Card, Typography, Form, Input, Radio, Upload, Button } = require("antd")

const VersionSolicitante=({form})=>{

        
  useEffect(()=>{
        if(form){
          form.setFieldsValue({versionSolicitanteAnexos:[{name:"",data:""}]})
        }
      },[form])

        return (
                <Card className="card-shadown">
                        <Typography.Title>Versión del solicitante</Typography.Title>
                        <br></br>
                        <Form.Item name="versionSolicitanteHace" label="Hace cuanto qué se incio el conflicto"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                <Input/>
                        </Form.Item>
                        <br></br>
                        <Typography.Title level={4}>Intención del solicitante</Typography.Title>
                        <Form.Item name="versionSolicitanteIntencion"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                <Radio.Group>
                                        <Radio value="1">Conciliar</Radio>
                                        <Radio value="2">Cumplir con el requisito de procedibilidad</Radio>
                                        <Radio value="3">Dialogar con ayuda de un tercero</Radio>
                                        <Radio value="4">Otro</Radio>
                                </Radio.Group>
                        </Form.Item>

                        <br></br>
                        <Typography.Title level={4}>Lugar de los hechos</Typography.Title>
                        <br></br>
                        <div className="grid-2">
                                <Country name="r_config_pais" state="r_config_departamento" />
                                <State name="r_config_departamento" city="r_config_municipio"/>
                                <City name="r_config_municipio"/>
                        </div>

                        <br></br>
                        <Typography.Title level={4}>Pretenciones iniciales</Typography.Title>
                        <Form.Item name="versionSolicitantePretencionInicial"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                <Input.TextArea/>
                        </Form.Item>

                        <br></br>
                        <Typography.Title level={4}>Resumen de los hechos</Typography.Title>
                        <Form.Item name="versionSolicitantePretencionResumen"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                <Input.TextArea/>
                        </Form.Item>
                        <br></br>
                        <Typography.Title level={4}>Pruebas y anexos</Typography.Title>
                        <Form.List name="versionSolicitanteAnexos"  rules={[{ required: true, message: 'Ingrese información' }]}>
                                {(fields, { add, remove }) => (<div>{fields.map((field,index) => (<Adjunto form={form} field={field} remove={remove} index={index} />))}<Button onClick={add} type="primary" htmlType="button">Nuevo anexo</Button></div>)}
                        </Form.List>
                        <br></br>
                        <div className="grid-2">
                                <Form.Item name="versionSolicitanteCuantia" label="Cuantia valor" rules={[{ required: true, message: 'Ingrese información' }]}>
                                        <Input/>
                                </Form.Item>
                                <Form.Item name="versionSolicitanteCuantiaIndeterminada" label="Indeterminada">
                                        <Input/>
                                </Form.Item>
                        </div>
                </Card>
        )
}

export default VersionSolicitante