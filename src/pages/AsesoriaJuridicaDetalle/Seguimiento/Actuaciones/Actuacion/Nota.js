import Footer from "./Footer";
import Header from "./Header";
const Nota = ({ actuacion, setEdit }) => {
  console.log({ nota: actuacion });
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="nota" setEdit={setEdit} />
      <p>{actuacion.t_observacion}</p>
      <Footer actuacion={actuacion} />
    </div>
  );
};

export default Nota;
