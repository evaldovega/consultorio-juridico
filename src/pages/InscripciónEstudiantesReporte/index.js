import { useState } from "react";
import { ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE } from "constants/apiContants";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import moment from "moment";
import Errors from "components/Errors";
import API from "utils/Axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
const { default: Page } = require("components/Page");
const { default: Policy } = require("components/Policy");
const { default: Spin } = require("components/Spin");
const { Breadcrumb, Card, Form, Row, Col, Button } = require("react-bootstrap");

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
      const { data } = await API.get("estudiantes/inscripcion/", {
        params: { ...params, page: 1, page_size: 100000000000 },
      });
      const inscripciones = data.results.map((i) => ({
        anio: i.a_anioInscripcion,
        fechaInscripcion: moment(i.dt_fechaInscripcion).format("YYYY-MM-DD"),
        codigoEstudiantil: i.a_codigoEstudiantil,
        consultorio: i.a_numeroConsultorio,
        grupo: i?.r_config_grupo?.a_titulo,
        jornada: i?.r_config_jornadaInscripcion?.a_titulo,
        lugar: i?.r_config_lugarPracticas?.a_titulo,
        turno: i.a_turno,
        estudiante:
          i?.r_usuarios_persona?.a_primerNombre +
          " " +
          i?.r_usuarios_persona?.a_primerApellido,
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
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/inscripcion-estudiantes">Inscripción estudiantes</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Reporte</Breadcrumb.Item>
          </Breadcrumb>

          <Card>
            <Card.Body>
              <Form
                noValidate
                onSubmit={handleSubmit(consultar)}
                className="mb-4"
              >
                <Row className="mb-1">
                  <Col xs="12" md="6">
                    <Controller
                      name="fechainicio"
                      control={control}
                      rules={{
                        required: "Ingrese una fecha",
                      }}
                      render={({ field }) => (
                        <Form.Group>
                          <Form.Label>Fecha inicio</Form.Label>
                          <Form.Control type="date" {...field} />
                        </Form.Group>
                      )}
                    />
                    <Errors message={errors?.fechainicio?.message} />
                  </Col>
                  <Col xs="12" md="6">
                    <Controller
                      name="fechafin"
                      control={control}
                      rules={{
                        required: "Ingrese una fecha",
                      }}
                      render={({ field }) => (
                        <Form.Group>
                          <Form.Label>Fecha final</Form.Label>
                          <Form.Control type="date" {...field} />
                        </Form.Group>
                      )}
                    />
                    <Errors message={errors?.fechafin?.message} />
                  </Col>
                </Row>
                <Button type="submit">Generar reporte de inscripciones</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end align-items-center">
              <h3 style={{ margin: 0 }}>
                Filtros rapidos <FaFilter />
              </h3>
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
            </Card.Footer>
          </Card>
        </Page>
      </Spin>
    </Policy>
  );
};
export default InscripcionEstudiantesReporte;
