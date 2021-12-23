import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Conciliar = ({ actuacion }) => {
  const history = useHistory();

  const setEdit = () => {
    sessionStorage.setItem("conciliacion", actuacion.r_raw_idConciliacion);
    history.push("/centro-de-conciliacion/solicitudes");
  };
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="Conciliación" setEdit={setEdit} />
      <p>Se require conciliación</p>
      <Footer actuacion={actuacion} />
    </div>
  );
};

export default Conciliar;
