import PersonaDetailRow from "components/personaDetailRow";
import { useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Controller } from "react-hook-form";

const Parte = ({
  name,
  field,
  index,
  getValues,
  control,
  readOnly = false,
  cargando = false,
  onRemove,
  id,
  idConciliacion,
  setValue,
}) => {
  //const row = getValues(`${name}.${index}`);
  console.log({ field });
  return (
    <div>
      <Controller
        name={`${name}.${index}.${id}`}
        control={control}
        render={({ field }) => <input type="hidden" {...field} />}
      />
      {field.id && !isNaN(field.id) ? (
        <Controller
          name={`${name}.${index}.id`}
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
      ) : (
        <p className="text-success">Nuevo!</p>
      )}
      <PersonaDetailRow allowRemove={true} id={field[id]} onRemove={onRemove} />

      <h6>Apoderado</h6>
      <Row className="mb-1">
        <Controller
          name={`${name}.${index}.a_nombreCompleto`}
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
          name={`${name}.${index}.a_numeroIdentificacion`}
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
      </Row>
      <Row className="mb-1">
        <Controller
          name={`${name}.${index}.a_tpNumero`}
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
          name={`${name}.${index}.a_direccion`}
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
          name={`${name}.${index}.a_correoElectronico`}
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
          name={`${name}.${index}.a_celular`}
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

export default Parte;
