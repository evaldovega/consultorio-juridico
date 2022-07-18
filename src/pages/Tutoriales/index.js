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
import { VIDEOS } from "constants/apiContants";
import HeaderPage from "components/Header";
import Foot from "components/Footer";

import { policyAllow } from "components/Policy";
import Slogan from "components/Slogan";
import { Chunk } from "utils";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import { useEffect } from "react";
import GoSite from "components/goSite";

const Tutoriales = () => {
  const history = useHistory();
  const [modulosPermitidos, setModulosPermitidos] = useState([]);
  const { policies } = useContext(Context);

  useEffect(() => {
    console.log(VIDEOS)
    const m = VIDEOS;
    setModulosPermitidos(
      Chunk(m, 3).map((m) => {
        const relleno = 3 - m.length;
        for (let i = 0; i < relleno; i++) {
          m.push({});
        }
        return m;
      })
    );
  }, []);

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
                style={{ lineHeight: "35px", fontSize: "28px", textAlign: 'center', color: "#000" }}
                italic
              >
                <strong>TUTORIALES</strong>
              </h1>
              <Container className="mt-4 mb-4">
                {modulosPermitidos.map((modules, index) => (
                  <CardDeck key={index} style={{ marginBottom: 24 }}>
                    {modules.map((m, index2) => {
                      if (!m.name) {
                        return <Card className="empty-card" />;
                      }
                      return (
                        <Card key={index2} className="cardhome">
                          <a href={m.url} className="link-card">
                            <Card.Img variant="top" src={m.img} />
                            <Card.Body style={{padding: "20px"}}>
                              <Card.Title style={{ fontWeight: 600 }}>
                                {m.name}
                              </Card.Title>
                              <Card.Text>{m.descripcion}</Card.Text>
                            </Card.Body>
                          </a>
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

export default Tutoriales;
