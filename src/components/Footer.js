import React from "react";
import { Space, Typography } from "antd";
import { SendOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaTelegram, FaPhone, FaDownload, FaEnvelope } from "react-icons/fa";

const Foot = () => {
  const bg = true;
  return (
    <div
      className="footer"
      style={{
        backdropFilter: "blur(10px)",
        backgroundImage: bg ? "url(/images/footer_blur.jpg)" : "",
      }}
    >
      <Container className="footer-content">
        <Row>
          <Col>
            <img
              src="https://www.uniatlantico.edu.co/uatlantico/sites/default/files/docencia/facultades/img/Consultorio%20Juridico.jpg"
              style={{ width: "80%", marginBottom: 32, borderRadius: 8 }}
            />
          </Col>
          <Col className="d-flex flex-column">
            <h4>
              <b>Contacto</b>
            </h4>
            <h5>Barranquilla, Colombia</h5>
            <h5>
              <FaPhone /> 3008010515
            </h5>
            <h5>
              {" "}
              <a href={`mailto:correo@corre.com`}>
                <FaEnvelope /> correo@corre.com
              </a>
            </h5>
          </Col>
          <Col className="d-flex flex-column">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.730904706196!2d-74.79201768439108!3d10.98367259218108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d65d1d5886d%3A0xf44f77995e043987!2sUniversidad%20del%20Atl%C3%A1ntico%20sede%20Centro!5e0!3m2!1ses-419!2sco!4v1622238032595!5m2!1ses-419!2sco"
              width="300"
              height="200"
              style={{ border: 0, borderRadius: 8 }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Col>
        </Row>
      </Container>
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
