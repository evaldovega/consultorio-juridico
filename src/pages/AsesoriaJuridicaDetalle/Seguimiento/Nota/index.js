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

const Nota = ({ show, setShow, asesoriaId, onSave, doc }) => {
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
  const [cargando, setCargando] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const { policies, persona } = useContext(Context);

  const handleClose = () => {
    setShow(false);
  };

  const guardar = async (payload) => {
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
          c_tipoSeguimientoAccion: "NOTA",
          dt_fechaNuevaCita: moment().format("YYYY-MM-DD HH:mm"),
          r_asesoria_solicitudAsesoria: asesoriaId,
          r_usuarios_persona: persona,
          ...payload,
        },
      });
      setCargando(false);
      setValue("t_observacion", "");
      setShow(false);
      onSave(data);
    } catch (error) {
      console.log(error);
      toast.error(error.toString());
      setCargando(false);
    }
  };

  const onError = () => {
    toast.warn("Error al ingresar información");
  };

  useEffect(() => {
    if (show && doc) {
      setValue("t_observacion", doc.t_observacion);
      if (doc && doc.r_usuarios_persona != persona) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    } else {
      setValue("t_observacion", "");
      setReadOnly(false);
    }
  }, [show, doc, persona]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Agendar nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs="12">
              <Controller
                name="t_observacion"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Observaciones <span className="required" />
                    </Form.Label>
                    <Form.Control
                      {...field}
                      as="textarea"
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                      rows="6"
                    />
                    <Errors message={errors?.t_observacion?.message} />
                  </Form.Group>
                )}
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
              Agregar
            </Button>
          </Modal.Footer>
        ) : null}
      </Form>
    </Modal>
  );
};

export default Nota;
