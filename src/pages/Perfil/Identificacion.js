import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Image,
  Form,
  Alert,
} from "react-bootstrap";
import Errors from "components/Errors";
import Context from "./Ctx";
import API from "utils/Axios";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";

const PerfilIdentificacion = () => {
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
  } = useContext(Context);
  const [tiposDocumento, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    API("configuracion/tipo-documento/")
      .then(({ data }) => {
        setTipos(data);
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.toString());
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const selectedFile = (el) => {
    if (!el.files.length) {
      setValue("f_archivoDocumento", "");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(el.files[0]);
    reader.onload = function () {
      setValue("f_archivoDocumento", reader.result);
      //el.value = "";
    };
  };

  const buscarPersona = (e) => {
    console.log({ allowSearchPerson });
    if (!allowSearchPerson) {
      return;
    }
    console.log("buscarPersona");
    setLoadingMaster(true);
    API(`usuarios/personas?a_numeroDocumento=${e.target.value}`)
      .then(({ data }) => {
        if (data.length) {
          console.log(Object.keys(data[0]));
          setPersona(data[0]);
          Object.keys(data[0]).forEach((k) => setValue(k, data[0][k]));
        } else {
          setPersona(null);
        }
      })
      .finally(() => {
        setLoadingMaster(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h3 className="title-line">
        <span>Datos del documento</span>
      </h3>
      <Row className="mb-1">
        <Controller
          name="r_config_tipoDocumento"
          control={control}
          defaultValue=""
          rules={{ required: "Seleccione un tipo" }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Tipo documento <span className="required" />
              </Form.Label>
              <Form.Control
                as="select"
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
                disabled={readOnly}
              >
                <option value="">Seleccion</option>
                {tiposDocumento.map((el, i) => (
                  <option key={i} value={el.id}>
                    {el.a_titulo}
                  </option>
                ))}
              </Form.Control>
              <Errors message={errors.r_config_tipoDocumento?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_numeroDocumento"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese su número de identidad" }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Número documento <span className="required" />
              </Form.Label>
              <Form.Control
                {...field}
                onBlur={buscarPersona}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors.a_numeroDocumento?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="a_fechaExpedicionDocumento"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese una fecha" }}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6" lg="3">
              <Form.Label>
                Fecha de expedición <span className="required" />
              </Form.Label>
              <Form.Control
                type="date"
                {...field}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors.a_fechaExpedicionDocumento?.message} />
            </Form.Group>
          )}
        />
        <Form.Group as={Col}>
          <Form.Label>
            Adjuntar documento legible <span className="required" />
          </Form.Label>
          {!readOnly ? (
            <Form.Control
              type="file"
              onChange={(e) => selectedFile(e.target)}
              readOnly={readOnly}
            />
          ) : null}
          <Controller
            name="f_archivoDocumento"
            control={control}
            defaultValue=""
            rules={{ required: "Seleccione un archivo" }}
            render={({ field }) => (
              <input
                {...field}
                type="hidden"
                readOnly={readOnly}
                plaintext={readOnly}
              />
            )}
          />
          <Errors message={errors.f_archivoDocumento?.message} />
        </Form.Group>
      </Row>
      <Row className="mb-1">
        <Controller
          name="r_config_paisExpedicion"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese su pais de expedición" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Pais <span className="required" />
              </Form.Label>
              <Country
                field={field}
                child="r_config_departamentoExpedicion"
                setValue={setValue}
                readOnly={readOnly}
                plaintext={readOnly}
              />
              <Errors message={errors.r_config_paisExpedicion?.message} />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_departamentoExpedicion"
          control={control}
          defaultValue=""
          rules={{ required: "Ingrese su departamento de expedición" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Departamento o Estado <span className="required" />
              </Form.Label>
              <State
                field={field}
                child="r_config_ciudadExpedicion"
                setValue={setValue}
                readOnly={readOnly}
              />
              <Errors
                message={errors.r_config_departamentoExpedicion?.message}
              />
            </Form.Group>
          )}
        />
        <Controller
          name="r_config_ciudadExpedicion"
          control={control}
          defaultValue=""
          rules={{ required: "Seleccione la ciudad de expedición" }}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>
                Ciudad <span className="required" />
              </Form.Label>
              <City field={field} setValue={setValue} readOnly={readOnly} />
              <Errors message={errors.r_config_ciudadExpedicion?.message} />
            </Form.Group>
          )}
        />
      </Row>
      {persona && allowSearchPerson ? (
        <Alert variant="info">
          Hemos encontrado la identificación <b>{persona?.a_numeroDocumento}</b>
          , puedes editar sus datos si lo deseas.
        </Alert>
      ) : null}
    </div>
  );
};

export default PerfilIdentificacion;
