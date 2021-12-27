import { useState } from "react";
import { ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE } from "constants/apiContants";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { FaFilter, FaBolt } from "react-icons/fa";
import moment from "moment";
import Errors from "components/Errors";
import API from "utils/Axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanInscripcionEstudiante from "components/MigaPan/InscripcionEstudiante";
const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { default: Spin } = require("components/Spin");
const {
  Breadcrumb,
  Card,
  Form,
  Row,
  Col,
  Button,
  InputGroup,
} = require("react-bootstrap");

const InscripcionEstudiantesReporte = () => {
  const [cargando, setCargando] = useState(false);
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
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const consultar = async (params) => {
    try {
      setCargando(true);
      const { data } = await API.get("estudiantes/inscripcion/?reporte=1", {
        params: { ...params, page: 1, page_size: 100000000000 },
      });
      const inscripciones = data.results.map((i) => ({
        anio: i.a_anioInscripcion,
        fechaInscripcion: moment(i.dt_fechaInscripcion).format("YYYY-MM-DD"),
        fechaFinalizacion: i.dt_fechaFinalizacion
          ? moment(i.dt_fechaFinalizacion).format("YYYY-MM-DD")
          : "No especificada",
        codigoEstudiantil: i.a_codigoEstudiantil,
        consultorio: i?.r_config_numeroConsultorio?.a_titulo,
        grupo: i?.r_config_grupo?.a_titulo,
        jornada: i?.r_config_jornadaInscripcion?.a_titulo,
        lugar: i?.r_config_lugarPracticas?.a_titulo,
        turno: i.a_turno,
        estudiante:
          i?.r_usuarios_persona?.a_primerNombre +
          " " +
          i?.r_usuarios_persona?.a_primerApellido,
        paisNacimiento: i?.r_usuarios_persona?.r_config_paisNacimiento,
        departamentoNacimiento: i?.r_usuarios_persona?.r_config_departamento,
        ciudadNacimiento: i?.r_usuarios_persona?.r_config_ciudadNacimiento,

        genero: i?.r_usuarios_persona?.genero,
        mujerCabezaFamilia: i?.r_usuarios_persona?.b_mujerCabezaFamilia
          ? "Si"
          : "No",
        migrante: i?.r_usuarios_persona?.b_migrante ? "Si" : "No",
        numeroDeHijos: i?.r_usuarios_persona?.a_numeroHijos || 0,
        fechaNacimiento: i?.r_usuarios_persona?.a_fechaNacimiento,

        etnia: i?.r_usuarios_persona?.r_config_etnia,
        orientacionSexual: i?.r_usuarios_persona?.r_config_orientacion,
        profesion: i?.r_usuarios_persona?.r_config_profesion,
        numeroDocumento: i?.r_usuarios_persona?.a_numeroDocumento,
        tipoDocuemnto: i?.r_usuarios_persona?.r_config_tipoDocumento,
        fechaExpedicion: i?.a_fechaExpedicionDocumento,
        paisExpedicion: i?.r_usuarios_persona?.r_config_paisExpedicion,
        departamentoExpedicion:
          i?.r_usuarios_persona?.r_config_departamentoExpedicion,
        ciudadExpedicion: i?.r_usuarios_persona?.r_config_ciudadExpedicion,

        estrato: i?.c_estrato,
        barrio: i?.r_usuarios_persona?.a_barrio,
        direccion: i?.r_usuarios_persona?.a_direccion,
        celular: i?.r_usuarios_persona?.a_celular,
        correo: i?.r_usuarios_persona?.a_correoElectronico,
        telefono: i?.a_telefonoFijo,

        afectadoPorLaViolencia: i?.r_config_afectacionViolencia ? "Si" : "No",

        trabaja: i?.b_trabaja ? "Si" : "No",
        servidorPublico: i?.b_servidorPublico ? "Si" : "No",
        rangoSalarial: i?.a_rangoSalarial,
        empresa: i?.r_usuarios_persona?.a_nombreEmpresa,
        barrio: i?.r_usuarios_persona?.a_barrioEmpresa,
        direccion: i?.r_usuarios_persona?.a_direccionEmpresa,
        cargo: i?.r_usuarios_persona?.a_cargoEmpresa,
        telefono: i?.r_usuarios_persona?.a_telefonoEmpresa,
      }));
      exportToCSV(inscripciones, "reporte-de-inscripciones");
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  return (
    <Policy policy={[ROL_ADMIN, ROL_DOCENTE, ROL_ASESOR]}>
      <Spin cargando={cargando}>
        <Page>
          <MigaPan>
            <MigaPanInicio />
            <MigaPanInscripcionEstudiante />
            <span>Reportes</span>
          </MigaPan>

          <Card>
            <Card.Body>
              <div className="d-flex justify-content-end align-items-center mb-4">
                <div className="circle-icon mr-4">
                  <FaFilter />
                </div>
                <FaBolt style={{ fill: "#bbbb54" }} title="" />
                <span className="mr-2">Aplicar filtro rápidos</span>
                <Button
                  variant="light"
                  onClick={() => {
                    setValue(
                      "fechainicio",
                      moment().startOf("year").format("YYYY-MM-DD")
                    );
                    setValue(
                      "fechafin",
                      moment()
                        .startOf("year")
                        .add(6, "month")
                        .format("YYYY-MM-DD")
                    );
                  }}
                >
                  Primer semestre
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    setValue(
                      "fechainicio",
                      moment()
                        .startOf("year")
                        .add(6, "month")
                        .format("YYYY-MM-DD")
                    );
                    setValue(
                      "fechafin",
                      moment().endOf("year").format("YYYY-MM-DD")
                    );
                  }}
                >
                  Segundo semestre
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    setValue(
                      "fechainicio",
                      moment().startOf("month").format("YYYY-MM-DD")
                    );
                    setValue(
                      "fechafin",
                      moment().endOf("month").format("YYYY-MM-DD")
                    );
                  }}
                >
                  Este mes
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    setValue(
                      "fechainicio",
                      moment().startOf("year").format("YYYY-MM-DD")
                    );
                    setValue(
                      "fechafin",
                      moment().endOf("year").format("YYYY-MM-DD")
                    );
                  }}
                >
                  Este año
                </Button>
              </div>
              <Form
                noValidate
                onSubmit={handleSubmit(consultar)}
                className="mb-4"
              >
                <InputGroup className="mb-3">
                  <Controller
                    name="fechainicio"
                    control={control}
                    rules={{
                      required: "Ingrese una fecha",
                    }}
                    render={({ field }) => (
                      <Form.Control type="date" {...field} />
                    )}
                  />

                  <Controller
                    name="fechafin"
                    control={control}
                    rules={{
                      required: "Ingrese una fecha",
                    }}
                    render={({ field }) => (
                      <Form.Control type="date" {...field} />
                    )}
                  />
                  <InputGroup.Append>
                    <Button type="submit">
                      Generar reporte de inscripciones
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Page>
      </Spin>
    </Policy>
  );
};
export default InscripcionEstudiantesReporte;
