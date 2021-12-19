import moment from "moment";
import { useRef } from "react";
import { useEffect } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Errors from "components/Errors";

const Filtros = ({ cargando = false, setParams, params }) => {
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
    defaultValues: {
      fecha_inicial: moment().startOf("month").format("YYYY-MM-DD"),
      fecha_final: moment().endOf("month").format("YYYY-MM-DD"),
    },
  });
  const onFilter = (filtros) => {
    setParams({ ...params, page: 1, ...filtros });
  };
  const refButton = useRef();
  useEffect(() => {
    if (refButton && refButton.current) {
      refButton.current.click();
    }
  }, [refButton]);

  return (
    <Form className="mb-4 mt-4" noValidate onSubmit={handleSubmit(onFilter)}>
      <Row>
        <Col xs="12" md="4" lg="3">
          <Controller
            name="fecha_inicial"
            control={control}
            rules={{
              required: "Ingrese una fecha",
            }}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>
                  Fecha inicial <span className="required" />
                </Form.Label>
                <Form.Control type="date" disabled={cargando} {...field} />
                <Errors message={errors.fecha_inicial?.message} />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="4" lg="3">
          <Controller
            name="fecha_final"
            control={control}
            rules={{
              required: "Ingrese una fecha",
            }}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>
                  Fecha final <span className="required" />
                </Form.Label>
                <Form.Control type="date" disabled={cargando} {...field} />
                <Errors message={errors.fecha_final?.message} />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="4" lg="3">
          <Controller
            name="id_solicitante"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Identificación del solicitante</Form.Label>
                <Form.Control disabled={cargando} {...field} />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="4" lg="3">
          <Controller
            name="id_citado"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Identificación del citado</Form.Label>
                <Form.Control disabled={cargando} {...field} />
              </Form.Group>
            )}
          />
        </Col>
      </Row>

      <Button type="submit" ref={refButton} disabled={cargando}>
        Consultar
      </Button>
    </Form>
  );
};
export default Filtros;
