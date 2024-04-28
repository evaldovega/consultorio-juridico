import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanCentroConciliacionReportes = () => {
  const location = useLocation();

  const menuItems = [
    // {
    //   "title": "Listado de Registrados",
    //   "sufijo": "ciudadanos-fecha",
    //   "grafica": false
    // },
    {
      "title": "Por sexo",
      "sufijo": "sexo",
      "grafica": true
    },
    {
      "title": "Por edad",
      "sufijo": "edad",
      "grafica": true
    },
    {
      "title": "Por vulnerabilidad",
      "sufijo": "vulnerabilidad",
      "grafica": true
    },
    {
      "title": "Por nivel educativo",
      "sufijo": "nivel_educativo",
      "grafica": true
    },
    {
      "title": "Por etnia",
      "sufijo": "etnia",
      "grafica": true
    },
    // {
    //   "title": "Por discapacidad",
    //   "sufijo": "discapacidad",
    //   "grafica": true
    // },
    {
      "title": "Por orientación sexual",
      "sufijo": "orientacion_sexual",
      "grafica": true
    },
    {
      "title": "Por desempleo",
      "sufijo": "desempleo",
      "grafica": true
    },
    {
      "title": "Por profesión",
      "sufijo": "profesion",
      "grafica": true
    },
  ]

  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Reportes
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {menuItems.map((item, index) => (
          <Dropdown.Item
            key={index}
            active={location.pathname == `/centro-de-conciliacion/${item.grafica ? 'reportes_grafica' : 'reportes'}/${item.sufijo}`}
          >
            <Link to={`/centro-de-conciliacion/${item.grafica ? 'reportes_grafica' : 'reportes'}/${item.sufijo}`}>{item.title}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanCentroConciliacionReportes;
