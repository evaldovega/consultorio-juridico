import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  Row,
  Col,
  Spin,
  notification,
  Card,
  message,
  Layout,Checkbox
} from "antd";
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import {Link} from 'react-router-dom'
import GoSite from 'components/goSite';

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { Header, Footer, Sider, Content } = Layout;

const Registro=({location,history})=>{

  const [loading,setLoading]=useState(false)
    const onFinish=()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
        localStorage.setItem(ACCESS_TOKEN_NAME,'hola')
        history.replace(location && location.state && location.state.from ? location.state.from.pathname : '/')
      },3000)
    }
    return (<>

      
    <div style={{backgroundImage:'url(images/background-login.jpg)'}} className='background-login'>
        <GoSite style={{position:'absolute',top:16,left:16}}/>
        <Spin spinning={loading}>
      
            <div className='card-login'>
            <img src='https://www.uniatlantico.edu.co/uatlantico/sites/default/files/docencia/facultades/img/Consultorio%20Juridico.jpg' className='logo' style={{maxWidth:'100%',marginBottom:32}}/>
            <div className='card-login-content'>
            <Typography.Paragraph style={{textAlign:'center',fontSize:16,marginBottom:32}}>Bienvenido</Typography.Paragraph>
            <Form
              name="basic"
              initialValues={{
                remember: true,
                email: "evaldo.vega@gmail.com",
                clave: "123456",
              }}
              onFinish={onFinish}
            >
                <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su nombre",
                  },
                ]}
              >
                <Input type="text" placeholder='Nombre completo' />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su E-mail",
                  },
                ]}
              >
                <Input type="email" placeholder="Correo electrónico" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña!",
                  },
                ]}
              >
                <Input.Password placeholder="Confirmar contraseña" />
              </Form.Item>
              <Form.Item
                name="password2"
                rules={[
                  {
                    required: true,
                    message: "Por favor confirme su contraseña!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Las contraseñas no coinciden!');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Contraseña" />
              </Form.Item>
                <br></br>
              <Form.Item name='politica' valuePropName="checked" rules={[{
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Deberia aceptar')),
          },]}>
                <Checkbox>He leído y acepto la <a target='blank' href=''>Política de información de datos</a></Checkbox>
              </Form.Item>

              <Form.Item style={{marginTop:42}}>
                <Button type="primary" block htmlType="submit">
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
            <div style={{textAlign:'center',marginTop:42}}>
              <Link to='/login' className='link-blue'>Volver al login</Link>
              </div>
            </div>
            </div>
          </Spin>
        
    
      </div>
          
          
    </>)
}

export default Registro