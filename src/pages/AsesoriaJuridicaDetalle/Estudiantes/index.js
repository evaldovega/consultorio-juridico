import { useEffect } from "react";
import { useState } from "react";

import API from "utils/Axios";
import PersonaDetailRow from "components/personaDetailRow";
import BuscadorEstudiante from "components/buscadorEstudiante";
import { toast } from "react-toastify";

const Estudiantes = ({ asesoriaId, caso = {}, setCaso }) => {
  const { mm_estudiantesAsignados = [] } = caso;

  const [loading, setLoading] = useState(false);
  const [listado, setListado] = useState([]);

  const onRemoveEstudiante = async (id) => {
    try {
      setLoading(true);
      const index = listado.indexOf(id);
      const listadoTemporal = [...listado];
      listadoTemporal.splice(index, 1);
      await API.patch(`asesorias/solicitud/${asesoriaId}/`, {
        mm_estudiantesAsignados: listadoTemporal,
      });
      setListado(listadoTemporal);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("No se pudo remover el estudiante!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const onSelect = async (estudiantes) => {
    try {
      if (!estudiantes.length) {
        return;
      }
      const listadoTemporal = [...listado];
      listadoTemporal.push(estudiantes[0].id);
      await API.patch(`asesorias/solicitud/${asesoriaId}/`, {
        mm_estudiantesAsignados: listadoTemporal,
      });
      setListado(listadoTemporal);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("No se pudo asignar el estudiante!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    if (mm_estudiantesAsignados) {
      setListado(mm_estudiantesAsignados);
    }
  }, [mm_estudiantesAsignados]);

  return (
    <div>
      {listado?.map((e, i) => (
        <>
          {" "}
          <PersonaDetailRow
            id={e}
            allowRemove={true}
            onRemove={onRemoveEstudiante}
          />
          {i < listado.length - 1 && <hr />}
        </>
      ))}
      <h5></h5>
      <BuscadorEstudiante onSelect={onSelect} />
    </div>
  );
};

export default Estudiantes;
