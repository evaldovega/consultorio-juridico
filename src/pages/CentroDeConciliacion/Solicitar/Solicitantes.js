import PerfilMaster from "pages/Perfil/Master";
import { useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Solicitante from "./Solicitante";

const Solicitantes = ({ control, setValue, getValues, watch }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [listado, setListado] = useState([]);
  const solicitantes = watch("solicitantes", []);

  const abirFormularioPersona = () => {
    setMostrarModal(true);
  };
  const handleClose = () => {
    setMostrarModal(false);
  };
  const personaGuardada = ({ persona, success }) => {
    if (success) {
      console.log(persona);
      setMostrarModal(false);
      setListado([...listado, { persona }]);
    } else {
      toast.warn("No se pudo guardar la persona");
    }
  };
  return (
    <Card className="mt-1 mb-1">
      <Modal
        show={mostrarModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Añadir persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PerfilMaster callback={personaGuardada} />
        </Modal.Body>
      </Modal>
      <Card.Body style={{ padding: "2.5rem" }}>
        <h2 className="title-line">
          <span>Solicitantes</span>
        </h2>
        {listado.map((l, i) => (
          <Solicitante
            data={l}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        ))}
        <Button type="button" onClick={abirFormularioPersona}>
          Añadir solicitante
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Solicitantes;
