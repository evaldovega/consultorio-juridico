import logo from './logo.svg';
import './App.less';
import './App.css'
import './styles/Folder.css'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
  Link
} from "react-router-dom";
import * as PolicyProvider from "components/Policy/Ctx";
import { ConfigProvider } from 'antd'
import locale from "antd/lib/locale/es_ES";
import Login from './pages/Login'
import Home from './pages/Home'
import InscripcionEstudiantes from './pages/InscripcionEstudiantes'
import InscripcionPracticasConsultorioJuridico from './pages/InscripcionEstudiantes/Formularios/Inscripcion'
import Registro from './pages/Registro'
import Configuraciones from 'pages/configuraciones'

import Paises from 'pages/configuraciones/Paises/Listado'
import Departamentos from 'pages/configuraciones/Departamentos/Listado'
import Municipios from 'pages/configuraciones/Municipios/Listado';

import PrivateRouter from './utils/PrivateRouter'
import TipoDocumento from 'pages/configuraciones/TipoDocumento/Listado';
import Generos from 'pages/configuraciones/Generos/Listado';
import OrientacionSexual from 'pages/configuraciones/OrientacionSexual/Listado';
import CuentasDeUsuario from 'pages/configuraciones/CuentasDeUsuario/Listado';
import ListadoIncripciones from 'pages/ListadoIncripciones';
import VerInscripcion from 'pages/VerInscripcion';

import AsesoriaJuridicaHome from 'pages/AsesoriaJuridica';
import MisAsesorias from 'pages/MisAsesorias';
import SolicitarAsesoria from 'pages/SolicitarAsesoria';
import Perfil from 'pages/Perfil';
import CentroDeConciliacion from 'pages/CentroConciliacion';
import CentroDeConciliacionRegistrar from 'pages/CentroConciliacion/Registrar';
import ListadoSolicitudes from 'pages/CentroConciliacion/ListadoSolicitudes'

function App() {
  return (
    <ConfigProvider locale={locale}>

      <Router>
        <PolicyProvider.Provider>
          <Switch>
            <PrivateRouter path="/" exact>
              <Home />
            </PrivateRouter>
            <PrivateRouter path="/inscripcion-estudiantes" exact>
              <InscripcionEstudiantes />
            </PrivateRouter>
            <PrivateRouter
              path="/inscripcion-estudiantes/inscripcion-practicas"
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
            <PrivateRouter path="/configuraciones/pais/:pais/departamentos" exact>
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
            <PrivateRouter path="/guardar-asesoria" exact>
              <SolicitarAsesoria />
            </PrivateRouter>
            <PrivateRouter path='/perfil' exact>
              <Perfil />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion" exact>
              <CentroDeConciliacion />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion/solicitar" exact>
              <CentroDeConciliacionRegistrar />
            </PrivateRouter>
            <PrivateRouter path="/centro-de-conciliacion/solicitudes" exact>
              <ListadoSolicitudes />
            </PrivateRouter>
            <Route path="/login" exact component={Login} />
            <Route path="/registrarse" exact component={Registro} />
          </Switch>
        </PolicyProvider.Provider>
      </Router>

    </ConfigProvider>
  );
}

export default App;
