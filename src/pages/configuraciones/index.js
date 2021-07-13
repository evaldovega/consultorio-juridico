import React from "react";
import Page from "components/Page";
import { Breadcrumb, Typography, Card, Space, Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ConfiguracionesMaster from "./Master";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const DatosMaestros = ({ children }) => {
  return (
    <Page>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Inicio</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Configuraciones</Breadcrumb.Item>
      </Breadcrumb>

      <div className="section-title">
        <Typography.Title level={4}>Configuraciones</Typography.Title>
        <Typography.Paragraph>
          Personaliza cada aspecto del consultorio jurídico
        </Typography.Paragraph>
      </div>
      
        <div
          style={{
            animationDelay: 0.2,
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Link to="/configuraciones/paises">
            <Card className="card-small">
              <Space style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/icons/file.png"
                  width={42}
                  style={{ marginRight: 12, marginLeft: 12 }}
                />
                <Typography.Title level={5}>
                  Datos maestros
                </Typography.Title>
              </Space>
            </Card>
          </Link>
        </div>
      
    </Page>
  );
};

export default DatosMaestros;
