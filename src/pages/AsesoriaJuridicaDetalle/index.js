import { useContext } from "react";
import Page from "components/Page";

import PerfilMaster from "pages/Perfil/Master";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs, Card, Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import API from "utils/Axios";
import ArchivosAsesoria from "./Anexos";
import Estudiantes from "./Estudiantes";
import Actuaciones from "./Seguimiento/Actuaciones";
import Compromisos from "./Compromiso";
import {
  ROL_ESTUDIANTE,
  ROL_DOCENTE,
  ROL_ASESOR,
  ROL_ADMIN,
} from "constants/apiContants";

import { Context } from "components/Policy/Ctx";
import Spin from "components/Spin";
import Policy from "components/Policy";
import EstablecerFecha from "./EstablecerFecha";
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";

const AsesoriaJuridicaDetalle = () => {
  const { policies = [], persona } = useContext(Context);
  const { id: asesoriaId } = useParams();
  const [solicitanteId, setSolicitanteId] = useState("");
  const [caso, setCaso] = useState({});
  const [cargando, setCargando] = useState(false);
  const [key, setKey] = useState("detalle");
  const compromisoEstablecido = caso?.t_recomendaciones?.length ? true : false;

  const cargarAsesoria = () => {
    setCargando(true);
    API(`asesorias/solicitud/${asesoriaId}/`)
      .then(({ data }) => {
        setCaso(data);
        setSolicitanteId(data.r_usuarios_solicitante.id);
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarAsesoria();
    if (sessionStorage.getItem("tab-caso")) {
      setKey(sessionStorage.getItem("tab-caso"));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tab-caso", key);
  }, [key]);

  return (
    <Page>
      <Spin cargando={cargando}>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanAsesoriaJuridica />
          <span>Detalle de asesoria</span>
        </MigaPan>

        <Card style={{ overflow: "hidden" }}>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="detalle" title="Detalle">
              <br />
              <Card.Body>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>N° caso</th>
                    <th>Fecha y Hora</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>{caso.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        {caso.dt_fechaAsesoria} {caso.ht_horaAsesoria}
                        <Policy policy={[ROL_DOCENTE, ROL_ASESOR, ROL_ADMIN]}>
                          <EstablecerFecha caso={caso} setCaso={setCaso} />
                        </Policy>
                      </div>
                    </td>
                  </tr>
                </table>
                <br></br>
                <strong>Asunto</strong>
                <p>{caso.t_asuntoConsulta || "No especificado"}</p>
                <Compromisos
                  asesoriaId={asesoriaId}
                  caso={caso}
                  setCaso={setCaso}
                />
              </Card.Body>
            </Tab>

            {!policies.includes(ROL_ESTUDIANTE) ? (
              <Tab eventKey="asignados" title="Estudiantes asignados">
                <br />
                <Card.Body>
                  <Estudiantes
                    asesoriaId={asesoriaId}
                    caso={caso}
                    setCaso={setCaso}
                  />
                </Card.Body>
              </Tab>
            ) : null}

            <Tab eventKey="solicitante" title="Solicitante">
              <br />
              <Card.Body>
                <PerfilMaster
                  id={solicitanteId}
                  readOnly={true}
                  allowSearchPerson={false}
                  showButton={false}
                />
              </Card.Body>
            </Tab>

            <Tab
              eventKey="seguimiento"
              title={<span>Actuaciones y Seguimiento</span>}
            >
              <Actuaciones
                asesoriaId={asesoriaId}
                caso={caso}
                setCaso={setCaso}
                persona={persona}
                compromisoEstablecido={compromisoEstablecido}
              />
            </Tab>
          </Tabs>
        </Card>
      </Spin>
    </Page>
  );
};

export default AsesoriaJuridicaDetalle;
