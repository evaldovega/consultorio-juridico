import { useState, useEffect } from "react";
import Errors from "components/Errors";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import AreaAsesoria from "./AreaAsesoria";
import { toast } from "react-toastify";
import API from "utils/Axios";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";

const Compromisos = ({ asesoriaId, caso, setCaso }) => {
  const { persona: personaId } = useContext(Context);
  const [cargando, setCargando] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
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

  const guardar = async (data) => {
    try {
      setCargando(true);
      await API.patch(`asesorias/solicitud/${asesoriaId}/`, data);
      setCargando(false);
      toast.success(
        "Copromiso estabecido, ahora puedes llevar el seguimiento de este caso"
      );
      setCaso({ ...caso, ...data });
    } catch (error) {
      setCargando(false);
      toast.warning(
        "No se pudo guardar el compromiso, por favor vuelve a intentar"
      );
    }
  };
  const onError = () => {
    toast.warning("Complete la informacón para continuar");
  };

  //const readOnly = caso?.t_recomendaciones?.length ? true : false;

  useEffect(() => {
    if (caso) {
      console.log(caso);
      setValue("t_recomendaciones", caso.t_recomendaciones);
      setValue("t_compromisos", caso.t_compromisos);
      setValue("r_config_areaAsesoria", caso.r_config_areaAsesoria);
      setValue(
        "dt_fechaCumplimientoCompromisos",
        caso.dt_fechaCumplimientoCompromisos
      );
      if (caso?.t_recomendaciones?.length) {
        setReadOnly(true);
      } else if (
        caso.mm_estudiantesAsignados &&
        caso.mm_estudiantesAsignados.includes(personaId)
      ) {
        setReadOnly(false);
      } else {
        setReadOnly(true);
      }
    }
  }, [caso, personaId]);

  return (
    <>
      <h3>Compromiso</h3>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Row className="mb-2">
          <Col xs="12">
            <Controller
              name="t_recomendaciones"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Recomendaciones <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="textarea"
                    rows="5"
                    disabled={cargando}
                    readOnly={readOnly}
                    plaintext={readOnly}
                  />
                  {!readOnly && (
                    <Errors message={errors?.t_recomendaciones?.message} />
                  )}
                </Form.Group>
              )}
            />
          </Col>
          <Col xs="12">
            <Controller
              name="t_compromisos"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Compromiso <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    as="textarea"
                    rows="5"
                    disabled={cargando}
                    readOnly={readOnly}
                    plaintext={readOnly}
                  />
                  {!readOnly && (
                    <Errors message={errors?.t_compromisos?.message} />
                  )}
                </Form.Group>
              )}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs="12" md="6">
            <AreaAsesoria
              readOnly={readOnly}
              control={control}
              errors={errors}
            />
          </Col>
          <Col xs="12" md="6">
            <Controller
              name="dt_fechaCumplimientoCompromisos"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Fecha para cumplir compromisos <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    type="date"
                    readOnly={readOnly}
                    plaintext={readOnly}
                  />
                  {!readOnly && (
                    <Errors
                      message={errors?.dt_fechaCumplimientoCompromisos?.message}
                    />
                  )}
                </Form.Group>
              )}
            />
          </Col>
        </Row>
        {!readOnly ? (
          <Button type="submit">Establecer compromiso</Button>
        ) : null}
      </Form>
    </>
  );
};

export default Compromisos;
