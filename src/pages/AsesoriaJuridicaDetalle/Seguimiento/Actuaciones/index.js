import Errors from "components/Errors";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { FaPenAlt, FaPlus, FaStickyNote } from "react-icons/fa";
import API from "utils/Axios";
import AgendarCita from "../AgendarCita";
import PresentarDerecho from "../PresentarDerecho";
import { FcAlarmClock, FcComments } from "react-icons/fc";
import moment from "moment";
import Nota from "../Nota";
import Tutela from "../Tutela";
import Demanda from "../Demanda";

const Actuaciones = ({ asesoriaId, caso, setCaso }) => {
  const [mostrarAgendarCita, setMostrarAgendarCita] = useState(false);
  const [mostrarPresentarDerecho, setMostrarPresentarDerecho] = useState(false);
  const [mostrarNota, setMostrarNota] = useState(false);
  const [mostrarTutela, setMostrarTutela] = useState(false);
  const [mostrarDemanda, setMostrarDemanda] = useState(false);

  const [seguimientos, setSeguimientos] = useState([]);
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
      const { data } = await API(
        `asesorias/seguimiento/?num_asesoria=${asesoriaId}`
      );
      setSeguimientos(data);
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  const onSave = (seguimiento) => {
    const index = seguimientos.findIndex((s) => s.id == seguimiento.id);
    if (index < 0) {
      setSeguimientos([...seguimientos, seguimiento]);
    } else {
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
      {!seguimientos.length && (
        <h5 className="mb-4">Aquí inicia el proceso!</h5>
      )}
      <Card.Body style={{ height: 400, overflowY: "scroll" }}>
        {seguimientos.map((s) => {
          switch (s.c_tipoSeguimientoAccion) {
            case "NOTA":
              return (
                <Card className="mb-1">
                  <Card.Header className="d-flex align-items-center">
                    <FcComments />
                    Nota
                  </Card.Header>
                  <Card.Body>
                    <h5>{moment(s.sys_fechaCreacion).format("LLL")}</h5>
                    <p>{s.t_observacion}</p>
                    <Button onClick={() => setEdit(s)}>
                      <FaPenAlt />
                    </Button>
                  </Card.Body>
                </Card>
              );
              break;
            case "CITA":
              return (
                <Card className="mb-1">
                  <Card.Header className="d-flex align-items-center">
                    <FcAlarmClock />
                    Cita
                  </Card.Header>
                  <Card.Body>
                    <h5>{moment(s.dt_fechaNuevaCita).format("LLL")}</h5>
                    <p>{s.t_observacion}</p>
                    <Button onClick={() => setEdit(s)}>
                      <FaPenAlt />
                    </Button>
                  </Card.Body>
                </Card>
              );
              break;
            case "DERECHO_PETICION":
              return (
                <Card className="mb-1">
                  <Card.Header className="d-flex align-items-center">
                    Derecho de petición
                  </Card.Header>
                  <Card.Body>
                    <h5>{moment(s.dt_fechaRadicacion).format("LLL")}</h5>
                    <p className="text-justify">{s.t_observacion}</p>
                    <p className="text-justify">{s.t_respuesta}</p>
                    <Button onClick={() => setEdit(s)}>
                      <FaPenAlt />
                    </Button>
                  </Card.Body>
                </Card>
              );
              break;
            case "TUTELA":
              return (
                <Card className="mb-1">
                  <Card.Header className="d-flex align-items-center">
                    Tutela
                  </Card.Header>
                  <Card.Body>
                    <h5>{moment(s.dt_fechaRadicacionTutela).format("LLL")}</h5>
                    <p className="text-justify">{s.t_observacion}</p>
                    <p className="text-justify">{s.t_respuesta}</p>
                    <Button onClick={() => setEdit(s)}>
                      <FaPenAlt />
                    </Button>
                  </Card.Body>
                </Card>
              );
              break;
            case "DEMANDA":
              return (
                <Card className="mb-1">
                  <Card.Header className="d-flex align-items-center">
                    Demanda
                  </Card.Header>
                  <Card.Body>
                    <h5>{moment(s.dt_fechaRadicaciona).format("LLL")}</h5>
                    <p className="text-justify">{s.t_observacion}</p>
                    <p className="text-justify">{s.t_respuesta}</p>
                    <Button onClick={() => setEdit(s)}>
                      <FaPenAlt />
                    </Button>
                  </Card.Body>
                </Card>
              );
              break;
          }
        })}
      </Card.Body>

      <Card.Footer>
        <div className="text-center mt-4">
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
                Añadir nota
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  action("CITA");
                  setDoc(null);
                }}
              >
                Agendar cita
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
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Footer>
    </div>
  );
};

export default Actuaciones;
