import Header from "./Header";
import moment from "moment";

const Cita = ({ actuacion, setEdit }) => {
  console.log({ actuacion });
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="cita" setEdit={setEdit} />
      <p>
        <b>{moment(actuacion.dt_fechaNuevaCita).format("LLL")}</b>{" "}
        {actuacion.t_observacion}
      </p>
      <div className="divider"></div>
    </div>
  );
};

export default Cita;
