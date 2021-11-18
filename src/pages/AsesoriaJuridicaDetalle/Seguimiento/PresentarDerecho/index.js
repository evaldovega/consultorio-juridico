import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import API from "utils/Axios";

const PresentarDerecho = ({ show, setShow, asesoriaId, onSave, doc }) => {
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
          c_tipoSeguimientoAccion: "DERECHO_PETICION",
          r_asesoria_solicitudAsesoria: asesoriaId,
          ...payload,
        },
      });
      setCargando(false);
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("dt_fechaRadicacion", "");
      setValue("a_entidadPresentacion", "");
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
      setValue("dt_fechaRadicacion", doc.dt_fechaRadicacion);
      setValue("a_entidadPresentacion", doc.a_entidadPresentacion);
    } else {
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("dt_fechaRadicacion", "");
      setValue("a_entidadPresentacion", "");
    }
  }, [show, doc]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Presentar Derecho de petición</Modal.Title>
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
                name="a_entidadPresentacion"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Entidad a la que se presenta <span className="required" />
                    </Form.Label>
                    <Form.Control {...field} disabled={cargando} />
                    <Errors message={errors?.a_entidadPresentacion?.message} />
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
                    <Form.Label>
                      Respuesta <span className="required" />
                    </Form.Label>
                    <Form.Control
                      {...field}
                      disabled={cargando}
                      as="textarea"
                    />
                    <Errors message={errors?.t_respuesta?.message} />
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

export default PresentarDerecho;
