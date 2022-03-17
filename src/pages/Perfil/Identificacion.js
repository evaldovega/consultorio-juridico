import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Row, Col, Form, Alert } from "react-bootstrap";
import Errors from "components/Errors";
import Context from "./Ctx";
import API, { baseUrl } from "utils/Axios";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
import TipoIdentificacion from "./TipoIdentificacion";
import { ROL_ESTUDIANTE, ROL_PERSONA } from "constants/apiContants";
import moment from "moment";

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
    policies,
    citado
  } = useContext(Context);

  const documento = watch('f_archivoDocumento')

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

  const buscarPersona = async (e) => {
    if (!allowSearchPerson) {
      return;
    }
    let encontrado = false;
    const cedula = e.target.value;
    setLoadingMaster(true);

    try {
      const { data } = await API(
        `usuarios/personas?a_numeroDocumento=${cedula}`
      );
      if (data.length) {
        setPersona(data[0]);
        Object.keys(data[0]).forEach((k) => setValue(k, data[0][k]));
        encontrado = true;
      } else {
        setPersona(null);
      }
      setLoadingMaster(false);
    } catch (error) {
      setLoadingMaster(false);
    }
    if (encontrado) {
      return;
    }
    try {
      const { data: respuestaAcademusoft } = await API.post(
        "/academusoft/estudiantes/",
        { estudiante: cedula }
      );
      if (respuestaAcademusoft) {
        setPersona(respuestaAcademusoft);
        Object.keys(respuestaAcademusoft).forEach((k) =>
          setValue(k, respuestaAcademusoft[k])
        );
      }
      setLoadingMaster(false);
    } catch (err) {
      setLoadingMaster(false);
      setPersona(null);
    }
  };

  if (readOnly) {
    return (
      <div className="mb-4">
        <h2 className="mb-4">Datos del documento</h2>
        <table width={"100%"}>
          <tr>
            <th>Número documento</th>
            <th>Fecha expedición</th>
            <th>Pais expedición</th>
            <th>Departamento expedición</th>
            <th>Ciudad expedición</th>
          </tr>
          <tr>
            <td>{persona?.a_numeroDocumento}</td>
            <td>
              {moment(persona?.a_fechaExpedicionDocumento).format("YYYY-MM-DD")}
            </td>
            <td>
              <Country
                field={{ value: persona?.r_config_paisExpedicion }}
                child="str_config_departamentoExpedicion"
                setValue={setValue}
                readOnly={true}
                plaintext={true}
              />
            </td>
            <td>
              <State
                field={{
                  value: persona?.r_config_departamentoExpedicion,
                  name: "str_config_departamentoExpedicion",
                }}
                child="str_config_ciudadExpedicion"
                setValue={setValue}
                readOnly={readOnly}
                plaintext={true}
              />
            </td>
            <td>
              <City
                field={{
                  value: persona?.r_config_ciudadExpedicion,
                  name: "str_config_ciudadExpedicion",
                }}
                setValue={setValue}
                readOnly={true}
                plaintext={true}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="mb-4">Datos del documento</h2>
      <Row className="mb-1">
        <Controller
          name="a_numeroDocumento"
          control={control}
          defaultValue=""
          rules={{required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
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
        <Col xs="12" md="6">
          <TipoIdentificacion
            errors={errors}
            control={control}
            readOnly={readOnly}
          />
        </Col>
        <Controller
          name="a_fechaExpedicionDocumento"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Group as={Col} xs="12" md="6">
              <Form.Label>
                Fecha de expedición 
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
            Adjuntar documento legible
          </Form.Label>
          <br />
          {documento && documento.substring(0, 1) === "/" &&
            <a href={`${baseUrl}${documento}`}>Descargar documento</a>
          }
          {documento && documento.substring(0, 1) === "h" &&
            <a href={`${documento}`}>Descargar certificación</a>
          }
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
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>
                Pais de expedición {!citado && (<span className="required" />)}
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
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>
                Departamento de expedición {!citado && (<span className="required" />)}
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
          rules={!citado && {required: "Ingrese información"}}
          render={({ field }) => (
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>
                Ciudad de expedición {!citado && (<span className="required" />)}
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
