import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import Errors from "components/Errors";
import Context from "./Ctx";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { ROL_ESTUDIANTE } from "constants/apiContants";

const RepresentanteLegal = () => {
  const {
    readOnly,
    control,
    errors,
    setValue,
    watch,
    setPersona,
    persona,
    setLoading: setLoadingMaster,
    allowSearchPerson,
    policies,
    TIPO_PERSONA,
  } = useContext(Context);
  return (
    <div className="mb-4">
      <h3 className="title-line">
        <span>Representante legal</span>
      </h3>
      <Row className="mb-1">
        <Controller
          name="a_nombresRepLegal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="a_documentoIdentidadRepLegal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>Documento de identidad</Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="a_direccionRepLegal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>Dirección de residencia</Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="a_correoElectronicoRepLegal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="a_telefonoRepLegal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
            </Form.Group>
          )}
        />
      </Row>
    </div>
  );
};

export default RepresentanteLegal;
