import React from 'react'
import {Menu,Layout,Dropdown,Space,Avatar,Typography,Card, Row, Col} from 'antd'
import {useHistory,Link} from 'react-router-dom'
import { ACCESS_TOKEN_NAME, MODULES, USER_FULL_NAME, ROL_ADMIN } from '../constants/apiContants';
import {
    UserOutlined,SettingFilled
  } from "@ant-design/icons";
import Policy from './Policy';
  const { Header } = Layout;
const HeaderPage=({showLogo=true})=>{
    const history=useHistory()
    const logout=()=>{
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        localStorage.removeItem(USER_FULL_NAME);
        history.replace('/login')
      }
    const menu=()=>(<Menu>
        <Menu.Item><Link to='/perfil'>Perfil</Link></Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item onClick={logout}>
            Salir
        </Menu.Item>
        </Menu>)
    return (
        <Header style={{ position: 'fixed', zIndex: 4, width: '100%',display:'flex' }} >
            {showLogo && <Space size="middle" align="center" style={{ marginRight: 16 }}>
              <Link to='/'><img src="/images/logow.png" style={{ width: 120 }} /></Link>
            </Space>}
            <Space align="center" style={{ marginLeft: "auto" }}>
              <Policy policy={[ROL_ADMIN]}>
              <Link to='/configuraciones' style={{display:'flex',justifyContent:'center',gap:12,alignItems:'center'}}><img src='/icons/engranaje.png' width={16} /> Configuraciones</Link>
              </Policy>
              
              <Dropdown overlay={menu} trigger={["click"]}>
                <Space size="small" align="end" style={{ marginLeft: 16 }}>
                  <Avatar icon={<UserOutlined />} />
                  <b style={{ color: "white" }}>{localStorage.getItem(USER_FULL_NAME)}</b>
                </Space>
              </Dropdown>
            </Space>
     </Header>
    )
}
export default HeaderPage