import { Container, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import Spin from "components/Spin";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "utils/Axios";
const RecuperarClave = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const [cargando, setCargando] = useState(false);
  const onFinish = async (data) => {
    try {
      setCargando(true);
      const { data: respuesta } = await axios.post(
        baseUrl + "/accounts/password_reset/",
        data
      );
      setCargando(false);
      toast.success("Revise su correo electónico y siga las instrucciones");
    } catch (error) {
      console.log(error.response);
      setCargando(false);
      toast.error(error.toString());
    }
  };

  return (
    <>
      <Spin cargando={cargando}>
        <Container className="d-flex justify-content-center align-items-center">
          <Form
            noValidate
            onSubmit={handleSubmit(onFinish)}
            style={{ width: "60%", marginTop: 100, marginBottom: 32 }}
          >
            <img
              src="/images/logo.png"
              className="img-fluid"
              style={{ marginBottom: 100 }}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Ingrese su correo" }}
              render={({ field }) => (
                <Form.Group>
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control {...field} />
                  <Errors message={errors.correo?.message} />
                </Form.Group>
              )}
            />
            <Button type="primary" variant="primary" className="btn-block">
              Recuperar contraseña
            </Button>
          </Form>
        </Container>
      </Spin>
    </>
  );
};

export default RecuperarClave;
