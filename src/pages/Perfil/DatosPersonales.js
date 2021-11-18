import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import { useContext } from "react";
import Context from "./Ctx";
import Errors from "components/Errors";
import FotoPerfil from "./Foto";

const PerfilDatosPersonales = ({}) => {
  const { readOnly, control, errors, setValue } = useContext(Context);

  return (
    <>
      <h3 className="title-line">
        <span>Datos personales</span>
      </h3>

      <Row className="align-items-center">
        <Col xs="12" md="3">
          <FotoPerfil />
        </Col>
        <Col>
          <Row className="mb-1">
            <Controller
              name="a_primerNombre"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su primer nombre" }}
              render={({ field }) => (
                <Form.Group as={Col}>
                  <Form.Label>
                    Primer nombre <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />
                  <Errors message={errors?.a_primerNombre?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="a_segundoNombre"
              control={control}
              render={({ field }) => (
                <Form.Group as={Col} className="mb-3">
                  <Form.Label sm="2">Segundo nombre</Form.Label>
                  <Form.Control
                    {...field}
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />
                </Form.Group>
              )}
            />
          </Row>
          <Row className="mb-1">
            <Controller
              name="a_primerApellido"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su primer apellido" }}
              render={({ field }) => (
                <Form.Group as={Col}>
                  <Form.Label>
                    Primer apellido <span className="required" />
                  </Form.Label>
                  <Form.Control
                    {...field}
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />
                  <Errors message={errors?.a_primerApellido?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="a_segundoApellido"
              control={control}
              render={({ field }) => (
                <Form.Group as={Col} className="mb-3">
                  <Form.Label sm="2">Segundo apellido</Form.Label>
                  <Form.Control
                    {...field}
                    plaintext={readOnly}
                    readOnly={readOnly}
                  />
                </Form.Group>
              )}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default PerfilDatosPersonales;
