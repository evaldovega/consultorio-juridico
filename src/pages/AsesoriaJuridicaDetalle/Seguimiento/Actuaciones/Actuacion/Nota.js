import Footer from "./Footer";
import Header from "./Header";
const Nota = ({ actuacion, setEdit }) => {
  console.log({ actuacion });
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="nota" setEdit={setEdit} />
      <p>{actuacion.t_observacion}</p>
      <Footer actuacion={actuacion} />
      <div className="divider"></div>
    </div>
  );
};

export default Nota;
