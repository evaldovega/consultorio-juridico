import Errors from "components/Errors";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

const Compromisos = () => {
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

  const guardar = (data) => {};
  const onError = () => {};

  return (
    <>
      <Form noValidate onSubmit={handleSubmit(guardar, onError)}>
        <Row className="mb-2">
          <Col xs="12" md="3" lg="4">
            <Controller
              name="area"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Área de la consulta <span className="required" />
                  </Form.Label>
                  <Form.Control {...field} as="select">
                    <option value="">Seleccione</option>
                  </Form.Control>
                  <Errors message={errors?.area?.message} />
                </Form.Group>
              )}
            />
          </Col>
          <Col xs="12" md="3" lg="4">
            <Controller
              name="recomendaciones"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Recomendaciones <span className="required" />
                  </Form.Label>
                  <Form.Control {...field} as="textarea" />
                  <Errors message={errors?.recomendaciones?.message} />
                </Form.Group>
              )}
            />
          </Col>
          <Col xs="12" md="3" lg="4">
            <Controller
              name="compromiso"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Compromiso <span className="required" />
                  </Form.Label>
                  <Form.Control {...field} as="textarea" />
                  <Errors message={errors?.compromiso?.message} />
                </Form.Group>
              )}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs="12" md="3" lg="4">
            <Controller
              name="fecha"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese información" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>
                    Fecha para cumplir compromisos <span className="required" />
                  </Form.Label>
                  <Form.Control {...field} type="date" />
                  <Errors message={errors?.fecha?.message} />
                </Form.Group>
              )}
            />
          </Col>
        </Row>
        <Button>Guardar</Button>
      </Form>
    </>
  );
};

export default Compromisos;
