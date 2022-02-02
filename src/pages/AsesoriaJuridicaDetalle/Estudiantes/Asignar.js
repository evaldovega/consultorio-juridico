import BuscadorEstudiante from "components/buscadorEstudiante";
import { Modal } from "react-bootstrap";

const AsignarEstudiante = ({ onSelect, visible, setVisible }) => {
  return (
    <>
      <Modal
        show={visible}
        onHide={() => setVisible(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={true}>Asignar estudiante</Modal.Header>
        <Modal.Body>
          <p>Escribe la cédula del estudiante a asignar</p>
          <BuscadorEstudiante onSelect={onSelect} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AsignarEstudiante;
