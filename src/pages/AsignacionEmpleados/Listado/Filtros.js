import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { ExportToExcel } from "components/ExportToExcel";
import { useForm, Controller } from "react-hook-form";
import API from "utils/Axios";
import { baseUrl } from "utils/Axios"
import { toast } from "react-toastify";

const { Row, Col, Button, Form } = require("react-bootstrap");

const AsignacionesFiltros = ({
  docs = [],
  totalRegistros = 0,
  params,
  setParams,
}) => {
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
  const btn = useRef();
  const [consultorios, setConsultorios] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [loading, setLoading] = useState(false)

  const filtrar = (data) => {
    console.log(data);
    setParams({ ...params, page: 1, ...data });
  };

  const cargarConsultorios = () => {
    API("configuracion/consultorio").then(({ data }) => setConsultorios(data));
    API("configuracion/jornadas").then(({ data }) => setJornadas(data));
  };

  const limpiar = () => {
    setValue("cedula", "");
    setValue("no_consultorio", "");
    setValue("anio_validez", "");
    setValue("jornada_validez", "");
    setValue("primer_nombre", "");
    setValue("segundo_nombre", "");
    setValue("primer_apellido", "");
    setValue("segundo_apellido", "");
    btn.current.click();
  };

  const exportToExcel = async () => {
    setLoading(true)
    await API.get(`${baseUrl}/api/asignacion/empleados/exportar_excel/`, {
      params,
      responseType: 'arraybuffer',
    }).then((response) => {
      var FileSaver = require('file-saver');
      var blob = new Blob([response.data], { type: 'application/xlsx' });
      FileSaver.saveAs(blob, "asignacion_docentes.xlsx");
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      toast.error("No se pudo exportar la lista de asignaciones.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
  }

  useEffect(() => {
    setValue("cedula", "");
    setValue("no_consultorio", "");
    setValue("anio_validez", "");
    setValue("jornada_validez", "");
    setValue("primer_nombre", "");
    setValue("segundo_nombre", "");
    setValue("primer_apellido", "");
    setValue("segundo_apellido", "");
    cargarConsultorios();
    console.log(params)
  }, []);

  useEffect(() => {
    console.log(params)
  }, [params])

  return (
    <Form noValidate onSubmit={handleSubmit(filtrar)} className="mb-4">
      <h4>Por documento</h4>
      <Row className="mb-1">
        <Col xs="12" md="3">
          <Controller
            name="cedula"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Cédula</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <h4>Por nombre</h4>
      <Row className="mb-1">
        <Col xs="12" md="3">
          <Controller
            name="primer_nombre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Primer nombre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="3">
          <Controller
            name="segundo_nombre"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Segundo nombre</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="3">
          <Controller
            name="primer_apellido"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Primer apellido</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>

        <Col xs="12" md="3">
          <Controller
            name="segundo_apellido"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Segundo apellido</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
      </Row>

      <h4>Otros</h4>
      <Row className="mb-1">
        <Col xs="12" md="4">
          <Controller
            name="anio_validez"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Año</Form.Label>
                <Form.Control {...field} size="sm" />
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="4">
          <Controller
            name="no_consultorio"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Consultorio</Form.Label>
                <Form.Control as="select" {...field} size="sm">
                  <option value="">Todos</option>
                  {consultorios.map((el) => (
                    <option value={el.id}>{el.a_titulo}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
          />
        </Col>
        <Col xs="12" md="4">
          <Controller
            name="jornada_validez"
            control={control}
            render={({ field }) => (
              <Form.Group>
                <Form.Label>Jornada</Form.Label>
                <Form.Control as="select" {...field} size="sm">
                  <option value="">Todos</option>
                  {jornadas.map((el) => (
                    <option value={el.id}>{el.a_titulo}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <Button type="submit" ref={btn}>
            Consultar
          </Button>
          <Button type="button" variant="light" onClick={limpiar}>
            Limpiar filtros
          </Button>
        </div>
        <Button
          variant="success"
          size="sm"
          disabled={loading}
          onClick={exportToExcel}
        >
          {!loading ? "Exportar a Excel" : "Exportando..."}
        </Button>
      </div>
    </Form>
  );
};

export default AsignacionesFiltros;
