import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanInscripcionEstudiante = () => {
  const location = useLocation();
  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Inscripción estudiantes
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={location.pathname == "/inscripcion-estudiantes/listado"}
        >
          <Link to="/inscripcion-estudiantes/listado">
            Ver todas las inscripciones
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={
            location.pathname ==
            "/inscripcion-estudiantes/inscripcion-practicas"
          }
        >
          <Link to="/inscripcion-estudiantes/inscripcion-practicas">
            Registrar nueva inscripción
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/inscripcion-estudiantes/reporte"}
        >
          <Link to="/inscripcion-estudiantes/reporte">Reportes</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanInscripcionEstudiante;
