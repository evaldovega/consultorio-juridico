import moment from "moment";
import { useState } from "react";
import { Button, NavDropdown, Form } from "react-bootstrap";
import { FaCalendar } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "utils/Axios";
const { default: Spin } = require("components/Spin");

const EstablecerFecha = ({ caso, setCaso }) => {
  const [cargando, setCargando] = useState(false);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);

  const guardar = async () => {
    try {
      setCargando(true);
      const { data } = await API.patch("asesorias/solicitud/" + caso.id + "/", {
        dt_fechaAsesoria: fecha ? fecha : "",
        ht_horaAsesoria: hora ? hora : "",
      });
      toast.success("Fecha y hora actualizada");
      setCargando(false);
      setCaso({
        ...caso,
        dt_fechaAsesoria: data.dt_fechaAsesoria,
        ht_horaAsesoria: data.ht_horaAsesoria,
      });
      document.getElementById("establecer-fecha").click();
    } catch (error) {
      setCargando(false);
      toast.error(error.toString());
    }
  };
  return (
    <NavDropdown
      title={
        <span
          style={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
            fontSize: "16px",
          }}
        >
          <FaCalendar />
        </span>
      }
      id="establecer-fecha"
    >
      <NavDropdown.ItemText style={{ width: "250px" }}>
        <Spin cargando={cargando}>
          <Form>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFecha(e.target.value)}
              />
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                onChange={(e) => setHora(e.target.value)}
              />
            </Form.Group>
            <Button onClick={guardar}>Guardar</Button>
          </Form>
        </Spin>
      </NavDropdown.ItemText>
    </NavDropdown>
  );
};
export default EstablecerFecha;
