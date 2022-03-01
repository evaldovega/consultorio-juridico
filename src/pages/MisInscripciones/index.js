import Page from "components/Page";
import Policy from "components/Policy";
import Spin from "components/Spin";
import { ROL_ESTUDIANTE } from "constants/apiContants";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs, Card, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "utils/Axios";

const MisInscripciones = () => {
  const [cargando, setCargando] = useState(false);
  const [doc, setDoc] = useState({});
  const cedulaEstudiante = localStorage.getItem("doc_identidad")

  const getInscripciones = async () => {
    try {
      setCargando(true);
      const { data } = await API.get(`estudiantes/inscripcion/?cedula=${cedulaEstudiante}`);
      setDoc(data.results[0] || {});
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  useEffect(() => {
    getInscripciones();
  }, []);

  return (
    <Policy policy={[ROL_ESTUDIANTE]}>
      <Spin cargando={cargando}>
        <Page>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Mi inscripción</Breadcrumb.Item>
          </Breadcrumb>
          <table width={"100%"} className="mt-4 mb-4">
            <tr>
              <th>Año de inscripción</th>
              <th>Semestre</th>
              <th>Fecha inscripción</th>
              <th>Fecha finalización</th>
            </tr>
            <tr>
              <td>{doc?.a_anioInscripcion}</td>
              <td>{doc?.a_semestreInscripcion}</td>
              <td>{doc?.dt_fechaInscripcion}</td>
              <td>{doc?.dt_fechaFinalizacion}</td>
            </tr>
            <tr>
              <th>Grupo</th>
              <th>Jornada</th>
              <th>Lugar</th>
              <th>Consultorio</th>
            </tr>
            <tr>
              <td>{doc?.r_config_grupo?.a_titulo}</td>
              <td>{doc?.r_config_jornadaInscripcion?.a_titulo}</td>
              <td>{doc?.r_config_lugarPracticas?.a_titulo}</td>
              <td>{doc?.r_config_numeroConsultorio?.a_titulo}</td>
            </tr>
          </table>
        </Page>
      </Spin>
    </Policy>
  );
};

export default MisInscripciones;
