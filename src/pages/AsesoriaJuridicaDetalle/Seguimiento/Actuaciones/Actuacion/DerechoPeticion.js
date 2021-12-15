import Header from "./Header";
import moment from "moment";

const DerechoPeticion = ({ actuacion, setEdit }) => {
  console.log({ actuacion });
  return (
    <div className="mb-3 mt-3">
      <Header
        actuacion={actuacion}
        titulo="derecho de petición"
        setEdit={setEdit}
      />
      <p className="text-justify">
        <b>{moment(actuacion.dt_fechaRadicacion).format("LLL")}</b>{" "}
        {actuacion.t_observacion}
      </p>
      <p className="text-justify">{actuacion.t_respuesta}</p>
      <div className="divider"></div>
    </div>
  );
};

export default DerechoPeticion;
