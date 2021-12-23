import Demanda from "./Demanda";
import Tutela from "./Tutela";
import DerechoPeticion from "./DerechoPeticion";
import Cita from "./Cita";
import Nota from "./Nota";
import Anexo from "./Anexo";
import Conciliacion from "./Conciliar";

const Actuacion = ({
  actuacion,
  anexos,
  setEdit,
  anexoBorrado,
  persona,
  index,
  total,
}) => {
  const { c_tipoSeguimientoAccion } = actuacion;

  const dibujar = () => {
    switch (c_tipoSeguimientoAccion) {
      case "CONCILIAR":
        return (
          <Conciliacion
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
      case "DERECHO_PETICION":
        return (
          <DerechoPeticion
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
      case "TUTELA":
        return (
          <Tutela
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
      case "DEMANDA":
        return (
          <Demanda
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
      case "CITA":
        return (
          <Cita
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
      case "NOTA":
        return (
          <Nota
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
      case "ANEXO":
        return (
          <Anexo
            actuacion={actuacion}
            anexos={anexos}
            setEdit={setEdit}
            anexoBorrado={anexoBorrado}
            persona={persona}
          />
        );
        break;
    }
  };

  return (
    <div className="d-flex align-items-center actuacion">
      <div style={{ width: "20%" }} className="d-flex justify-content-center">
        <div className="accion-number">{total - index}</div>
      </div>
      <div style={{ width: "90%" }}>{dibujar()}</div>
    </div>
  );
};

export default Actuacion;
