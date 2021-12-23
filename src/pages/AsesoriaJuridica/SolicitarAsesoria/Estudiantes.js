import { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import BuscadorEstudiante from "components/buscadorEstudiante";
import Context from "./Ctx";
import { Card, Button, Table } from "react-bootstrap";

const AsesoriaEstudiantes = () => {
  const { readOnly, control, errors, setValue, watch, getValues } =
    useContext(Context);
  const estudiantesAsignados = watch("mm_estudiantesAsignados", []);

  const estudianteSeleccionado = (estudiante) => {
    if (!estudiante.length) {
      return;
    }
    const estudiantes = getValues("mm_estudiantesAsignados") || [];
    estudiantes.push(estudiante[0]);
    setValue("mm_estudiantesAsignados", estudiantes);
  };
  const remove = (index) => {
    let estudiantes = getValues("mm_estudiantesAsignados");
    estudiantes.splice(index, 1);
    setValue("mm_estudiantesAsignados", estudiantes);
  };

  return (
    <Card style={{ overflow: "visible!important" }} className="mb-4">
      <Card.Body style={{ padding: "2.5rem", overflow: "visible!important" }}>
        <h2 className="mb-4">Asignar estudiantes</h2>
        <BuscadorEstudiante
          onSelect={estudianteSeleccionado}
          multiple={false}
        />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estudiantesAsignados &&
              estudiantesAsignados.map((e, i) => (
                <tr key={i}>
                  <td>{e.label}</td>
                  <td>
                    <Button onClick={() => remove(i)}>
                      <FaTimes />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AsesoriaEstudiantes;
