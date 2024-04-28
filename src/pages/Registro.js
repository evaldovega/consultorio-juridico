import React, { useState, useRef, useCallback } from "react";
import { ACCESS_TOKEN_NAME } from "../constants/apiContants";
import { Link } from "react-router-dom";
import GoSite from "components/goSite";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { animateCSS } from "utils";
import API from "utils/Axios";
import Spin from "components/Spin";
import { toast } from "react-toastify";
import { FaLockOpen } from "react-icons/fa";
const Registro = ({ location, history }) => {
  const [cargando, setCargando] = useState(false);
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

  const onFinish = (data) => {
    let confirmacion = window.confirm("¿Está seguro de la información suministrada y desea continuar en el registro?")
    if(confirmacion == true){
      setCargando(true);
      API.post("registro/", data)
        .then(({ data }) => {
          setCargando(false);
          toast.success("Registro completado. Verifique su correo electrónico para activar su cuenta e inicie sesión.");
          go("/login");
        })
        .catch((error) => {
          console.log(error.response);
          if (
            error.response &&
            error.response.data &&
            error.response.data.non_field_errors
          ) {
            toast.error(error.response.data.non_field_errors.join(","));
          } else {
            toast.error(error.toString());
          }

          setCargando(false);
        });
    }
  };
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
    <div id="wrap">
      <div className="full-screen-view">
        <div
          className="full-screen-content animate__animated animate__fadeInRight"
          ref={colA}
        >
          <Container className="d-flex justify-content-center align-items-center">
            <Spin cargando={cargando}>
              <Form
                noValidate
                onSubmit={handleSubmit(onFinish, onError)}
                style={{ width: "60%", margin: "32px auto 16px auto" }}
              >
                <h2 className="mb-4">Registro de ciudadano</h2>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Ingrese su nombre" }}
                  render={({ field }) => (
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control {...field} />
                      <Errors message={errors.first_name?.message} />
                    </Form.Group>
                  )}
                />
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Ingrese su apellido" }}
                  render={({ field }) => (
                    <Form.Group>
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control {...field} />
                      <Errors message={errors.last_name?.message} />
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
                      message: "Ingrese un correo válido",
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
                  name="num_identificacion"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Ingrese su número de identificación" }}
                  render={({ field }) => (
                    <Form.Group>
                      <Form.Label>Número de cédula sin espacios ni puntos</Form.Label>
                      <Form.Control {...field} />
                      <Errors message={errors.num_identificacion?.message} />
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
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
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
                  <a
                    onClick={() => go("/login")}
                    className="link link-primary d-flex align-items-center"
                  >
                    <div className="circle-icon mr-2">
                      <FaLockOpen />
                    </div>
                    <span> Iniciar sesión</span>
                  </a>
                </div>
                {/*<ReCAPTCHA
              ref={recaptchaRef}
              sitekey="AIzaSyCnU94fBKc0rKYki_MqbQDLPil-fHN_P2k"
            />*/}
              </Form>
            </Spin>
          </Container>
        </div>
        <section
          ref={colB}
          className="full-screen-view-sidebar full-screen-view-sidebar-right animate__animated animate__fadeInLeft"
        >
          <div className="step-view-sidebar">
            <div className="step-view-sidebar-background sidebar-login-bg"></div>
            <div className="login-dimg-content">
              <h1 className="text-white mb-4">Consultorio jurídico</h1>

              <p className="text-white">
                Si eres un ciudadano con problemas juridicos, en el{" "}
                <strong>
                  consultorio jurídico de la unversidad del Atlántico
                </strong>{" "}
                podemos ayudarte.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Registro;
