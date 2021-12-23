import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanAsignacionDocentes = () => {
  const location = useLocation();
  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Asignación docente
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={location.pathname == "/asignacion-docentes/listado"}
        >
          <Link to="/asignacion-docentes/listado">
            Ver todas las asignaciones
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/asignacion-docentes/asignar"}
        >
          <Link to="/asignacion-docentes/asignar">
            Registrar nueva asignación
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanAsignacionDocentes;
