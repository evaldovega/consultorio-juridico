import React from 'react'
import {Menu,Layout,Dropdown,Space,Avatar,Typography,Card, Row, Col} from 'antd'

import {useHistory,Link} from 'react-router-dom'
import { Content } from 'antd/lib/layout/layout';
import { ACCESS_TOKEN_NAME, MODULES } from '../constants/apiContants';
import Footer from '../components/Footer';
import HeaderPage from 'components/Header';
import GoSite from 'components/goSite';
import Policy from 'components/Policy';
import Slogan from 'components/Slogan';
const {Meta}=Card
const { Header } = Layout;

const Home=(props)=>{
    
    const history=useHistory()
    const logout=()=>{
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      history.replace('/login')
    }
   
  const des='es simplemente el texto de relleno de las imprentas y archivos de texto.'
    const menu=()=>(<Menu>
        <Menu.Item>Perfil</Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item onClick={logout}>
            Salir
        </Menu.Item>
        </Menu>)
    return (
      <>
        <div
          className="landing-header"
          style={{ backgroundImage: "url(images/landing.jpg)" }}
        >
          <GoSite style={{ position: "absolute", top: 16, left: 16 }} />
          <HeaderPage showLogo={false} />

          <div className="info">
            <img src="images/logow.png" style={{ width: "50%" }} />
            <div className="divider" style={{ marginTop: 37 }}></div>
            <Slogan/>
          </div>
        </div>

        <div className="content-body">
          <div className="section-title">
            <Typography.Title level={4}>Módulos</Typography.Title>
            <Typography.Paragraph>
              Escoge el módulo según tu necesidad.
            </Typography.Paragraph>
          </div>
          <div style={{ animationDelay: 0.2 }} className="grid-2">
            {MODULES.map((m, i) => (
              <Policy policy={m.policies}>
              <Link to={m.url}>
                <Card
                  hoverable
                  className="card-module animate__animated animate__fadeInLeft"
                  style={{ animationDelay: `${i * 0.2}s`, width: "100%" }}
                  cover={<img src={m.img} />}
                >
                  <Meta title={m.name}  />
                </Card>
              </Link>
              </Policy>
              
            ))}
          </div>
        </div>

        <Footer />
      </>
    );
}

export default Home