import { Form, Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import moment from "moment";

const Header = ({ actuacion, titulo = "", setEdit }) => {
  const { sys_fechaCreacion } = actuacion || {};
  return (
    <div className="d-flex justify-content-between">
      <b>{sys_fechaCreacion ? moment(sys_fechaCreacion).format("LLL") : ""}</b>
      <Button
        className="btn-sm"
        variant="link"
        onClick={() => setEdit(actuacion)}
      >
        Editar {titulo}
      </Button>
    </div>
  );
};
export default Header;
