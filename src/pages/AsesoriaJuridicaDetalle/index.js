import { useContext } from "react";
import Page from "components/Page";

import PerfilMaster from "pages/Perfil/Master";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, Tabs, Card, Breadcrumb, Button, Modal } from "react-bootstrap";
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
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { Input } from "antd";
import { Label } from "reactstrap";

const AsesoriaJuridicaDetalle = () => {
  const { policies = [], persona } = useContext(Context);
  const { id: asesoriaId } = useParams();
  const [solicitanteId, setSolicitanteId] = useState("");
  const [caso, setCaso] = useState({});
  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false);
  const [key, setKey] = useState("detalle");
  const compromisoEstablecido = caso?.t_recomendaciones?.length ? true : false;
  
  const [showModalCierre, setShowModalCierre] = useState(false);
  const [motivoCierre, setMotivoCierre] = useState("")
  const [archivoCierre, setArchivoCierre] = useState("")
  const [nombreArchivoCierre, setNombreArchivoCierre] = useState("")
  const MAX_FILE_SIZE = 200000000;

  const cargarAsesoria = () => {
    setCargando(true);
    API(`asesorias/solicitud/${asesoriaId}/`)
      .then(({ data }) => {
        setCaso(data);
        setSolicitanteId(data.r_usuarios_solicitante.id);
      })
      .catch(() => setError(true))
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

  const cerrarAsesoria = () => {
    console.log(archivoCierre, nombreArchivoCierre, motivoCierre);
    let confirmacion = window.confirm("¿Está seguro de cerrar este caso?")
    if(confirmacion == true){
      setCargando(true);
      API.post(`asesorias/solicitud/${asesoriaId}/cerrar/`, {
        "motivo": motivoCierre,
        "anexo": archivoCierre,
        "titulo": nombreArchivoCierre
      })
      .then(data => {
        setShowModalCierre(false);
        cargarAsesoria();
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false));
    }
  }

  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result, file.name);
      setNombreArchivoCierre(file.name)
      setArchivoCierre(reader.result)
    };
  };

  return (
    <Page>
      <Modal show={showModalCierre}>
        <Modal.Header>
          <Modal.Title>Cerrar asesoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Por favor ingrese los motivos para dar cierre a la asesoría No. { caso.id }</p>
          <TextArea style={{padding:"4px 8px"}} onChange={(t) => setMotivoCierre(t.target.value)} rows={4} placeholder="Escriba aquí..."></TextArea>
          <div style={{ marginTop:"12px" }}>
            <Label>Archivos adjuntos (opcional)</Label>
            <input type="file" onChange={onChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModalCierre(false)}>Cancelar</Button>
          <Button onClick={cerrarAsesoria}>Cerrar caso</Button>
        </Modal.Footer>
      </Modal>

      <Spin cargando={cargando}>
        <MigaPan>
          <MigaPanInicio />
          <MigaPanAsesoriaJuridica />
          <span>Detalle de asesoria</span>
        </MigaPan>

        <Card style={{ overflow: "hidden" }}>
          {!error ? (
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
                      <th>Usuario que registra</th>
                    </tr>
                    <tr>
                      <td>{caso.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {caso.dt_fechaAsesoria} {caso.ht_horaAsesoria}
                          <Policy policy={[ROL_DOCENTE, ROL_ASESOR, ROL_ADMIN]}>
                            { caso.estado_cierre_caso ? "" : 
                              <EstablecerFecha caso={caso} setCaso={setCaso} />
                            }
                          </Policy>
                        </div>
                      </td>
                      <td>{ caso.r_usuarios_registro?.a_primerNombre } { caso.r_usuarios_registro?.a_primerApellido }</td>
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

                  <Policy policy={[ROL_ADMIN]}>
                    { caso.estado_cierre_caso ? 
                      <div>
                        Caso cerrado en: { moment(caso.estado_cierre_caso).format("Y-MM-D")}
                        <p><b>Motivo de cierre:</b> { caso.t_motivoCierre }<br />
                        { caso.f_adjuntoCierre ? <a target="_blank" href={caso.f_adjuntoCierre}>Ver adjunto</a> : "" }</p>
                      </div>
                    : 
                      <Button size="medium" onClick={() => setShowModalCierre(true)} type="button">Cerrar asesoría</Button>
                    }
                  </Policy>
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
          ) : (
            <div style={{
              display: 'flex',
              alighItems: 'center',
              justifyContent: 'center',
              padding: '100px'
            }}>
              <h1>Usted no tiene permitido ver este caso.</h1>
            </div>
          )}
        </Card>
      </Spin>
    </Page>
  );
};

export default AsesoriaJuridicaDetalle;
