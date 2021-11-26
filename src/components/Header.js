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
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FaAccessibleIcon, FaCog } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "./Policy/Ctx";
import { Button } from "bootstrap";

const HeaderPage = ({ showButton, homePage }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(USER_FULL_NAME);
    history.replace("/login");
  };
  const { fullname } = useContext(Context);
  const [scrollPos, setScrollPos] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <Navbar bg={homePage ? (scrollPos > 639 ? "dark" : "light") : "dark"} fixed="top" variant="dark" expand="lg">
      <Container fluid>
        {showButton ? (
          <GoSite style={{ marginRight: 8 }} />
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
                  }}
                >
                  <FaAccessibleIcon /> <span>Accesibilidad</span>
                </span>
              }
              id="basic-nav-dropdown0"
            >
              <NavDropdown.ItemText>
                Herramienta de política de acceso para las personas que presentan discapacidad visual o auditiva
              </NavDropdown.ItemText>
              <NavDropdown.Item href="#action/3.1">Descargar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span>
                  <FaCog /> Configuración
                </span>
              }
              id="basic-nav-dropdown1"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={fullname} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/perfil">Perfil</Link>
              </NavDropdown.Item>

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
