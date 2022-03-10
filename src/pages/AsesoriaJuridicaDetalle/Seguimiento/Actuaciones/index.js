import { useEffect } from "react";
import { useState } from "react";
import { Dropdown, Card } from "react-bootstrap";
import API from "utils/Axios";
import AgendarCita from "../AgendarCita";
import PresentarDerecho from "../PresentarDerecho";
import Nota from "../Nota";
import Tutela from "../Tutela";
import Demanda from "../Demanda";
import { toast } from "react-toastify";
import Actuacion from "./Actuacion";
import Anexo from "../Anexo";
import {
  FaCalendar,
  FaFile,
  FaHandshake,
  FaPlus,
  FaStickyNote,
} from "react-icons/fa";
import Policy from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_ESTUDIANTE,
  ROL_PERSONA,
  ROL_DOCENTE
} from "constants/apiContants";
import { useHistory, useLocation } from "react-router-dom";

const Actuaciones = ({
  asesoriaId,
  caso,
  setCaso,
  persona = "",
  compromisoEstablecido = false,
}) => {
  const history = useHistory();
  const [mostrarAgendarCita, setMostrarAgendarCita] = useState(false);
  const [mostrarPresentarDerecho, setMostrarPresentarDerecho] = useState(false);
  const [mostrarNota, setMostrarNota] = useState(false);
  const [mostrarTutela, setMostrarTutela] = useState(false);
  const [mostrarDemanda, setMostrarDemanda] = useState(false);
  const [mostrarModal, setMostrarModal] = useState("");

  const [seguimientos, setSeguimientos] = useState([]);
  const [docsanexos, setDocsAnexos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [doc, setDoc] = useState(null);

  const action = (a) => {
    switch (a) {
      case "NOTA":
        setMostrarNota(true);
        break;
      case "CITA":
        setMostrarAgendarCita(true);
        break;
      case "DERECHO_PETICION":
        setMostrarPresentarDerecho(true);
        break;
      case "TUTELA":
        setMostrarTutela(true);
        break;
      case "DEMANDA":
        setMostrarDemanda(true);
        break;
    }
  };

  const cargar = async () => {
    try {
      setCargando(true);
      await API.get(`asesorias/seguimiento/?num_asesoria=${asesoriaId}`).then(
        (response) => {
          setSeguimientos(response.data);
          console.log(response.data);
        }
      );
      setCargando(false);
      await API.get("/asesorias/docsanexos/").then((response) => {
        console.log(response.data);
        setDocsAnexos(response.data);
        console.log(
          response.data.filter((el) => el.r_asesoria_seguimientoAsesoria === 11)
        );
      });
    } catch (error) {
      setCargando(false);
    }
  };

  const onArchivo = (archivo) => {
    const index = docsanexos.findIndex((s) => s.id == archivo.id);
    if (index < 0) {
      setDocsAnexos([...docsanexos, archivo]);
    } else {
      setDocsAnexos(
        docsanexos.map((s, i) => {
          if (i == index) {
            return archivo;
          }
          return s;
        })
      );
    }
  };

  const onSave = (seguimiento) => {
    const index = seguimientos.findIndex((s) => s.id == seguimiento.id);
    if (seguimiento.archivoSubido) {
      onArchivo(seguimiento.archivoSubido);
      delete seguimiento.archivoSubido;
    }
    if (index < 0) {
      toast.success("Actuación agregada correctamente");
      setSeguimientos([seguimiento, ...seguimientos]);
    } else {
      toast.success("Actuación modificada correctamente");
      setSeguimientos(
        seguimientos.map((s, i) => {
          if (i == index) {
            return seguimiento;
          }
          return s;
        })
      );
    }
  };

  const anexoBorrado = (id) => {
    setDocsAnexos(docsanexos.filter((d) => d.id != id));
  };

  const setEdit = (seguimiento) => {
    setDoc(seguimiento);
    action(seguimiento.c_tipoSeguimientoAccion);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <AgendarCita
        onSave={onSave}
        doc={doc}
        asesoriaId={asesoriaId}
        caso={caso}
        setCaso={setCaso}
        show={mostrarAgendarCita}
        setShow={setMostrarAgendarCita}
      />
      <Nota
        onSave={onSave}
        doc={doc}
        asesoriaId={asesoriaId}
        caso={caso}
        setCaso={setCaso}
        show={mostrarNota}
        setShow={setMostrarNota}
      />
      <PresentarDerecho
        onSave={onSave}
        doc={doc}
        asesoriaId={asesoriaId}
        caso={caso}
        setCaso={setCaso}
        show={mostrarPresentarDerecho}
        setShow={setMostrarPresentarDerecho}
      />
      <Tutela
        onSave={onSave}
        doc={doc}
        asesoriaId={asesoriaId}
        caso={caso}
        setCaso={setCaso}
        show={mostrarTutela}
        setShow={setMostrarTutela}
      />
      <Demanda
        onSave={onSave}
        doc={doc}
        asesoriaId={asesoriaId}
        caso={caso}
        setCaso={setCaso}
        show={mostrarDemanda}
        setShow={setMostrarDemanda}
      />
      <Anexo
        onSave={onSave}
        doc={doc}
        asesoriaId={asesoriaId}
        caso={caso}
        setCaso={setCaso}
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
      />

      <div style={{ height: 500, overflowY: "scroll", overflowX: "hidden" }}>
        {!seguimientos.length && (
          <div className="text-center h-100 d-flex flex-column justify-content-center">
            <h5 className="mb-4">Aquí inicia el proceso.</h5>
            <p>Añade actuaciones para llevar el seguimiento del caso</p>
            <img
              height="80"
              src="/images/undraw_handcrafts_arrow.svg"
              style={{ transform: "rotate(178deg)" }}
            />
          </div>
        )}
        <div className="actuaciones">
          {seguimientos.map((s, index) => {
            const anexos = docsanexos.filter(
              (a) => a.r_asesoria_seguimientoAsesoria == s.id
            );
            return (
              <Actuacion
                actuacion={s}
                setEdit={setEdit}
                anexos={anexos}
                persona={persona}
                index={index}
                total={seguimientos.length}
              />
            );
          })}
        </div>
      </div>

      <Policy policy={[ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE, ROL_ESTUDIANTE, ROL_PERSONA]}>
        <Card.Footer>
          <div className="text-center pt-4 pb-4">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FaPlus></FaPlus> Añade una actuación
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    action("NOTA");
                    setDoc(null);
                  }}
                >
                  <FaStickyNote /> Añadir nota
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setMostrarModal("ANEXO");
                    setDoc(null);
                  }}
                >
                  <FaFile /> Cargar documento
                </Dropdown.Item>

                <Policy policy={[ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE]}>
                  <Dropdown.Item
                    onClick={() => {
                      action("CITA");
                      setDoc(null);
                    }}
                  >
                    <FaCalendar /> Agendar cita
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      history.push(
                        "/centro-de-conciliacion/registrar/asesoria/" +
                          asesoriaId
                      );
                    }}
                  >
                    <FaHandshake /> Solicitar conciliación
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      action("DERECHO_PETICION");
                      setDoc(null);
                    }}
                  >
                    Presentar derecho de petición
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      action("TUTELA");
                      setDoc(null);
                    }}
                  >
                    Presentar tutela
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      action("DEMANDA");
                      setDoc(null);
                    }}
                  >
                    Presentar demanda
                  </Dropdown.Item>
                </Policy>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Footer>
      </Policy>
    </div>
  );
};

export default Actuaciones;
