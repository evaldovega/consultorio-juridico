import Header from "./Header";
const Demanda = ({ actuacion, setEdit }) => {
  console.log({ actuacion });
  return (
    <div className="mb-3 mt-3">
      <Header actuacion={actuacion} titulo="demanda" setEdit={setEdit} />
      <p className="text-justify">{actuacion?.t_observacion}</p>
      <p className="text-justify">{actuacion?.t_respuesta}</p>
      <div className="divider"></div>
    </div>
  );
};

export default Demanda;
