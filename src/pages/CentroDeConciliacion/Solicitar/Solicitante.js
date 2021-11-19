import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Controller } from "react-hook-form";

const Solicitante = ({
  index,
  data,
  setValue,
  getValue,
  control,
  readOnly = false,
  cargando = false,
}) => {
  const { persona } = data;
  return (
    <div>
      <div className="d-flex align-items-center">
        <h5 className="mr-4">Solicitante</h5>
        <h6 style={{ color: "#000" }}>
          {persona.a_primerNombre} {persona.a_segundoNombre}{" "}
          {persona.a_primerApellido} {persona.a_segundoApellido}
        </h6>
      </div>

      <h6>Apoderado</h6>
      <Row className="mb-1">
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>Nombre y apellido</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>N° de cédula</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>Lugar de expedición</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-1">
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>N° tarjeta profesional</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
      </Row>
      <Row className="mb-1">
        <Controller
          name="dt_fechaAsesoria"
          control={control}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="4">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                disabled={cargando || readOnly}
                readonly={readOnly}
                plaintext={readOnly}
                {...field}
              />
            </Form.Group>
          )}
        />
      </Row>
      <hr />
    </div>
  );
};

export default Solicitante;
