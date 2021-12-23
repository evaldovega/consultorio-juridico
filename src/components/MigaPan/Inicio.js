import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanInicio = () => {
  const location = useLocation();
  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Inicio
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Link to="/">Regresar al inicio</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          active={location.pathname.includes("/asesoria-juridica")}
        >
          <Link to="/asesoria-juridica">Ir a asesoria jurídica</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname.includes("/centro-de-conciliacion")}
        >
          <Link to="/centro-de-conciliacion">Ir al centro de conciliación</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname.includes("/inscripcion-estudiantes")}
        >
          <Link to="/inscripcion-estudiantes">
            Ir a inscripciones de estudiantes
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname.includes("/asignacion-docentes")}
        >
          <Link to="/asignacion-docentes">Ir a asignación de docentes</Link>
        </Dropdown.Item>
        <Dropdown.Item active={location.pathname.includes("/autorizaciones")}>
          <Link to="/autorizaciones">Ir a documentos y autorizaciones</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanInicio;
