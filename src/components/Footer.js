import React from "react";
import { Space, Typography } from "antd";
import { SendOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaTelegram, FaPhone, FaDownload, FaEnvelope } from "react-icons/fa";
import GoSite from "components/goSite";

const Foot = () => {
  const bg = true;
  return (
    <div className="footer-home" style={{ paddingBottom: 7 }}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row style={{ marginTop: "6px" }}>
          <Col>
            <span>
              <h5 className="footer-text">
                <span style={{ marginRight: "20px" }}>Contáctenos:</span>
                <span style={{ marginRight: "20px" }}>
                  <FaPhone /> Línea de atención: PBX: (57) (5) 3162666
                </span>{" "}
                <span style={{ marginRight: "20px" }}>
                  <a
                    href={`mailto:correo@corre.com`}
                    style={{ color: "#FFF" }}
                  >
                    <FaEnvelope /> notificaciones@mail.uniatlantico.edu.co
                  </a>
                </span>{" "}
                <span style={{ marginRight: "20px" }}>
                  <FaMapMarkerAlt /> Carrera 43 # 50 - 53
                </span>
              </h5>
            </span>
          </Col>
        </Row>
      </Container>
      <GoSite style={{ float: "right" }} />
    </div>
  );
return (
  <div
    className="landing-footer"
    style={{ backgroundImage: "url(/images/footer.jpg)" }}
  >
    <Container>
      <div>
        <Typography.Paragraph></Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={4}>Contacto</Typography.Title>
        <Typography.Text>Barranquilla, Colombia</Typography.Text>
        <Space
          style={{ display: "flex", alignItems: "center" }}
          align="start"
        >
          <CustomerServiceOutlined size={32} style={{ color: "#ffff" }} />{" "}
          <Typography.Text>3008010515</Typography.Text>
        </Space>
        <Space
          style={{ display: "flex", alignItems: "center" }}
          align="start"
        >
          <SendOutlined size={32} style={{ color: "#ffff" }} />
          <a href={`mailto:correo@corre.com`}>
            <Typography.Text>correo@corre.com</Typography.Text>
          </a>
        </Space>
      </div>
      <div></div>
    </Container>
  </div>
);
};
export default Foot;
