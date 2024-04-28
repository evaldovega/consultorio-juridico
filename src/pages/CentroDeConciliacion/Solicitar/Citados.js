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
import Solicitante from "./Parte";

const Citados = ({ control, setValue, getValues, watch }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [listado, setListado] = useState([]);

  const abirFormularioPersona = () => {
    setMostrarModal(true);
  };
  const handleClose = () => {
    setMostrarModal(false);
  };
  const personaGuardada = ({ persona, success, error }) => {
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
        size="lg"
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
          <span>Citados</span>
        </h2>
        {listado.map((l, i) => (
          <Solicitante
            key={i}
            data={l}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        ))}
        <Button type="button" onClick={abirFormularioPersona}>
          Añadir citado
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Citados;
