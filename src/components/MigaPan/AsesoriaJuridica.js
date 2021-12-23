import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  ROL_PERSONA,
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
} from "constants/apiContants";
import { Context } from "components/Policy/Ctx";
import { useContext } from "react";
import Policy from "components/Policy";

const MigaPanAsesoriaJuridica = () => {
  const { policies } = useContext(Context);

  const location = useLocation();
  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Asesoria Jurídica
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/solicitudes"}
        >
          <Link to="/asesoria-juridica/solicitudes">
            Ver todas las solicitudes
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/asesoria-juridica/solicitar"}
        >
          <Link to="/asesoria-juridica/solicitar">
            Solicitar nueva asesoria
          </Link>
        </Dropdown.Item>
        <Policy policy={[ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE]}>
          <Dropdown.Item active={location.pathname.includes("/reportes")}>
            <Link to="/asesoria-juridica/reportes">Reportes</Link>
          </Dropdown.Item>
        </Policy>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanAsesoriaJuridica;
