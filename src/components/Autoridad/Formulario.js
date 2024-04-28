import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import API from "utils/Axios";
import { toast } from "react-toastify";

const AutoridadFormulario = ({ visible, setVisible, autoriadGuardada }) => {
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

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const guardar = async (payload) => {
    try {
      setCargando(true);
      const { data } = await API.post("configuracion/entidad/", payload);
      setCargando(false);
      autoriadGuardada(data);
    } catch (error) {
      setCargando(false);
    }
  };
  const onError = () => {};
  const submit = (event) => {
    console.log(event);
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === "function") {
        // prevent any outer forms from receiving the event too
        event.stopPropagation();
      }
    }
    return handleSubmit(guardar, onError)(event);
  };

  useEffect(() => {
    if (!visible) {
      setValue("a_titulo", "");
    }
  }, [visible]);

  return (
    <Modal
      show={visible}
      onHide={() => setVisible(false)}
      backdrop="static"
      keyboard={false}
    >
      <Form noValidate onSubmit={submit} onKeyDown={(e) => checkKeyDown(e)}>
        <Modal.Header closeButton={!cargando}>
          <Modal.Title>Agregar autoridad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Controller
            name="a_titulo"
            control={control}
            defaultValue=""
            rules={{ required: "Ingrese información" }}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>
                  Nombre <span className="required" />
                </Form.Label>
                <Form.Control {...field} disabled={cargando} />
                <Errors message={errors?.a_titulo?.message} />
              </Form.Group>
            )}
          />
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

export default AutoridadFormulario;
