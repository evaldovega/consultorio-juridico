import Page from "components/Page";
import Policy from "components/Policy";
import Spin from "components/Spin";
import { ROL_ADMIN, ROL_DOCENTE, ROL_ESTUDIANTE } from "constants/apiContants";
import { useState, useEffect, useContext } from "react";
import { Tab, Tabs, Card, Breadcrumb, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "components/Policy/Ctx";
import API from "utils/Axios";
import { Form } from "react-bootstrap";

const CambioClave = () => {
    const [cargando, setCargando] = useState(false);
    const { userid, policies = [] } = useContext(Context);
    const [doc, setDoc] = useState({});
    const cedulaEstudiante = localStorage.getItem("doc_identidad")
    const [clave, setClave] = useState("");
    const [confirmarClave, setClaveConfirm] = useState("");
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [msgAlerta, setMsgAlerta] = useState("");

    const cambiarClave = () => {
        if (clave == "" || confirmarClave == "") {
            setMsgAlerta("Asegúrate de llenar todos los campos. Una vez cambies la contraseña podrás utilizarla para ingresar al aplicativo.")
            setShow(true)
            setShowSuccess(true);
            return;
        }

        if (clave !== confirmarClave) {
            setMsgAlerta("Las contraseñas no coinciden. Recuerda que ambas contraseñas deben coincidir")
            setShow(true)
            setShowSuccess(false);
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (passwordRegex.test(clave)) {
            // Todo esta bien
            API.post(`/usuarios/usuarios/${userid}/password/`, {"password1": clave, "password2": confirmarClave}).then(({ data }) => {
                if(data.success){
                    // Todo estuvo bien
                    setShow(false)
                    setShowSuccess(true);
                    return;
                }else{
                    // Parece que hubo un error
                    setMsgAlerta(data.error)
                    setShowSuccess(false);
                    setShow(true);
                    return;
                }
            })
        } else {
            setMsgAlerta("Asegúrate de cumplir con los requisitos de la contraseña")
            setShowSuccess(false);
            setShow(true)
            return;
        }
    }

  return (
    //   <Policy policy={[ROL_ESTUDIANTE, ROL_ADMIN, ROL_DOCENTE]}>
          <Spin cargando={cargando}>
              <Page>
                  <Breadcrumb>
                      <Breadcrumb.Item>
                          <Link to="/">Inicio</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                          <Link to="/perfil">Perfil</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Cambio de contraseña</Breadcrumb.Item>
                  </Breadcrumb>

                  <Card>
                      <Card.Body style={{ padding: "2.5rem" }}>
                        { show ?
                          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                              <Alert.Heading>Parece que hay un error</Alert.Heading>
                              <p>
                                  { msgAlerta }
                              </p>
                          </Alert>
                        : null }
                        { showSuccess ?
                          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                              <Alert.Heading>Felicidades</Alert.Heading>
                              <p>
                                  Tu contraseña se ha modificado exitosamente.
                              </p>
                          </Alert>
                        : null }
                          <Form>
                              <Form.Group className="mb-3" controlId="clave-1">
                                  <Form.Label>Indique su nueva contraseña</Form.Label>
                                  <Form.Control type="password" required onChange={(t) => setClave(t.target.value)} placeholder="******" />
                              </Form.Group>
                              <Form.Text id="passwordHelpBlock" muted>
                                  <b>Requisitos de contraseña:</b> La contraseña debe tener por lo menos 8 caracteres de longitud. No puede llevar espacios y deberá llevar al menos 1 número.
                              </Form.Text>
                              <Form.Group className="mb-3 mt-3" controlId="clave-2">
                                  <Form.Label>Confirme su nueva contraseña</Form.Label>
                                  <Form.Control type="password" onChange={(t) => setClaveConfirm(t.target.value)} placeholder="******" />
                              </Form.Group>
                              <button
                                  class="btn btn-primary"
                                  type="button"
                                  onClick={() => cambiarClave() }
                              >
                                  Cambiar contraseña
                              </button>
                          </Form>
                      </Card.Body>
                  </Card>
              </Page>
          </Spin>
    //   </Policy>
  );
};

export default CambioClave;
