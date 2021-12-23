import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ROL_PERSONA } from "constants/apiContants";

const MigaPanDocumentos = () => {
  const location = useLocation();
  return (
    <Dropdown size="sm" navbar={true}>
      <Dropdown.Toggle variant="link" split={true} id="dropdown-basic">
        Documentos y autorizaciones
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/autorizar"}
        >
          <Link to="/autorizaciones/autorizar">Registrar autorización</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/reporte-fecha"}
        >
          <Link to="/autorizaciones/reporte-fecha">
            Reporte de autorizaciones
          </Link>
        </Dropdown.Item>
        <Dropdown.Item active={location.pathname == "/autorizaciones/listado"}>
          <Link to="/autorizaciones/listado">Historico de autorizaciones</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/generar-certificado"}
        >
          <Link to="/autorizaciones/generar-certificado">
            Generar un certificado
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/lista-certificados"}
        >
          <Link to="/autorizaciones/lista-certificados">
            Historico de certificados
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/generar-remision"}
        >
          <Link to="/autorizaciones/generar-remision">Generar remisión</Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={
            location.pathname == "/autorizaciones/reporte-remisiones-fecha"
          }
        >
          <Link to="/autorizaciones/reporte-remisiones-fecha">
            Reporte de remisiones por fechas
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/lista-remisiones"}
        >
          <Link to="/autorizaciones/lista-remisiones">
            Historico de remisiones
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          active={location.pathname == "/autorizaciones/remision-masiva"}
        >
          <Link to="/autorizaciones/remision-masiva">
            Gerar remisiones masivamente
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MigaPanDocumentos;
