import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  USER_FULL_NAME,
} from "../constants/apiContants";
import { UserOutlined } from "@ant-design/icons";
import Policy from "./Policy";
import GoSite from "components/goSite";
import {
  Button,
  Card,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { FaChild, FaCog, FaDownload, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "./Policy/Ctx";

const HeaderPage = ({ showButton, homePage }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(USER_FULL_NAME);
    history.replace("/login");
  };
  const { fullname, policies = [] } = useContext(Context);
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      bg={homePage ? (scrollPos > 639 ? "dark" : "light") : "dark"}
      fixed="top"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        {showButton ? (
          <img
            src="https://www.uniatlantico.edu.co/uatlantico/sites/default/files/docencia/facultades/img/Consultorio%20Juridico.jpg"
            className="logo-home"
          />
        ) : (
          <a href="/">
            <img src="/images/logow.png" style={{ width: "80px" }} />
          </a>
        )}
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown
              title={
                <span
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    justifyItems: "center",
                    fontSize: "16px",
                  }}
                >
                  <FaChild />{" "}
                  <span>
                    <b>Accesibilidad</b>
                  </span>
                </span>
              }
              id="basic-nav-dropdown0"
            >
              <NavDropdown.ItemText style={{ width: "250px" }}>
                Herramienta de política de acceso para las personas que
                presentan discapacidad visual o auditiva.
                <br />
                <Button
                  type="primary"
                  href="https://convertic.gov.co/641/w3-propertyvalue-15308.html"
                  target="blank"
                  style={{ marginTop: "10px" }}
                >
                  <FaDownload /> <b>Descargar</b>
                </Button>
              </NavDropdown.ItemText>
              {/* <NavDropdown.ItemText>
                Herramienta de política de acceso para las personas que presentan discapacidad visual o auditiva

              </NavDropdown.ItemText>
              <NavDropdown.Item href="#action/3.1">
                <Button
                  type="primary"
                  href="https://convertic.gov.co/641/w3-propertyvalue-15308.html"
                  target="blank"
                >
                  <FaDownload /> Descargar herramientas
                </Button>
              </NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown
              title={
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  <FaCog /> <b>Configuración</b>
                </span>
              }
              id="basic-nav-dropdown1"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  <FaUserCircle /> <b>{fullname}</b>
                  <small
                    style={{ fontSize: 8, display: "block", marginLeft: 18 }}
                  >
                    {policies.join(",")}
                  </small>
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Salir</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderPage;
