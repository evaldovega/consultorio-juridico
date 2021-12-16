import React, { useEffect, useState, useCallback } from "react";
import { ACCESS_TOKEN_NAME, USER_FULL_NAME } from "../constants/apiContants";
import { Link, useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import GoSite from "components/goSite";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import API from "utils/Axios";
import Slogan from "components/Slogan";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { toast } from "react-toastify";
import { useRef } from "react";
import { animateCSS } from "utils";

const Login = ({ location, history }) => {
  const recaptchaRef = React.useRef();
  const [loading, setLoading] = useState(false);

  const colA = useRef();
  const colB = useRef();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

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

  const onFinish = async (data) => {
    setLoading(true);
    API.post("auth-user/", data)
      .then(({ data }) => {
        localStorage.setItem(ACCESS_TOKEN_NAME, data.access_token);
        localStorage.setItem(USER_FULL_NAME, data.fullname);
        localStorage.setItem("username_id", data.id);
        localStorage.setItem("id_persona", data.id_persona);
        history.replace(
          location && location.state && location.state.from
            ? location.state.from.pathname
            : "/"
        );
      })
      .catch((error) => {
        const e =
          error.response && error.response.data
            ? error.response.data.detail
            : error.toString();
        toast.error(`😥 ${e}`, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onError = () => {};

  useEffect(() => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }, []);

  return (
    <div id="wrap">
      <div className="full-screen-view">
        <div
          className="full-screen-content animate__animated animate__fadeInLeft"
          ref={colA}
        >
          <Container className="d-flex justify-content-center align-items-center">
            <Form
              noValidate
              onSubmit={handleSubmit(onFinish, onError)}
              style={{ width: "60%", marginTop: 100, marginBottom: 32 }}
            >
              <img
                src="/images/logo.png"
                className="img-fluid"
                style={{ marginBottom: 100 }}
              />
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: "Ingrese su usuario" }}
                render={({ field }) => (
                  <Form.Group>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control {...field} disabled={loading} />
                    <Errors message={errors.username?.message} />
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
                    <Form.Control
                      {...field}
                      disabled={loading}
                      type="password"
                    />
                    <Errors message={errors.password?.message} />
                  </Form.Group>
                )}
              />
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner
                    animation="border"
                    role="status"
                    variant="primary"
                  ></Spinner>
                </div>
              ) : (
                <>
                  {" "}
                  <Button type="submit" disabled={loading}>
                    Acceder
                  </Button>
                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <a
                      onClick={() => go("/registrarse")}
                      className="link link-primary"
                    >
                      Registrarse
                    </a>
                    <span className="ml-4 mr-4">⍿</span>
                    <Link to="recuperar-clave" className="link-blue">
                      Olvidé la contraseña
                    </Link>
                  </div>
                </>
              )}
            </Form>
          </Container>
        </div>
        <section
          ref={colB}
          className="full-screen-view-sidebar full-screen-view-sidebar-right animate__animated animate__fadeInRight"
        >
          <div className="step-view-sidebar">
            <div className="step-view-sidebar-background sidebar-login-bg"></div>

            <div className="login-dimg-content">
              <Slogan />
              <p className="text-white">
                Política de acceso para personas que <br></br>presenten
                discapacidad visual o auditiva.
              </p>
              <Button
                href="https://convertic.gov.co/641/w3-propertyvalue-15308.html"
                target="blank"
                className="animate__animated animate__bounceInUp"
              >
                Descargar herramientas
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
