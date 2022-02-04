import { Form, Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import moment from "moment";
import Policy from 'components/Policy'
import {
  ROL_ESTUDIANTE
} from 'constants/apiContants'

const Header = ({ actuacion, titulo = "", setEdit, optionView = true }) => {
  const { sys_fechaCreacion, b_requiereAprobacion, b_aprobado } = actuacion || {};
  return (
    <div className="cabecera d-flex justify-content-between">
      <span className="fecha">
        {b_requiereAprobacion && !b_aprobado && <span style={{color: 'red'}}>Pendiente por aprobar</span>}
        <br />
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
