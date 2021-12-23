import { useState } from "react";
import Header from "./Header";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import Spin from "../../../../../components/Spin";
import { toast } from "react-toastify";
import API from "utils/Axios";
import Footer from "./Footer";
import { CONFIRM_BORRAR_ARCHIVO } from "constants/apiContants";

const DerechoPeticion = ({
  actuacion,
  setEdit,
  anexos,
  anexoBorrado,
  persona = "",
}) => {
  const borrarArchivo = async (archivo) => {
    if (window.confirm(CONFIRM_BORRAR_ARCHIVO)) {
      setCargando(true);
      try {
        await API.delete(`asesorias/docsanexos/${archivo.id}`);
        toast.success("Archivo borrado");
        setCargando(false);
        anexoBorrado(archivo.id);
      } catch (error) {
        setCargando(false);
        toast.error(error.toString());
      }
    }
  };
  const [cargando, setCargando] = useState(false);
  return (
    <Spin cargando={cargando}>
      <div className="mb-3 mt-3">
        <Header
          actuacion={actuacion}
          titulo="derecho de petición"
          setEdit={setEdit}
        />

        <p className="text-justify">
          <b>Fecha radicado: </b>
          {moment(actuacion.dt_fechaRadicacion).format("YYYY-MM-DD")}
          <br />
          <b>Presentado a: </b>
          {actuacion.a_entidadPresentacion}
          <br />
          {actuacion.t_observacion}
        </p>
        <p className="text-justify">{actuacion.t_respuesta}</p>
        {anexos.length ? (
          <ul className="list-group list-group-flush">
            {anexos.map((a) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <a target="blank" href={a.f_archivoDocumento}>
                  {a.a_titulo}
                </a>
                {a.r_usuarios_persona == persona ? (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => borrarArchivo(a)}
                  >
                    Borrar
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
        <Footer actuacion={actuacion} />
      </div>
    </Spin>
  );
};

export default DerechoPeticion;
