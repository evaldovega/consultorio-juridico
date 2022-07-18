//import "./App.less";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as PolicyProvider from "components/Policy/Ctx";

import Login from "./pages/Login";
import Home from "./pages/Home";
import InscripcionEstudiantes from "./pages/InscripcionEstudiantes";
import InscripcionEstudiantesReporte from "pages/InscripcionEstudiantesReporte";
import InscripcionPracticasConsultorioJuridico from "./pages/InscripcionEstudiantes/Formularios/Inscripcion";
import Registro from "./pages/Registro";
import Configuraciones from "pages/configuraciones";

import Paises from "pages/configuraciones/Paises/Listado";
import Departamentos from "pages/configuraciones/Departamentos/Listado";
import Municipios from "pages/configuraciones/Municipios/Listado";

import PrivateRouter from "./utils/PrivateRouter";
import TipoDocumento from "pages/configuraciones/TipoDocumento/Listado";
import Generos from "pages/configuraciones/Generos/Listado";
import OrientacionSexual from "pages/configuraciones/OrientacionSexual/Listado";
import CuentasDeUsuario from "pages/configuraciones/CuentasDeUsuario/Listado";
import ListadoIncripciones from "pages/ListadoIncripciones";
import VerInscripcion from "pages/VerInscripcion";

import AsesoriaJuridicaHome from "pages/AsesoriaJuridica";
import MisAsesorias from "pages/MisAsesorias";
import SolicitarAsesoria from "pages/AsesoriaJuridica/SolicitarAsesoria";
import ListadoSolicitudes from "pages/AsesoriaJuridica/ListadoSolicitudes";
import FormatoRegistro from "pages/AsesoriaJuridica/ListadoSolicitudes/FormatoRegistro";

import AsignacionEmpleadosHome from "pages/AsignacionEmpleados";
import AsignarEmpleado from "pages/AsignacionEmpleados/Asignar";
import ListadoAsignaciones from "pages/AsignacionEmpleados/Listado";

import AutorizacionesHome from "pages/Autorizaciones";
import Autorizar from "pages/Autorizaciones/Autorizar";
import ListadoAutorizaciones from "pages/Autorizaciones/Listado";
import GenerarCertificado from "pages/Autorizaciones/GenerarCertificado";
import ListadoCertificados from "pages/Autorizaciones/ListaCertificados";
import GenerarRemision from "pages/Autorizaciones/GenerarRemision";
import ListadoRemisiones from "pages/Autorizaciones/ListaRemisiones";
import RemisionMasiva from "pages/Autorizaciones/RemisionMasiva";
import AutorizacionesPorFecha from "pages/Autorizaciones/AutorizacionesPorFecha";
import RemisionesPorFecha from "pages/Autorizaciones/RemisionesPorFecha";

import AsesoriaReportesIndex from "pages/AsesoriaJuridica/Reportes"
import ReporteGraficaGenerico from "pages/AsesoriaJuridica/Reportes/ReporteGraficaGenerico";
import AsesoriaReportePorDiscapacidad from "pages/AsesoriaJuridica/Reportes/ReportePorDiscapacidad";
import AsesoriaReporteCasosFecha from "pages/AsesoriaJuridica/Reportes/ReporteCasosFecha";
import AsesoriaReporteCiudadanosFecha from "pages/AsesoriaJuridica/Reportes/ReporteCiudadanosFecha";
import EncuestaSatisfaccion from "pages/AsesoriaJuridica/EncuestaSatisfaccion";

import EstudianteReportesIndex from "pages/InscripcionEstudiantesReporte";
import ReportePorSexo from "pages/InscripcionEstudiantesReporte/ReportePorSexo";
import ReportePorDesempleo from "pages/InscripcionEstudiantesReporte/ReportePorDesempleo";
import ReporteRegistrados from "pages/InscripcionEstudiantesReporte/ReporteRegistrados";
import ReporteCasosFecha from "pages/InscripcionEstudiantesReporte/ReporteCasosFecha";
import ReporteLugarPractica from "pages/InscripcionEstudiantesReporte/ReporteLugarPractica";
import ReportePorEdad from "pages/InscripcionEstudiantesReporte/ReportePorEdad";
import ReporteOrientacion from "pages/InscripcionEstudiantesReporte/ReporteOrientacion";
import ReportePorEtnia from "pages/InscripcionEstudiantesReporte/ReportePorEtnia";
import ReporteProfesion from "pages/InscripcionEstudiantesReporte/ReporteProfesion";
import ReportePorDiscapacidad from "pages/InscripcionEstudiantesReporte/ReportePorDiscapacidad";

import Perfil from "pages/Perfil";
import { ToastContainer } from "react-toastify";
import AsesoriaJuridicaDetalle from "pages/AsesoriaJuridicaDetalle";
import "moment/locale/es";
import moment from "moment";
import CentroDeConciliacionHome from "pages/CentroDeConciliacion/Home";
import CentroDeConciliacionSolicitar from "pages/CentroDeConciliacion/Solicitar";
import CentroDeConciliacionListado from "pages/CentroDeConciliacion/Listado";
import Programacion from "pages/CentroDeConciliacion/Programacion";
import ScrollToTop from "components/ScrollTop";
import RecuperarClave from "pages/RecuperarClave";
import MisInscripciones from "pages/MisInscripciones";
import Tutoriales from "pages/Tutoriales";

import FuncionesAdmin from "pages/FuncionesAdmin";
import Roles from "pages/FuncionesAdmin/Roles";

function App() {
  moment.locale("es");
  return (
    <>
      <Router>
        <PolicyProvider.Provider>
          <ScrollToTop />
          <Switch>
            <PrivateRouter path="/" exact>
              <Home />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes" exact>
              <InscripcionEstudiantes />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reporte" exact>
              <InscripcionEstudiantesReporte />
            </PrivateRouter>
            <PrivateRouter
              path="/inscripcion-estudiantes/inscripcion-practicas"
              exact
            >
              <InscripcionPracticasConsultorioJuridico />
            </PrivateRouter>
            <PrivateRouter
              path="/inscripcion-estudiantes/inscripcion-practicas/:id"
              exact
            >
              <InscripcionPracticasConsultorioJuridico />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/listado" exact>
              <ListadoIncripciones />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiante/:id/detalle" exact>
              <VerInscripcion />
            </PrivateRouter>
            <PrivateRouter path="/configuraciones" exact>
              <Configuraciones />
            </PrivateRouter>
            <PrivateRouter path="/configuraciones/paises" exact>
              <Paises />
            </PrivateRouter>
            <PrivateRouter
              path="/configuraciones/pais/:pais/departamentos"
              exact
            >
              <Departamentos />
            </PrivateRouter>
            <PrivateRouter
              path="/configuraciones/pais/:pais/departamento/:dep/municipios"
              exact
            >
              <Municipios />
            </PrivateRouter>
            <PrivateRouter path="/configuraciones/tipos-de-documentos" exact>
              <TipoDocumento />
            </PrivateRouter>
            <PrivateRouter path="/configuraciones/generos" exact>
              <Generos />
            </PrivateRouter>
            <PrivateRouter path="/configuraciones/orientaciones-sexuales" exact>
              <OrientacionSexual />
            </PrivateRouter>
            <PrivateRouter path="/configuraciones/cuentas-de-usuario" exact>
              <CuentasDeUsuario />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica" exact>
              <AsesoriaJuridicaHome />
            </PrivateRouter>
            <PrivateRouter path="/mis-asesorias" exact>
              <MisAsesorias />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/solicitar" exact>
              <SolicitarAsesoria />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/caso/:id" exact>
              <AsesoriaJuridicaDetalle />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/solicitudes" exact>
              <ListadoSolicitudes />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/formato-registro" exact>
              <FormatoRegistro />
            </PrivateRouter>

            <PrivateRouter path="/asesoria-juridica/reportes" exact>
              <AsesoriaReportesIndex />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/reportes_grafica/:tiporeporte" exact>
              <ReporteGraficaGenerico />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/reporte-discapacidad" exact>
              <AsesoriaReportePorDiscapacidad />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/reportes/casos-fecha" exact>
              <AsesoriaReporteCasosFecha />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/reportes/ciudadanos-fecha" exact>
              <AsesoriaReporteCiudadanosFecha />
            </PrivateRouter>
            <PrivateRouter path="/asesoria-juridica/encuesta" exact>
              <EncuestaSatisfaccion />
            </PrivateRouter>

            <PrivateRouter path="/inscripcion-estudiantes/reportes" exact>
              <EstudianteReportesIndex />
            </PrivateRouter>

            <PrivateRouter path="/inscripcion-estudiantes/reportes/sexo" exact>
              <ReportePorSexo />
            </PrivateRouter>
            <PrivateRouter
              path="/inscripcion-estudiantes/reportes/discapacidad"
              exact
            >
              <ReportePorDiscapacidad />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/desempleo" exact>
              <ReportePorDesempleo />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/registrados" exact>
              <ReporteRegistrados />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/casos" exact>
              <ReporteCasosFecha />
            </PrivateRouter>
            <PrivateRouter
              path="/inscripcion-estudiantes/reportes/lugar-practicas"
              exact
            >
              <ReporteLugarPractica />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/edad" exact>
              <ReportePorEdad />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/orientacion" exact>
              <ReporteOrientacion />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/etnia" exact>
              <ReportePorEtnia />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes/reportes/profesion" exact>
              <ReporteProfesion />
            </PrivateRouter>

            <PrivateRouter path="/asignacion-docentes" exact>
              <AsignacionEmpleadosHome />
            </PrivateRouter>
            <PrivateRouter path="/asignacion-docentes/asignar/:id" exact>
              <AsignarEmpleado />
            </PrivateRouter>
            <PrivateRouter path="/asignacion-docentes/asignar" exact>
              <AsignarEmpleado />
            </PrivateRouter>
            <PrivateRouter path="/asignacion-docentes/listado" exact>
              <ListadoAsignaciones />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones" exact>
              <AutorizacionesHome />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/autorizar" exact>
              <Autorizar />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/autorizar/:id" exact>
              <Autorizar />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/listado" exact>
              <ListadoAutorizaciones />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/generar-certificado" exact>
              <GenerarCertificado />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/generar-certificado/:id" exact>
              <GenerarCertificado />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/lista-certificados" exact>
              <ListadoCertificados />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/generar-remision" exact>
              <GenerarRemision />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/generar-remision/:id" exact>
              <GenerarRemision />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/remision-masiva" exact>
              <RemisionMasiva />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/lista-remisiones" exact>
              <ListadoRemisiones />
            </PrivateRouter>
            <PrivateRouter path="/autorizaciones/reporte-fecha" exact>
              <AutorizacionesPorFecha />
            </PrivateRouter>
            <PrivateRouter
              path="/autorizaciones/reporte-remisiones-fecha"
              exact
            >
              <RemisionesPorFecha />
            </PrivateRouter>
            <PrivateRouter path="/perfil" exact>
              <Perfil />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion" exact>
              <CentroDeConciliacionHome />
            </PrivateRouter>
            <PrivateRouter
              path="/centro-de-conciliacion/registrar/asesoria/:asesoria"
              exact
            >
              <CentroDeConciliacionSolicitar />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion/registrar/:id" exact>
              <CentroDeConciliacionSolicitar />
            </PrivateRouter>

            <PrivateRouter path="/centro-de-conciliacion/registrar" exact>
              <CentroDeConciliacionSolicitar />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion/solicitudes" exact>
              <CentroDeConciliacionListado />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion/programacion" exact>
              <Programacion />
            </PrivateRouter>
            <PrivateRouter path="/funciones-admin" exact>
              <FuncionesAdmin />
            </PrivateRouter>
            <PrivateRouter path="/funciones-admin/roles" exact>
              <Roles />
            </PrivateRouter>
            <PrivateRouter path="/mi-inscripcion" exact>
              <MisInscripciones />
            </PrivateRouter>
            <Route path="/tutoriales" exact component={Tutoriales} />
            <Route path="/login" exact component={Login} />
            <Route path="/registrarse" exact component={Registro} />
            <Route path="/recuperar-clave" exact component={RecuperarClave} />
          </Switch>
        </PolicyProvider.Provider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
