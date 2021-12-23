import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanAsesoriaJuridicaReportes = () => {
  const location = useLocation();

  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Reportes
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/reportes/casos"}
        >
          <Link to="/asesoria-juridica/reportes/casos">Historico de casos</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={
            location.pathname == "/asesoria-juridica/reportes/registrados"
          }
        >
          <Link to="/asesoria-juridica/reportes/registrados">
            Historico de inscripciones
          </Link>
        </Dropdown.Item>

        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/reportes/sexo"}
        >
          <Link to="/asesoria-juridica/reportes/sexo">Por sexo</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/reportes/edad"}
        >
          <Link to="/asesoria-juridica/reportes/edad">Por edad</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={
            location.pathname == "/asesoria-juridica/reportes/discapacidad"
          }
        >
          <Link to="/asesoria-juridica/reportes/discapacidad">
            Por discapacidad
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={
            location.pathname == "/asesoria-juridica/reportes/orientacion"
          }
        >
          <Link to="/asesoria-juridica/reportes/orientacion">
            Por orientación sexual
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/reportes/desempleo"}
        >
          <Link to="/asesoria-juridica/reportes/desempleo">Por desempleo</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/reportes/profesion"}
        >
          <Link to="/asesoria-juridica/reportes/profesion">Por prefesión</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={
            location.pathname == "/asesoria-juridica/reportes/lugar-practicas"
          }
        >
          <Link to="/asesoria-juridica/reportes/lugar-practicas">
            Por lugar de practicas
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/reportes/etnia"}
        >
          <Link to="/asesoria-juridica/reportes/etnia">Por etnia</Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanAsesoriaJuridicaReportes;
