import Spin from "components/Spin";
import PerfilMaster from "pages/Perfil/Master";
import { useEffect } from "react";
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
import { useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import API from "utils/Axios";
import Parte from "./Parte";

const Partes = ({
  id,
  title,
  name,
  control,
  setValue,
  getValues,
  idConciliacion,
  apiDelete,
}) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
    }
  );

  const abirFormularioPersona = () => {
    setMostrarModal(true);
  };

  const handleClose = () => {
    setMostrarModal(false);
  };

  const personaGuardada = ({ persona, success }) => {
    if (success) {
      setMostrarModal(false);
      const existe = fields.some((f) => f[[id]] == persona.id);
      if (existe) {
        toast.warn("Ya lo has añadido antes");
        return;
      }
      console.log({ [id]: persona.id });
      append({ [id]: persona.id });
    } else {
      toast.warn("No se pudo guardar la persona");
    }
  };

  const onRemove = async (idPersona) => {
    const index = fields.findIndex((f) => f[[id]] == idPersona);
    try {
      if (idConciliacion) {
        if (fields.length - 1 <= 0) {
          toast.warning("No puedes borrar todas las partes");
          return;
        }
        const idRow = fields[index].id;
        setCargando(true);
        await API.delete(`${apiDelete}${idRow}/`);
        setCargando(false);
        toast.success("Registro borrado");
      }
      remove(index);
    } catch (error) {
      console.log(error);
      setCargando(false);
    }
  };

  useEffect(() => {
    console.log({ fields });
  }, [fields]);

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
          <span>{title}</span>
        </h2>
        <Spin cargando={cargando}>
          {fields.map((field, i) => (
            <Parte
              id={id}
              idConciliacion={idConciliacion}
              key={`${id}-${i}`}
              name={name}
              field={field}
              index={i}
              control={control}
              getValues={getValues}
              setValue={setValue}
              onRemove={onRemove}
            />
          ))}
          <div className="d-flex justify-content-end">
            <Button type="button" onClick={abirFormularioPersona}>
              {fields.length > 0 ? "Añadir otro" : "Añadir"}
            </Button>
          </div>
        </Spin>
      </Card.Body>
    </Card>
  );
};

export default Partes;
