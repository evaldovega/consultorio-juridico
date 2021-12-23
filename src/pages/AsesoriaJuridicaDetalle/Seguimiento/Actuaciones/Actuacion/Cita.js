import Header from "./Header";
import moment from "moment";
import Footer from "./Footer";

const Cita = ({ actuacion, setEdit }) => {
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="cita" setEdit={setEdit} />
      <p>
        <b>{moment(actuacion.dt_fechaNuevaCita).format("LLL")}</b>{" "}
        {actuacion.t_observacion}
      </p>
      <Footer actuacion={actuacion} />
    </div>
  );
};

export default Cita;
