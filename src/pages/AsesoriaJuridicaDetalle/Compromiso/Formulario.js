import { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  Container,
  Alert,
  Modal,
} from "react-bootstrap";
import AreaAsesoria from "./AreaAsesoria";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import API from "utils/Axios";
import { useForm, Controller } from "react-hook-form";
import Spin from "components/Spin";

const CompromisoFormulario = ({
  caso,
  setCaso,
  asesoriaId,
  visible = false,
  setVisible,
}) => {
  const [cargando, setCargando] = useState(false);
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

  return (
    <Modal
      show={visible}
      onHide={() => setVisible(false)}
      backdrop="static"
      keyboard={false}
    >
      <Spin cargando={cargando}>
        <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
          <Modal.Header closeButton={!cargando}>
            Establecer compromiso
          </Modal.Header>
          <Modal.Body>
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
                      />

                      <Errors message={errors?.t_recomendaciones?.message} />
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
                      />
                      <Errors message={errors?.t_compromisos?.message} />
                    </Form.Group>
                  )}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs="12" md="6">
                <AreaAsesoria control={control} errors={errors} />
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
                        Fecha para cumplir compromisos{" "}
                        <span className="required" />
                      </Form.Label>
                      <Form.Control {...field} type="date" />

                      <Errors
                        message={
                          errors?.dt_fechaCumplimientoCompromisos?.message
                        }
                      />
                    </Form.Group>
                  )}
                />
              </Col>
            </Row>
            <Button type="submit">Guardar</Button>
          </Modal.Body>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CompromisoFormulario;
