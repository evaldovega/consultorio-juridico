import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import API from "utils/Axios";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import Policy, { policyAllow } from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
} from "constants/apiContants";

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
        method,
        url,
        data: {
          c_tipoSeguimientoAccion: "TUTELA",
          r_asesoria_solicitudAsesoria: asesoriaId,
          r_usuarios_persona: persona,
          b_requiereAprobacion: true,
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
      setValue("dt_fechaRadicacionTutela", "");
      setValue("a_entidadTutela", "");
      setValue("a_repartoPrimeraInstancia", "");

      setValue("dt_fechaFalloPrimeraInstancia", "");
      setValue("dt_fechaImpugnacion", "");
      setValue("a_falloSegundaInstancia", "");

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
      setValue("f_archivo", "");
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

  useEffect(() => {
    console.log({ actuacion: doc, persona });
    if (policies && policies.length) {
      //policyAllow([ROL_PERSONA], policies) && doc && doc.r_usuarios_persona!=persona ||
      if (doc && doc.r_usuarios_persona != persona) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    } else {
      setReadOnly(true);
    }
  }, [policies, doc]);

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
                    <Form.Control
                      {...field}
                      type="date"
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                    />
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
                    <Form.Control
                      {...field}
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                    />
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
                    <Form.Control
                      {...field}
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                    />
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
                    <Form.Control
                      {...field}
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                      type="date"
                    />
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
                    <Form.Control
                      {...field}
                      type="date"
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
                    />
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
                    <Form.Control
                      {...field}
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
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
                      disabled={cargando || readOnly}
                      plaintext={readOnly}
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
              <Form.Label>Añadir nuevo archivo</Form.Label>
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
        </Modal.Body>
        {!readOnly ? (
          <Policy policy={[ROL_ASESOR, ROL_ADMIN, ROL_ESTUDIANTE, ROL_DOCENTE]}>
            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={cargando}>
                Guardar
              </Button>
            </Modal.Footer>
          </Policy>
        ) : null}
      </Form>
    </Modal>
  );
};

export default Tutela;
