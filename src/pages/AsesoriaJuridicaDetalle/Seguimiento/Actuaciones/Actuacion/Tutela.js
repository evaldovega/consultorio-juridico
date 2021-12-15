import Header from "./Header";
import moment from "moment";

const Tutela = ({ actuacion, setEdit }) => {
  console.log({ actuacion });
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="tutela" setEdit={setEdit} />
      <p className="text-justify">
        <b>
          <i>{moment(actuacion.dt_fechaRadicacionTutela).format("LLL")}</i>
        </b>{" "}
        {actuacion.t_observacion}
      </p>
      <p className="text-justify">{actuacion.t_respuesta}</p>
      <div className="divider"></div>
    </div>
  );
};

export default Tutela;
