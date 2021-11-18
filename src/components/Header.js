import React from "react";
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

const HeaderPage = ({ showLogo = true }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(USER_FULL_NAME);
    history.replace("/login");
  };
  const { fullname } = useContext(Context);

  return (
    <Navbar bg="dark" fixed="top" variant="dark" expand="lg">
      <Container fluid>
        <GoSite style={{ marginRight: 8 }} />
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
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
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
