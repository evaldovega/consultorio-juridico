import Footer from "./Footer";
import Header from "./Header";

const Anexo = ({ actuacion, setEdit, anexos = [] }) => {
  const [anexo = {}] = anexos;
  const { a_titulo, f_archivoDocumento } = anexo;

  return (
    <div className="mb-3 mt-3">
      <Header
        actuacion={actuacion}
        titulo="Anexo"
        setEdit={setEdit}
        optionView={false}
      />
      <a target="blank" href={f_archivoDocumento}>
        {a_titulo}
      </a>
      <Footer actuacion={actuacion} />
      <div className="divider"></div>
    </div>
  );
};

export default Anexo;
