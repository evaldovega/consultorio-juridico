import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import API from "utils/Axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useEffect } from "react";
import Policy, { policyAllow } from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
  ROL_DOCENTE,
} from "constants/apiContants";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import ZonaArchivo from "components/ZonaArchivo";

const Anexo = ({ mostrarModal, setMostrarModal, asesoriaId, onSave, doc }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const { policies, persona } = useContext(Context);
  const [cargando, setCargando] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const handleClose = () => {
    setMostrarModal("");
  };

  const subirArchivo = async ({
    f_archivo,
    a_titulo,
    asesoriaId,
    seguimiento,
  }) => {
    try {
      const { data } = await API.post(`asesorias/docsanexos/`, {
        f_archivo,
        a_titulo,
        b_reservaLegal: false,
        r_usuarios_persona: persona,
        r_asesoria_solicitudAsesoria: asesoriaId,
        r_asesoria_seguimientoAsesoria: seguimiento,
      });
      return data;
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const guardar = async () => {
    try {
      setCargando(true);
      const method = doc ? "patch" : "post";
      const url = doc
        ? `asesorias/seguimiento/${doc.id}/`
        : "asesorias/seguimiento/";
      const { data } = await API({
        method,
        url,
        data: {
          c_tipoSeguimientoAccion: "ANEXO",
          r_asesoria_solicitudAsesoria: asesoriaId,
          r_usuarios_persona: persona,
        },
      });
      const { f_archivo } = getValues();
      const archivoSubido = await subirArchivo({
        ...f_archivo,
        asesoriaId: data.r_asesoria_solicitudAsesoria,
        seguimiento: data.id,
      });

      setCargando(false);
      setValue("f_archivo", "");
      setMostrarModal("");
      onSave({ ...data, archivoSubido });
    } catch (error) {
      toast.error(error.toString());
      setCargando(false);
    }
  };

  const onError = () => {
    toast.warn("Error al ingresar información");
  };

  const anexoSeleccionado = (a) => {
    setValue("f_archivo", a);
  };

  useEffect(() => {
    if (mostrarModal && doc) {
      setValue("f_archivo", doc.f_archivo);
      if (doc && doc.r_usuarios_persona != persona) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    } else {
      setValue("f_archivo", "");
      setReadOnly(false);
    }
  }, [mostrarModal, doc, persona]);

  return (
    <Modal
      show={mostrarModal == "ANEXO"}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Adjuntar anexo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <ZonaArchivo onArchivo={anexoSeleccionado} />
              <Controller
                name="f_archivo"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="hidden" />}
              />
            </Col>
          </Row>
        </Modal.Body>
        {!readOnly ? (
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              disabled={cargando || readOnly}
            >
              Guardar
            </Button>
          </Modal.Footer>
        ) : null}
      </Form>
    </Modal>
  );
};

export default Anexo;
