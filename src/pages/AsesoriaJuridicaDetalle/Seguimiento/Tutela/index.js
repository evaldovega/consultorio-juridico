import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import API from "utils/Axios";

const Tutela = ({ show, setShow, asesoriaId, onSave, doc }) => {
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
        method,
        url,
        data: {
          c_tipoSeguimientoAccion: "TUTELA",
          r_asesoria_solicitudAsesoria: asesoriaId,
          ...payload,
        },
      });
      setCargando(false);
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("dt_fechaRadicacionTutela", "");
      setValue("a_entidadTutela", "");
      setValue("a_repartoPrimeraInstancia", "");

      setValue("dt_fechaFalloPrimeraInstancia", "");
      setValue("dt_fechaImpugnacion", "");
      setValue("a_falloSegundaInstancia", "");

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
      setValue("dt_fechaRadicacionTutela", doc.dt_fechaRadicacionTutela);
      setValue("a_entidadTutela", doc.a_entidadTutela);
      setValue("a_repartoPrimeraInstancia", doc.a_repartoPrimeraInstancia);
      setValue(
        "dt_fechaFalloPrimeraInstancia",
        doc.dt_fechaFalloPrimeraInstancia
      );
      setValue("dt_fechaImpugnacion", doc.dt_fechaImpugnacion);
      setValue("a_falloSegundaInstancia", doc.a_falloSegundaInstancia);
    } else {
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("dt_fechaRadicacionTutela", "");
      setValue("a_entidadTutela", "");
      setValue("a_repartoPrimeraInstancia", "");
      setValue("dt_fechaFalloPrimeraInstancia", "");
      setValue("dt_fechaImpugnacion", "");
      setValue("a_falloSegundaInstancia", "");
    }
  }, [show, doc]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Presentar tutela</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-2">
            <Col xs="12" md="6">
              <Controller
                name="dt_fechaRadicacionTutela"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Fecha de radicación <span className="required" />
                    </Form.Label>
                    <Form.Control {...field} type="date" disabled={cargando} />
                    <Errors
                      message={errors?.dt_fechaRadicacionTutela?.message}
                    />
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="6">
              <Controller
                name="a_entidadTutela"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese información" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>
                      Entidad a la que se presenta <span className="required" />
                    </Form.Label>
                    <Form.Control {...field} disabled={cargando} />
                    <Errors message={errors?.a_entidadTutela?.message} />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6">
              <Controller
                name="a_repartoPrimeraInstancia"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Reparto primera instancia</Form.Label>
                    <Form.Control {...field} disabled={cargando} />
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="6">
              <Controller
                name="dt_fechaFalloPrimeraInstancia"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Fallo primera instancia</Form.Label>
                    <Form.Control {...field} disabled={cargando} type="date" />
                  </Form.Group>
                )}
              />
            </Col>
          </Row>

          <Row>
            <Col xs="12" md="6">
              <Controller
                name="dt_fechaImpugnacion"
                control={control}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Fecha impugnación</Form.Label>
                    <Form.Control {...field} disabled={cargando} />
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs="12" md="6">
              <Controller
                name="a_falloSegundaInstancia"
                control={control}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Fallo segunda instancia</Form.Label>
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

export default Tutela;
