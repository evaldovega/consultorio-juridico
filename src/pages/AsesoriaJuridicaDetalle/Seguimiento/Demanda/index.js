import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import API from "utils/Axios";

const Demanda = ({ show, setShow, asesoriaId, onSave, doc }) => {
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
      setCargando(true);
      const method = doc ? "patch" : "post";
      const url = doc
        ? `asesorias/seguimiento/${doc.id}/`
        : "asesorias/seguimiento/";

      const { data } = await API({
        url,
        method,
        data: {
          c_tipoSeguimientoAccion: "DEMANDA",
          r_asesoria_solicitudAsesoria: asesoriaId,
          ...payload,
        },
      });
      setCargando(false);
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("a_reparto", "");
      setValue("dt_fechaRadicacion", "");
      setValue("a_contraQuien", "");
      setValue("dt_fechaFallo", "");
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
      setValue("t_respuesta", doc.t_respuesta);
      setValue("a_reparto", doc.a_reparto);
      setValue("dt_fechaRadicacion", doc.dt_fechaRadicacion);
      setValue("a_contraQuien", doc.a_contraQuien);
      setValue("dt_fechaFallo", doc.dt_fechaFallo);
    } else {
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("a_reparto", "");
      setValue("dt_fechaRadicacion", "");
      setValue("a_contraQuien", "");
      setValue("dt_fechaFallo", "");
    }
  }, [show, doc]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Presentar demanda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col xs="12" md="6">
              <Controller
                name="dt_fechaRadicacion"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Fecha de radicación <span className="required" />
                    </Form.Label>
                    <Form.Control {...field} type="date" disabled={cargando} />
                    <Errors message={errors?.dt_fechaRadicacion?.message} />
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="6">
              <Controller
                name="a_contraQuien"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Contra quien <span className="required" />
                    </Form.Label>
                    <Form.Control {...field} disabled={cargando} />
                    <Errors message={errors?.a_contraQuien?.message} />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6">
              <Controller
                name="a_reparto"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Reparto</Form.Label>
                    <Form.Control {...field} disabled={cargando} />
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="6">
              <Controller
                name="dt_fechaFallo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Fallo</Form.Label>
                    <Form.Control {...field} disabled={cargando} type="date" />
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
                      disabled={cargando}
                      as="textarea"
                    />
                    <Errors message={errors?.t_observacion?.message} />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Controller
                name="t_respuesta"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Respuesta</Form.Label>
                    <Form.Control
                      {...field}
                      disabled={cargando}
                      as="textarea"
                    />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={cargando}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Demanda;
