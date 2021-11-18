import React, { useState, useRef, useCallback } from "react";
import { ACCESS_TOKEN_NAME } from "../constants/apiContants";
import { Link } from "react-router-dom";
import GoSite from "components/goSite";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { animateCSS } from "utils";

const Registro = ({ location, history }) => {
  const [loading, setLoading] = useState(false);
  /*const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem(ACCESS_TOKEN_NAME, "hola");
      history.replace(
        location && location.state && location.state.from
          ? location.state.from.pathname
          : "/"
      );
    }, 3000);
  };*/
  const colA = useRef();
  const colB = useRef();

  const onFinish = () => {};
  const onError = () => {};

  const go = useCallback(
    (link) => {
      Promise.all([
        animateCSS(colA.current, "fadeOutLeft"),
        animateCSS(colB.current, "fadeOutRight"),
      ]).then(() => {
        history.push(link);
      });
    },
    [history]
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <Row>
      <Col
        ref={colA}
        xs={12}
        md={6}
        className="animate__animated animate__fadeInLeft"
      >
        <div className="affix">
          <div className="login-dimg">
            <div className="login-dimg-content">
              <img
                src="/images/logow.png"
                className="img-fluid"
                style={{ marginBottom: 32 }}
              />

              <h1 className="text-white mb-4">Consultorio jurídico</h1>

              <p className="text-white">
                Si eres un ciudadano con problemas juridicos, en el{" "}
                <strong>
                  consultorio jurídico de la unversidad del Atlántico
                </strong>{" "}
                podemos ayudarte.
              </p>
              <p className="text-white">
                Si eres un estudiante de derecho aqui puede crecer
                profesionalmente afrontando retos de la vida real.
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col
        ref={colB}
        xs={{ span: 12 }}
        md={6}
        style={{ backgroundColor: "#F7F7F7", overflowY: "scroll" }}
        className="animate__animated animate__fadeInRight"
      >
        <Container
          style={{ minHeight: "100%", width: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Form
            noValidate
            onSubmit={handleSubmit(onFinish, onError)}
            style={{ width: "60%", marginTop: 32, marginBottom: 16 }}
          >
            <h2 className="mb-4">Registro</h2>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su nombre" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control {...field} />
                  <Errors message={errors.name?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Ingrese su correo electrónico",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Ingrese un correo valido",
                },
              }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control {...field} />
                  <Errors message={errors.email?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su contraseña" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control {...field} type="password" />
                  <Errors message={errors.password?.message} />
                </Form.Group>
              )}
            />
            <Controller
              name="password2"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirme su contraseña",
                validate: (value) =>
                  value === password.current || "Las contraseñas no coinciden",
              }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control {...field} type="password" />
                  <Errors message={errors.password2?.message} />
                </Form.Group>
              )}
            />
            <div className="d-flex mb-4">
              <a target="blank" href="" className="mr-4">
                Política de información de datos
              </a>
              <Controller
                name="politica"
                control={control}
                defaultValue=""
                rules={{ required: "Lea y acepte la política" }}
                render={({ field }) => (
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check {...field} type="checkbox" label="Acepto" />
                    <Errors message={errors.politica?.message}>
                      <div className="animate__animated animate__rubberBand">
                        <img className="arrow_curve" />
                      </div>
                    </Errors>
                  </Form.Group>
                )}
              />
            </div>
            <Button type="submit">Registrarse</Button>
            <div className="mt-4 d-flex justify-content-center align-items-center">
              <a className="link link-primary" onClick={() => go("/login")}>
                Iniciar sesión
              </a>
            </div>
            {/*<ReCAPTCHA
              ref={recaptchaRef}
              sitekey="AIzaSyCnU94fBKc0rKYki_MqbQDLPil-fHN_P2k"
            />*/}
          </Form>
        </Container>
      </Col>
    </Row>
  );
  {
    /*return (
    <>
      <div
        style={{ backgroundImage: "url(images/background-login.jpg)" }}
        className="background-login"
      >
        <GoSite style={{ position: "absolute", top: 16, left: 16 }} />
        <Spin spinning={loading}>
          <div className="card-login">
            <img
              src="https://www.uniatlantico.edu.co/uatlantico/sites/default/files/docencia/facultades/img/Consultorio%20Juridico.jpg"
              className="logo"
              style={{ maxWidth: "100%", marginBottom: 32 }}
            />
            <div className="card-login-content">
              <Typography.Paragraph
                style={{ textAlign: "center", fontSize: 16, marginBottom: 32 }}
              >
                Bienvenido
              </Typography.Paragraph>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                  email: "evaldo.vega@gmail.com",
                  clave: "123456",
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su nombre",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Nombre completo" />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su E-mail",
                    },
                  ]}
                >
                  <Input type="email" placeholder="Correo electrónico" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su contraseña!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Confirmar contraseña" />
                </Form.Item>
                <Form.Item
                  name="password2"
                  rules={[
                    {
                      required: true,
                      message: "Por favor confirme su contraseña!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Las contraseñas no coinciden!");
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Contraseña" />
                </Form.Item>
                <br></br>
                <Form.Item
                  name="politica"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error("Deberia aceptar")),
                    },
                  ]}
                >
                  <Checkbox>
                    He leído y acepto la{" "}
                    <a target="blank" href="">
                      Política de información de datos
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item style={{ marginTop: 42 }}>
                  <Button type="primary" block htmlType="submit">
                    Registrarse
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center", marginTop: 42 }}>
                <Link to="/login" className="link-blue">
                  Volver al login
                </Link>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </>
                );*/
  }
};

export default Registro;
