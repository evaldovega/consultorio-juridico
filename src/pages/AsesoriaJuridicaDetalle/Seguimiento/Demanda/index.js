import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import API from "utils/Axios";
import Policy, { policyAllow } from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "constants/apiContants";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import ArchivosDemanda from "./Archivos";

const Demanda = ({ show, setShow, asesoriaId, onSave, doc }) => {
  const [loading, setLoading] = useState(false);
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
  const archivo = watch("f_archivo");
  const handleClose = () => {
    setShow(false);
  };

  const anexoSeleccionado = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setValue("f_archivo", {
        f_archivo: reader.result,
        a_titulo: e.target.files[0].name,
      });
      e.target.value = "";
    };
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

  const guardar = async (payload) => {
    try {
      const archivoASubir = payload.f_archivo;
      delete payload.f_archivo;
      let archivoSubido = null;

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
      if (archivoASubir) {
        archivoSubido = await subirArchivo({
          ...archivoASubir,
          asesoriaId: data.r_asesoria_solicitudAsesoria,
          seguimiento: data.id,
        });
      }
      setCargando(false);
      setValue("f_archivo", "");
      setValue("t_observacion", "");
      setValue("t_respuesta", "");
      setValue("a_reparto", "");
      setValue("dt_fechaRadicacion", "");
      setValue("a_contraQuien", "");
      setValue("dt_fechaFallo", "");
      setShow(false);
      onSave({ ...data, archivoSubido });
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
      setValue("f_archivo", "");
      setValue("t_observacion", doc.t_observacion);
      setValue("t_respuesta", doc.t_respuesta);
      setValue("a_reparto", doc.a_reparto);
      setValue("dt_fechaRadicacion", doc.dt_fechaRadicacion);
      setValue("a_contraQuien", doc.a_contraQuien);
      setValue("dt_fechaFallo", doc.dt_fechaFallo);
    } else {
      setValue("f_archivo", "");
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
          <Context.Provider
            value={{ control, watch, errors, setValue, getValues, loading }}
          >
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
                      <Form.Control
                        {...field}
                        type="date"
                        // disabled={cargando || readOnly}
                        // plaintext={readOnly}
                      />
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
                      <Form.Control
                        {...field}
                        // disabled={cargando || readOnly}
                        // plaintext={readOnly}
                      />
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
                      <Form.Control
                        {...field}
                        // disabled={cargando || readOnly}
                        // plaintext={readOnly}
                      />
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
                      <Form.Control
                        {...field}
                        // disabled={cargando || readOnly}
                        // plaintext={readOnly}
                        type="date"
                      />
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
                        // disabled={cargando || readOnly}
                        // plaintext={readOnly}
                        as="textarea"
                        rows="6"
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
                        // disabled={cargando || readOnly}
                        // plaintext={readOnly}
                        as="textarea"
                        rows="6"
                      />
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
                        disabled={cargando || readOnly}
                        plaintext={readOnly}
                        as="textarea"
                        rows="6"
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
                        disabled={cargando || readOnly}
                        plaintext={readOnly}
                        as="textarea"
                        rows="6"
                      />
                    </Form.Group>
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Anexo</Form.Label>
                {archivo ? <p>{archivo.a_titulo}</p> : ""}
                <Form.Control
                  type="file"
                  onChange={anexoSeleccionado}
                  disabled={cargando || readOnly}
                  plaintext={readOnly}
                />
                <Controller
                  name="f_archivo"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <input {...field} type="hidden" />}
                />
              </Col>
            </Row>
          </Context.Provider>
        </Modal.Body>
        <Policy policy={[ROL_ASESOR, ROL_ADMIN, ROL_ESTUDIANTE]}>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={cargando}>
              Guardar
            </Button>
          </Modal.Footer>
        </Policy>
      </Form>
    </Modal>
  );
};

export default Demanda;
