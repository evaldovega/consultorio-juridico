import { Card, Form, Typography,Dropdown,Menu } from "antd"
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { useContext, useEffect } from "react"
import Solicitante from "./Solicitante"
import Context from './Ctx'

const Citados=()=>{
        const {form} = useContext(Context)

        useEffect(()=>{
                form.setFieldsValue({citados:[{type:"natural"}]})
        },[form])

        function handleMenuClick(e) {
                const citados=form.getFieldValue("citados") || []
                citados.push({type:e.key})
                form.setFieldsValue({citados})
        }

        const menu = (
                <Menu onClick={handleMenuClick}>
                  <Menu.Item key="natural" icon={<UserOutlined />}>
                    Citado natural
                  </Menu.Item>
                  <Menu.Item key="juridico" icon={<UserOutlined />}>
                   Citado juridico
                  </Menu.Item>
                </Menu>
              );
        
        

        return (
                <Card className="card-shadown">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                <Typography.Title>Citados</Typography.Title>
                                <Dropdown.Button  overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                                        Añadir citado
                                </Dropdown.Button>
                        </div>
                        <Form.List name="citados">
                                {(fields, { add, remove }) => (fields.map((field,index) => (<Solicitante  form={form} field={field} remove={remove} index={index}></Solicitante>)))}
                        </Form.List>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span></span>
                                <Dropdown.Button  overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                                        Añadir citado
                                </Dropdown.Button>
                        </div>
                </Card>
                
        )
}

export default Citados