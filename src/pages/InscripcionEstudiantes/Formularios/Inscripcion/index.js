import React, { useState, useRef, useEffect } from "react";
import {
  ACCESS_TOKEN_NAME,
  MODULES,
  ROL_ASESOR,
  ROL_ADMIN,
} from "constants/apiContants";
import { Link } from "react-router-dom";

import API from "utils/Axios";
import Policy from "components/Policy";
import { Card, Breadcrumb, Button, Form } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import Context from "./Ctx";
import { toast } from "react-toastify";
import AccessDenied from "components/Policy/AccessDenied";

import { useParams, useHistory } from "react-router-dom";

import Page from "components/Page";

import DatosInscripcion from "./DatosInscripcion";
import PerfilMaster from "pages/Perfil/Master";

const InscripcionPracticasConsultorioJuridico = ({}) => {
  const history = useHistory();
  const { id } = useParams();

  const R_USER = localStorage.getItem("username_id");

  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [personaId, setPersonaId] = useState("");

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const onError = (e) => {
    toast.info("😥 Ingresa la información faltante por favor!", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const loadDetail = () => {
    setLoadingDetail(true);
    API.get("estudiantes/inscripcion/" + id + "/")
      .then(({ data }) => {
        setPersonaId(data.r_usuarios_persona.id);
        //------------------------------Inscripcion-----------------
        sessionStorage.setItem("inscripcion", data.a_codigoEstudiantil);
        setValue("a_codigoEstudiantil", data.a_codigoEstudiantil);
        setValue("a_anioInscripcion", data.a_anioInscripcion);
        setValue("a_semestreInscripcion", data.a_semestreInscripcion);
        setValue(
          "r_config_jornadaInscripcion",
          data.r_config_jornadaInscripcion
        );
        setValue("a_numeroConsultorio", data.a_numeroConsultorio);
        setValue("r_config_grupo", data.r_config_grupo);
        setValue("a_turno", data.a_turno);
        setValue("r_config_lugarPracticas", data.r_config_lugarPracticas?.id);
        setValue("dt_fechaInscripcion", data.dt_fechaInscripcion);
      })
      .finally(() => setLoadingDetail(false));
  };

  const saveInscripcion = async (data) => {
    setLoading(true);

    API({
      url: "estudiantes/inscripcion/" + (id ? `${id}/` : ""),
      method: id ? "PATCH" : "POST",
      data: data,
    })
      .then(({ data }) => {
        setLoading(false);
        toast.success(
          "👏 Estudiante registrado satisfactoriamente a las practicas",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        history.push("/inscripcion-estudiantes/listado");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("🦄 Algo anda mal!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const formPersona = useRef();
  const formInscripcion = useRef();

  //------Enviar el formulario de persona
  const save = () => {
    formPersona.current.click();
  };
  //-----Enviar el formulario de inscripcion
  const personaGuardada = ({ persona, success }) => {
    if (success) {
      setValue("personaid", persona.id);
      formInscripcion.current.click();
    } else {
      toast.error("🦄 No se pudo guardar los datos del estudiante!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    if (id) {
      loadDetail();
    }
  }, [id]);

  if (loadingDetail) {
    return "<Page><h1>Cargando inscripción...</h1></Page>";
  }

  return (
    <Policy
      policy={[ROL_ADMIN]}
      feedback={
        <AccessDenied msn="Usted no tiene acceso a esta función de la página." />
      }
    >
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/inscripcion-estudiantes">Inscripción estudiantes</Link>
          </Breadcrumb.Item>
          {id ? (
            <Breadcrumb.Item>
              <Link to="/inscripcion-estudiantes/listado">Inscripciones</Link>
            </Breadcrumb.Item>
          ) : null}
          <Breadcrumb.Item active>
            Inscripción a practicas consultorio jurídico
          </Breadcrumb.Item>
        </Breadcrumb>

        <Context.Provider
          value={{ control, watch, errors, setValue, getValues, loading }}
        >
          <Card>
            <Card.Body style={{ padding: "2.5rem" }}>
              <PerfilMaster
                id={personaId}
                formRef={formPersona}
                showButton={false}
                allowSearchPerson={true}
                clearOnFinish={true}
                callback={personaGuardada}
              />
            </Card.Body>
          </Card>
          <br />
          <FormProvider errors={errors}>
            <Form
              noValidate
              onSubmit={handleSubmit(saveInscripcion, onError)}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              <fieldset disabled={loading}>
                <Card>
                  <Card.Body style={{ padding: "2.5rem" }}>
                    <DatosInscripcion />
                  </Card.Body>
                </Card>
                <input
                  {...register("personaid", { required: true })}
                  type="hidden"
                />
              </fieldset>
              <Button type="submit" hidden={true} ref={formInscripcion} />
            </Form>
          </FormProvider>
          <div className="d-flex justify-content-end mt-4">
            <Button onClick={save} size="lg" disabled={loading}>
              Registrar
            </Button>
          </div>
        </Context.Provider>
      </Page>
    </Policy>
  );
};

export default InscripcionPracticasConsultorioJuridico;
