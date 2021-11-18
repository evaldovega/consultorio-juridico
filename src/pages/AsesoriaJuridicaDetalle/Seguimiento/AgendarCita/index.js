import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import API from "utils/Axios";
import { toast } from "react-toastify";
import moment from "moment";
import { dateForDateTimeInputValue } from "utils";

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
                      disabled={cargando}
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
                      disabled={cargando}
                    />
                    <Errors message={errors?.t_observacion?.message} />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={cargando}>
            Agendar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AgendarCita;
