import { Card, Form, Typography,Dropdown,Menu } from "antd"
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { useContext, useEffect } from "react"
import Solicitante from "./Solicitante"
import Context from './Ctx'

const Solicitantes=()=>{
        const {form} = useContext(Context)

        useEffect(()=>{
                console.log(form)
                form.setFieldsValue({solicitantes:[{type:"natural"}]})
        },[form])

        function handleMenuClick(e) {
                const solicitantes=form.getFieldValue("solicitantes") || []
                solicitantes.push({type:e.key})
                form.setFieldsValue({solicitantes:solicitantes})
        }

        const menu = (
                <Menu onClick={handleMenuClick}>
                  <Menu.Item key="natural" icon={<UserOutlined />}>
                    Solicitante natural
                  </Menu.Item>
                  <Menu.Item key="juridico" icon={<UserOutlined />}>
                   Solicitante juridico
                  </Menu.Item>
                </Menu>
              );
        
        

        return (
                <Card className="card-shadown">
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                <Typography.Title>Solicitantes</Typography.Title>
                                <Dropdown.Button  overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                                        Añadir solicitante
                                </Dropdown.Button>
                        </div>
                        <Form.List name="solicitantes">
                                {(fields, { add, remove }) => (fields.map((field,index) => (<Solicitante  form={form} field={field} remove={remove} index={index}></Solicitante>)))}
                        </Form.List>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span></span>
                                <Dropdown.Button  overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                                        Añadir solicitante
                                </Dropdown.Button>
                        </div>
                </Card>
                
        )
}

export default Solicitantes