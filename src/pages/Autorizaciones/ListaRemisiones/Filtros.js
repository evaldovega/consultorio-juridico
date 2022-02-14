import { useForm, Controller } from "react-hook-form";
const { Row, Col, Form, Button } = require("react-bootstrap");
const Filtros = ({ params, setParams }) => {
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
  const filtrar = (data) => {
    console.log(data);
    setParams({ ...params, ...data });
  };
  return (
    <Form noValidate onSubmit={handleSubmit(filtrar)} className="mb-4">
      <Row>
        <Col xs="12" md="6">
          <Controller
            name="fechainicio"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Fecha inicial</Form.Label>
                <Form.Control {...field} size="sm" type="date" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="fechafin"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Fecha final</Form.Label>
                <Form.Control {...field} size="sm" type="date" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="cedula"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Cédula</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <h4>Por nombre</h4>
      <Row className="mb-1">
        <Col xs="12" md="6">
          <Controller
            name="primer_nombre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Primer nombre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="primer_apellido"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Primer apellido</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="segundo_nombre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Segundo nombre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="6">
          <Controller
            name="segundo_apellido"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Segundo apellido</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <Button type="submit">Consultar</Button>
    </Form>
  );
};

export default Filtros;
