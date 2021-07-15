import React, { useEffect, useState } from 'react'
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
  Carousel,
  Layout,
  message
} from "antd";
import { ACCESS_TOKEN_NAME, USER_FULL_NAME } from '../constants/apiContants';
import {Link} from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import GoSite from 'components/goSite';
import {DownloadOutlined} from "@ant-design/icons";
import API from 'utils/Axios';
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const { Header, Footer, Sider, Content } = Layout;

const Login=({location,history})=>{

  const recaptchaRef = React.useRef();
  const [loading,setLoading]=useState(false)
    const onFinish=async (data)=>{
      setLoading(true)
      API.post('auth-user/',data).then(({data})=>{
        localStorage.setItem(ACCESS_TOKEN_NAME,data.access_token)
        localStorage.setItem(USER_FULL_NAME,data.fullname)
        history.replace(location && location.state && location.state.from ? location.state.from.pathname : '/')
      }).catch(error=>{
        console.log(error.response)
        message.error(error.response && error.response.data ? error.response.data.detail : error.toString())
      }).finally(()=>{
        setLoading(false)
      })
    }

    useEffect(()=>{
      localStorage.removeItem(ACCESS_TOKEN_NAME)
    },[])
    return (<>

    <div style={{position:'fixed',width:'100%',height:'100%'}}>
      
    <Carousel effect='fade' autoplay={true} dotPosition='left'>
      <div className='cover-black'>
        <img src='https://www.uniatlantico.edu.co/uatlantico/sites/default/files/sede_centro_ua.jpg'/>
      </div>
      <div className='cover-black'>
        <img src='https://uniatlantico.edu.co/uatlantico/sites/default/files/DSC06468.JPG'/>
      </div>
    </Carousel>
    </div>
    <GoSite style={{position:'absolute',top:16,left:16}}/>
    
    <div style={{position:'absolute',bottom:42,left:0,display:'flex',justifyContent:'center',flexDirection:'column',backgroundColor:'rgba(0,0,0,.5)',padding:16}}>
        <Typography.Paragraph style={{color:'#ffff'}}>Política de acceso para personas que <br></br>presenten discapacidad visual o auditiva</Typography.Paragraph>
        <Button type='primary' icon={<DownloadOutlined/>} href='https://convertic.gov.co/641/w3-propertyvalue-15308.html' target='blank'>Descargar herramientas</Button>
    </div>
    
    <ReCAPTCHA ref={recaptchaRef} style={{position:'absolute',bottom:42,right:0}}
          sitekey="AIzaSyCnU94fBKc0rKYki_MqbQDLPil-fHN_P2k"
        />
        <div style={{display:'flex',width:'100%',height:'100vh',justifyContent:'center',alignItems:'center'}}>
        <Spin spinning={loading}>
      <div className='card-login'>
        <img src='https://www.uniatlantico.edu.co/uatlantico/sites/default/files/docencia/facultades/img/Consultorio%20Juridico.jpg' className='logo' style={{maxWidth:'100%',marginBottom:32}}/>
        <div className='card-login-content'>
            <Typography.Title level={4} style={{textAlign:'center',marginBottom:32}}>Bienvenido</Typography.Title>
            <Form
              name="basic"
              initialValues={{
                remember: true,
                username: "",
                password: "",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su E-mail",
                  },
                ]}
              >
                <Input  placeholder="Nombre de usuario" />
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
                <Input.Password placeholder="Contraseña" />
              </Form.Item>
              
              <Form.Item style={{marginTop:42}}>
                <Button type="primary" block htmlType="submit">
                  Acceder
                </Button>
              </Form.Item>
              <div style={{marginTop:96,textAlign:'center'}}>
              <Link to='/registrarse' style={{flex:1}} className='link-blue'>Registrarse</Link> 
              <span style={{marginLeft:8,marginRight:8}}>|</span>
               <Link style={{flex:1,textAlign:'right'}} to='recuperar-clave' className='link-blue'>Olvidé la contraseña</Link>
              </div>
            </Form>
            </div>
      </div>
      </Spin>
      </div>
    </>)
}

export default Login