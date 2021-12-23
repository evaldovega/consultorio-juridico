import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import Errors from "components/Errors";
import Context from "./Ctx";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { ROL_ESTUDIANTE } from "constants/apiContants";

const TipoPersona = () => {
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

  if (readOnly || policies.includes(ROL_ESTUDIANTE)) {
    return (
      <Row className="mb-4">
        <Col>
          <strong className="d-flex align-items-center">
            <FaUser />{" "}
            <span>{TIPO_PERSONA || "TIpo de persona no especificado"}</span>
          </strong>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mb-4">
      <Controller
        name="c_tipoPersona"
        control={control}
        defaultValue=""
        rules={{ required: "Tipo de persona" }}
        render={({ field }) => (
          <Form.Group as={Col} xs="12" md="6">
            <Form.Label>
              Tipo de persona <span className="required" />
            </Form.Label>
            <Form.Control {...field} as="select">
              <option>Seleccione</option>
              <option value="NATURAL">Natural</option>
              <option value="JURIDICA">Juridica</option>
            </Form.Control>
            <Errors message={errors.c_tipoPersona?.message} />
          </Form.Group>
        )}
      />
    </Row>
  );
};
export default TipoPersona;
