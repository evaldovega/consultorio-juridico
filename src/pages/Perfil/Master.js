import { useEffect } from "react";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Context from "./Ctx";
import PerfilDatosPersonales from "./DatosPersonales";
import PerfilDemografico from "./Demograficos";
import PerfilDiscapacidad from "./Discapacidad";
import PerfilIdentificacion from "./Identificacion";
import PerfilLaboral from "./Laboral";
import PerfilUbicacion from "./Ubicacion";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import API from "utils/Axios";
import Spin from "components/Spin";
import { PERSONA_JURIDICA, PERSONA_NATURAL, ROL_ESTUDIANTE, ROL_ADMIN, ROL_PERSONA } from "constants/apiContants";
import TipoPersona from "./TipoPersona";
import PerfilJuridicoIdentificacion from "./IdentificacionJuridica";
import RepresentanteLegal from "./RepresentanteLegal";
import PerfilAnexos from "./Anexos"
import Policy from "components/Policy"

const moment = require('moment')
const classNames = require("classnames");

const PerfilMaster = ({
  formRef = null,
  id = "",
  callback = null,
  showButton = true,
  allowSearchPerson = true,
  clearOnFinish = false,
  readOnly = false,
  policies = [],
  citado,
}) => {
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
    setValues,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const TIPO_PERSONA = watch("c_tipoPersona");

  const load = () => {
    if (id >= 1) {
      setLoading(true);
      API(`usuarios/personas/${id}/`)
        .then(({ data }) => {
          console.log({ persona: data });
          setPersona(data);
          Object.keys(data).forEach((k) => setValue(k, data[k]));
        })
        .catch((error) => {
          setPersona(null);
        })
        .finally(() => setLoading(false));
    }
  };

  const onError = (e) => {
    toast.info("Ingresa la información faltante por favor!", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const onSubmit = (data) => {
    setLoading(true);
    data.f_archivoFotoPerfil_str = data.f_archivoFotoPerfil;
    data.f_archivoDocumento_str = data.f_archivoDocumento;
    data.f_archivoARL_str = data.f_archivoARL
    data.f_archivoEPS_str = data.f_archivoEPS

    if (data.a_fechaExpedicionDocumento === "") {
      data.a_fechaExpedicionDocumento = moment(new Date()).format("YYYY-MM-DD")
    }

    delete data.f_archivoFotoPerfil;
    delete data.f_archivoDocumento;
    delete data.f_archivoARL;
    delete data.f_archivoEPS;
    data.mm_discapacidad = !data.mm_discapacidad ? [] : data.mm_discapacidad;
    //data.r_user = 2;
    API({
      url: `usuarios/personas/` + (persona ? `${persona.id}/` : ""),
      method: persona ? "patch" : "post",
      data,
    })
      .then(({ data }) => {
        if (clearOnFinish) {
        }
        if (callback) {
          callback({ persona: data, success: true });
        }
        setPersona(data);
      })
      .catch((error) => {
        callback({ persona: data, success: false, error });
      })
      .finally(() => setLoading(false));
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const classes = classNames({
    "d-flex": true,
    "flex-column-reverse": false,
    "flex-column": !readOnly,
  });

  const enviarFormulario = (event) => {
    if (typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    if (typeof event.stopPropagation === "function") {
      // prevent any outer forms from receiving the event too
      event.stopPropagation();
    }
    return handleSubmit(onSubmit, onError)(event);
  };

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    if (persona) {
      Object.keys(persona).forEach((k) => setValue(k, persona[k]));
    }
  }, [persona, readOnly]);

  return (
    <Context.Provider
      value={{
        register,
        control,
        watch,
        setValue,
        getValues,
        reset,
        errors,
        readOnly,
        persona,
        setPersona,
        setLoading,
        allowSearchPerson,
        clearOnFinish,
        TIPO_PERSONA,
        policies,
        citado,
      }}
    >
      <Spin cargando={loading}>
        <Form
          noValidate
          onSubmit={enviarFormulario}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <fieldset disabled={loading}>
            {policies.includes(ROL_ESTUDIANTE) ? (
              citado && <TipoPersona />
            ) : (
              <TipoPersona />
            )}
            {TIPO_PERSONA == PERSONA_NATURAL ? <PerfilDatosPersonales /> : null}
            {TIPO_PERSONA == PERSONA_NATURAL ? (
              <PerfilIdentificacion allowSearchPerson={allowSearchPerson} />
            ) : null}
            {TIPO_PERSONA == PERSONA_JURIDICA ? (
              <PerfilJuridicoIdentificacion
                allowSearchPerson={allowSearchPerson}
              />
            ) : null}
            {TIPO_PERSONA == PERSONA_JURIDICA ? <RepresentanteLegal /> : null}
            {TIPO_PERSONA == PERSONA_NATURAL ? <PerfilDemografico /> : null}
            {/* {TIPO_PERSONA == PERSONA_NATURAL ? <PerfilDiscapacidad /> : null} */}
            {TIPO_PERSONA ? <PerfilUbicacion /> : null}
            {TIPO_PERSONA == PERSONA_NATURAL ? <PerfilLaboral /> : null}
            <Policy policy={[ROL_ADMIN, ROL_ESTUDIANTE]}>
              {TIPO_PERSONA == PERSONA_NATURAL ? <PerfilAnexos /> : null}
            </Policy>

            <Button
              hidden={!showButton || readOnly}
              ref={formRef}
              type="submit"
            >
              Guardar
            </Button>
          </fieldset>
        </Form>
      </Spin>
    </Context.Provider>
  );
};

export default PerfilMaster;
