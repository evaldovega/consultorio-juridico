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
      </Row>
      <Button type="submit">Consultar</Button>
    </Form>
  );
};

export default Filtros;
