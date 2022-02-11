import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ADMIN,
  ROL_ESTUDIANTE,
  USER_FULL_NAME,
} from "../constants/apiContants";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaChild, FaCog, FaDownload, FaUserCircle, FaBook } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "./Policy/Ctx";
import Policy from "components/Policy"

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
      bg="light"
      fixed="top"
      variant="dark"
      expand="lg"
    >
      <Container fluid>

        <a href="/">
          <img
            src="https://www.uniatlantico.edu.co/uatlantico/sites/default/files/docencia/facultades/img/Consultorio%20Juridico.jpg"
            className="logo-home"
            style={{
              boxShadow: "2px 2px 2px 2px rgba(99, 99, 99, 0.4)"
            }}
          />
        </a>

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
                  <FaChild />
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
            </NavDropdown>
            <Policy policy={[ROL_ESTUDIANTE]}>
              <Nav.Link href="http://biblioteca.uniatlantico.edu.co/">
                <span style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <FaBook style={{marginRight: "2px"}} />
                  <span style={{fontWeight: 'bold'}}>Biblioteca</span>
                </span>
              </Nav.Link>
            </Policy>
            <NavDropdown
              title={
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  <FaUserCircle /> <b>{fullname}</b>
                  {/* <small
                    style={{ fontSize: 8, display: "block", marginLeft: 18 }}
                  >
                    {policies.join(",")}
                  </small> */}
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
