import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanConciliacion = () => {
  const location = useLocation();
  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Centro de conciliación
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={location.pathname == "/centro-de-conciliacion/solicitudes"}
        >
          <Link to="/centro-de-conciliacion/solicitudes">
            Ver todas las conciliaciones
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/centro-de-conciliacion/registrar"}
        >
          <Link to="/centro-de-conciliacion/registrar">
            Solicitar nueva conciliación
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanConciliacion;
