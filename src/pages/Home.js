import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";
import { Card, CardDeck, Container } from "react-bootstrap";
import { ACCESS_TOKEN_NAME, MODULES } from "../constants/apiContants";
import Footer from "../components/Footer";
import HeaderPage from "components/Header";

import { policyAllow } from "components/Policy";
import Slogan from "components/Slogan";
import { Chunk } from "utils";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import { useEffect } from "react";

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
      <div
        className="landing-header"
        style={{ backgroundImage: "url(/images/landing.jpg)" }}
      >
        <div className="info">
          <img src="images/logow.png" style={{ width: "50%" }} />
          <div className="divider" style={{ marginTop: 37 }}></div>
          <Slogan />
        </div>
      </div>

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
                  className="animate__animated animate__fadeInLeft"
                  style={{ animationDelay: `${index + index2 * 0.02}s` }}
                >
                  <Link to={m.url} className="link-card">
                    <Card.Img variant="top" src={m.img} />
                    <Card.Body>
                      <Card.Title style={{fontWeight: 600}}>{m.name}</Card.Title>
                      <Card.Text>{m.descripcion}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              );
            })}
          </CardDeck>
        ))}
      </Container>

      <Footer />
    </>
  );
};

export default Home;
