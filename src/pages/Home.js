import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";
import { Card, CardDeck, Container, Row, Col } from "react-bootstrap";
import { FaTelegram, FaPhone, FaDownload, FaEnvelope, FaMapMarkerAlt, FaMap } from "react-icons/fa";
import { ACCESS_TOKEN_NAME, MODULES } from "../constants/apiContants";
import Footer from "../components/Footer";
import HeaderPage from "components/Header";

import { policyAllow } from "components/Policy";
import Slogan from "components/Slogan";
import { Chunk } from "utils";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import { useEffect } from "react";
import GoSite from "components/goSite";

const Home = () => {
  const history = useHistory();
  const [modulosPermitidos, setModulosPermitidos] = useState([]);
  const { policies } = useContext(Context);

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    history.replace("/login");
  };

  useEffect(() => {
    if (policies && policies.length) {
      const m = MODULES.filter((m) => {
        if (!m.policies) {
          return true;
        }
        return policyAllow(m.policies, policies);
      });
      setModulosPermitidos(
        Chunk(m, 3).map((m) => {
          const relleno = 3 - m.length;
          for (let i = 0; i < relleno; i++) {
            m.push({});
          }
          return m;
        })
      );
    } else {
      setModulosPermitidos([]);
    }
  }, [policies]);

  return (
    <>
      <HeaderPage showButton={true} homePage={true} />
      <div style={{backgroundAttachment: 'scroll'}}>
        <div
          className="landing-header"
          style={{ backgroundImage: "url(/images/landing.jpg)" }}
        >
          <div className="info">

            <div className="landing-header-buttons">
              <h1 style={{ textAlign: 'center', color: "#FFF", letterSpacing: "2px", fontSize: "28px" }}>
                BIENVENIDO
              </h1>
              <Slogan />
              <Container className="mt-4">
                {modulosPermitidos.map((modules, index) => (
                  <CardDeck key={index} style={{ marginBottom: 24 }}>
                    {modules.map((m, index2) => {
                      if (!m.name) {
                        return <Card className="empty-card" />;
                      }
                      return (
                        <Card
                          key={index2}
                          className="cardhome animate__animated animate__fadeInLeft"
                          style={{
                            animationDelay: `${index + index2 * 0.02}s`,
                            boxShadow: "3px 3px 3px 3px rgba(156, 156, 156, 0.1)",
                            border: 0,
                          }}
                        >
                          <Link to={m.url} className="link-card">
                            <Card.Img variant="top" src={m.img} />
                            <Card.Body>
                              <Card.Title style={{ fontWeight: 600 }}>{m.name}</Card.Title>
                              <Card.Text>{m.descripcion}</Card.Text>
                            </Card.Body>
                          </Link>
                        </Card>
                      );
                    })}
                  </CardDeck>
                ))}
              </Container>
            </div>
          </div>
          <div className="footer-home" style={{ paddingBottom: 7 }}>
            <Container style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Row style={{ marginTop: "6px" }}>
                <Col>
                  <span>
                    <h5 style={{ color: "#FFF" }}>
                      <span style={{ marginRight: "20px" }}>
                        Contáctenos:
                      </span>
                      <span style={{ marginRight: "20px" }}>
                        <FaPhone /> 3008010515
                      </span>
                      {" "}
                      <span style={{ marginRight: "20px" }}>
                        <a href={`mailto:correo@corre.com`} style={{ color: "#FFF" }}>
                          <FaEnvelope /> correo@corre.com
                        </a>
                      </span>
                      {" "}
                      <span style={{ marginRight: "20px" }}>
                        <FaMapMarkerAlt /> Carrera 43 # 50 - 53
                      </span>
                    </h5>
                  </span>
                </Col>
              </Row>
            </Container>
            {/* <Col>
              <GoSite />
            </Col> */}
            <GoSite style={{ float: 'right' }} />
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
