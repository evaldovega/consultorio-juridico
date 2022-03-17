import { useEffect } from "react";
import { useState } from "react";

import API from "utils/Axios";
import PersonaDetailRow from "components/personaDetailRow";

import { toast } from "react-toastify";
import Policy, { policyAllow } from "components/Policy";
import { ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE, ROL_ESTUDIANTE } from "constants/apiContants";
import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import { Alert, Button } from "react-bootstrap";
import AsignarEstudiante from "./Asignar";
import Docente from './Docente'

const Estudiantes = ({ asesoriaId, caso = {}, setCaso }) => {
  const { mm_estudiantesAsignados = [] } = caso;
  const { policies } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [listado, setListado] = useState([]);
  const [allowRemove, setAllowRemove] = useState(false);
  const [visible, setVisible] = useState(false);

  const onRemoveEstudiante = async (id) => {
    try {
      setLoading(true);
      const index = listado.indexOf(id);
      const listadoTemporal = [...listado];
      listadoTemporal.splice(index, 1);
      await API.patch(`asesorias/solicitud/${asesoriaId}/`, {
        mm_estudiantesAsignados: listadoTemporal,
      });
      setCaso({ ...caso, mm_estudiantesAsignados: listadoTemporal });
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
      setVisible(false);
      const listadoTemporal = [...listado];
      listadoTemporal.push(estudiantes[0].id);
      await API.patch(`asesorias/solicitud/${asesoriaId}/`, {
        mm_estudiantesAsignados: listadoTemporal,
      });
      setCaso({ ...caso, mm_estudiantesAsignados: listadoTemporal });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("No se pudo asignar el estudiante. Por favor verifique que el estudiante esté matriculado en un grupo y tenga un profesor asignado.", {
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
    if (policies && policies.length > 0) {
      setAllowRemove(
        policyAllow([ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE], policies)
      );
    } else {
      setAllowRemove(false);
    }
  }, [policies]);

  useEffect(() => {
    if (mm_estudiantesAsignados) {
      setListado(mm_estudiantesAsignados);
    }
    console.log(listado)
  }, [mm_estudiantesAsignados]);

  return (
    <div>
      {listado?.length == 0 ? (
        <Alert variant="info">No hay estudiantes asignados</Alert>
      ) : null}
      {listado?.map((e, i) => (
        <>
          <PersonaDetailRow
            id={e}
            allowRemove={allowRemove}
            onRemove={onRemoveEstudiante}
          />
          <Policy policy={[ROL_ADMIN, ROL_ESTUDIANTE, ROL_DOCENTE]}>
            <Docente id={e} />
          </Policy>
          {i < listado.length - 1 && <hr />}
        </>
      ))}
      <Policy policy={[ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE]}>
        <div className="d-flex justify-content-center">
          <Button onClick={() => setVisible(true)}>Asignar estudiante</Button>
        </div>

        <AsignarEstudiante
          visible={visible}
          setVisible={setVisible}
          onSelect={onSelect}
        />
      </Policy>
    </div>
  );
};

export default Estudiantes;
