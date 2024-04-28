import { policyAllow } from "components/Policy";
import Spin from "components/Spin";
import { ROL_ADMIN, ROL_PERSONA } from "constants/apiContants";
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
  Alert,
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
  btnTextAdd = "Añadir",
  policies,
  persona,
  asesoriaDetail,
  citado,
  autoIncluir = false,
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

  const personaGuardada = ({ persona, success, feedback = true, errormsg = "No se pudo guardar la persona" }) => {
    if (success) {
      console.log({persona})
      setMostrarModal(false);
      const existe = fields.some((f) => f[[id]] == persona.id);
      if (existe && feedback) {
        toast.warn("Ya lo has añadido antes");
        return;
      }
      console.log({ [id]: persona.id });
      append({ [id]: persona.id });
    } else {
      toast.warn(errormsg);
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
    if (
      autoIncluir &&
      !idConciliacion &&
      policyAllow([ROL_PERSONA], policies)
    ) {
      personaGuardada({
        persona: { id: persona },
        success: true,
        feedback: false,
      });
    }
  }, [persona, policies]);

  useEffect(() => {
    if (asesoriaDetail) {
      personaGuardada({
        persona: { id: asesoriaDetail.r_usuarios_solicitante.id },
        success: true,
        feedback: false,
      });
    }
  }, [asesoriaDetail])

  useEffect(() => {
    console.log(policies)
  }, [])

  return (
    <Card className="mb-4">
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
          <PerfilMaster 
            callback={personaGuardada} 
            citado={citado}
            allowSearchPerson={policies.includes(ROL_ADMIN) ? true : false}
          />
        </Modal.Body>
      </Modal>
      <Card.Body style={{ padding: "2.5rem" }}>
        <h2>{title}</h2>
      </Card.Body>
      <Spin cargando={cargando}>
        <div className="partes">
          {fields.map((field, i) => (
            <Parte
              id={id}
              idConciliacion={idConciliacion}
              key={field.id}
              name={name}
              field={field}
              index={i}
              control={control}
              getValues={getValues}
              setValue={setValue}
              onRemove={onRemove}
            />
          ))}
        </div>
      </Spin>
      {!fields.length && (
        <Alert variant="light">
          Presiona "<b>{btnTextAdd}</b>" para añadir personas a esta sección.
        </Alert>
      )}
      <Card.Footer>
        <div className="d-flex justify-content-center">
          <Button type="button" onClick={abirFormularioPersona}>
            {btnTextAdd}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Partes;
