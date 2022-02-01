import { Spin } from "antd";
import { FaTimes } from "react-icons/fa";
import { PAGE_SIZE } from "constants/apiContants";
import { useEffect, useState, useRef, useContext } from "react";
import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Row,
  Col,
  Table,
  Pagination,
} from "react-bootstrap";
import API from "utils/Axios";
import BuscadorEstudiante from "components/buscadorEstudiante";

const Estudiantes = ({ getValues, setValue, watch }) => {
  const checked = watch("r_usuarios_estudiante", []);

  const estudianteSeleccionado = (estudiante) => {
    if (!estudiante.length) {
      return;
    }
    const estudiantes = getValues("r_usuarios_estudiante") || [];
    estudiantes.push(estudiante[0].id);
    setValue("r_usuarios_estudiante", estudiantes);
  };
  const remove = (index) => {
    let estudiantes = getValues("r_usuarios_estudiante");
    estudiantes.splice(index, 1);
    setValue("r_usuarios_estudiante", estudiantes);
  };

  return (
      <Card className="mb-4">
        <Card.Header>
          <h2>Seleccione los estudiantes para remisión</h2>
        </Card.Header>
        <Card.Body>
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
              {checked &&
                checked.map((e, i) => (
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

export default Estudiantes;
