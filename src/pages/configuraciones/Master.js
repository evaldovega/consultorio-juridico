import React from "react";
import Page from "components/Page";
import { Breadcrumb, Typography, Card, Space, Layout,Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const menuKeys=new Map()
menuKeys.set('/configuraciones/paises','1')
menuKeys.set('/configuraciones/tipos-de-documentos','2')
menuKeys.set('/configuraciones/generos','3')
menuKeys.set('/configuraciones/orientaciones-sexuales','4')
menuKeys.set('/configuraciones/cuentas-de-usuario','5')

const ConfiguracionesMaster = ({children}) => {
    const location=useLocation()
  return (
    <Page fullWidth={true}>
      <Layout>
        <Sider style={{width:10}} theme='light' width={300}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['datos-maestro']}
          selectedKeys={menuKeys.get(location.pathname)}
          style={{ height: '100%', borderRight: 0 }}
        >
            <SubMenu key='datos-maestro' icon={<UnorderedListOutlined/>} title='Datos maestros'>
                <Menu.Item key="1"><Link to='/configuraciones/paises'>Paises</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/configuraciones/tipos-de-documentos'>Tipos de documentos</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/configuraciones/generos'>Generos</Link></Menu.Item>
                <Menu.Item key="4"><Link to='/configuraciones/orientaciones-sexuales'>Orientaciones sexuales</Link></Menu.Item>
            </SubMenu>
            
            <Menu.Item key="5" icon={<UserOutlined />}><Link to='/configuraciones/cuentas-de-usuario'>Cuentas de usuario</Link></Menu.Item>
            
            </Menu>
        </Sider>
        <Content style={{padding:32}}>
          {children}
        </Content>
      </Layout>
    </Page>
  );
};

export default ConfiguracionesMaster;
