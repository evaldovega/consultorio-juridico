import { Form, Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import moment from "moment";

const Header = ({ actuacion, titulo = "", setEdit, optionView = true }) => {
  const { sys_fechaCreacion } = actuacion || {};
  return (
    <div className="cabecera d-flex justify-content-between">
      <span className="fecha">
        {sys_fechaCreacion ? moment(sys_fechaCreacion).format("LLL") : ""}
      </span>
      {optionView ? (
        <Button
          className="btn-sm"
          variant="link"
          onClick={() => setEdit(actuacion)}
        >
          Ver {titulo}
        </Button>
      ) : null}
    </div>
  );
};
export default Header;
