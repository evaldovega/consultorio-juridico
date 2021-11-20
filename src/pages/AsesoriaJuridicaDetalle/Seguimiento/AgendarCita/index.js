import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import API from "utils/Axios";
import { toast } from "react-toastify";
import moment from "moment";
import { dateForDateTimeInputValue } from "utils";
import Policy, { policyAllow } from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "constants/apiContants";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";

const AgendarCita = ({ show, setShow, asesoriaId, onSave, doc }) => {
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
  const [readOnly, setReadOnly] = useState(true);
  const { policies } = useContext(Context);

  const handleClose = () => {
    setShow(false);
  };

  const guardar = async (payload) => {
    try {
      payload.dt_fechaNuevaCita = moment(payload.dt_fechaNuevaCita).format(
        "YYYY-MM-DD HH:mm"
      );
      setCargando(true);
      const method = doc ? "patch" : "post";
      const url = doc
        ? `asesorias/seguimiento/${doc.id}/`
        : "asesorias/seguimiento/";
      const { data } = await API({
        url,
        method,
        data: {
          c_tipoSeguimientoAccion: "CITA",
          r_asesoria_solicitudAsesoria: asesoriaId,
          ...payload,
        },
      });
      setCargando(false);

      setValue("dt_fechaNuevaCita", "");
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
      setValue(
        "dt_fechaNuevaCita",
        dateForDateTimeInputValue(new Date(doc.dt_fechaNuevaCita))
      );
      setValue("t_observacion", doc.t_observacion);
    } else {
      setValue("dt_fechaNuevaCita", "");
      setValue("t_observacion", "");
    }
  }, [show, doc]);

  useEffect(() => {
    if (policies && policies.length) {
      if (policyAllow([ROL_PERSONA], policies)) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    } else {
      setReadOnly(true);
    }
  }, [policies]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Agendar cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col xs="12">
              <Controller
                name="dt_fechaNuevaCita"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Fecha y hora <span className="required" />
                    </Form.Label>
                    <Form.Control
                      {...field}
                      type="datetime-local"
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                    />
                    <Errors message={errors?.dt_fechaNuevaCita?.message} />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>
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
                      rows="6"
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                    />
                    <Errors message={errors?.t_observacion?.message} />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Policy policy={[ROL_ASESOR, ROL_ADMIN, ROL_ESTUDIANTE]}>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={cargando}>
              Agendar
            </Button>
          </Modal.Footer>
        </Policy>
      </Form>
    </Modal>
  );
};

export default AgendarCita;
