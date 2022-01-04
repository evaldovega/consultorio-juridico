import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";
import { Card, CardDeck, Container, Row, Col } from "react-bootstrap";
import {
  FaTelegram,
  FaPhone,
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMap,
} from "react-icons/fa";
import { ACCESS_TOKEN_NAME, MODULES } from "../constants/apiContants";
import Footer from "../components/Footer";
import HeaderPage from "components/Header";
import Foot from "../components/Footer";

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
      <div style={{ backgroundAttachment: "scroll" }}>
        <div
          className="landing-header"
          style={{ backgroundImage: "url(/images/landing.jpg)" }}
        >
          <div className="info">
            <div className="landing-header-buttons">
              <h1
                style={{
                  textAlign: "center",
                  color: "#000",
                  letterSpacing: "2px",
                  fontSize: "28px",
                }}
              >
                BIENVENIDO
              </h1>
              <h1
                style={{ lineHeight: "35px", fontSize: "28px", textAlign: 'center', color: "#000", paddingBottom: "20px" }}
                italic
              >
                <strong>Consultorio Jurídico</strong> y <strong>Centro de Conciliación</strong>
                <br />
                de la Universidad del Atlántico
              </h1>
              <Container className="mt-4 mb-4" style={{ paddingBottom: 80 }}>
                {modulosPermitidos.map((modules, index) => (
                  <CardDeck key={index} style={{ marginBottom: 24 }}>
                    {modules.map((m, index2) => {
                      if (!m.name) {
                        return <Card className="empty-card" />;
                      }
                      return (
                        <Card key={index2} className="cardhome">
                          <Link to={m.url} className="link-card">
                            <Card.Img variant="top" src={m.img} />
                            <Card.Body style={{padding: "20px"}}>
                              <Card.Title style={{ fontWeight: 600 }}>
                                {m.name}
                              </Card.Title>
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
          <Foot />
        </div>
      </div>
    </>
  );
};

export default Home;
