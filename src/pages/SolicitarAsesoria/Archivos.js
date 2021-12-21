import Policy from "components/Policy";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
  ROL_ESTUDIANTE,
} from "constants/apiContants";
import { useEffect } from "react";
import { useState, useContext } from "react";
import {
  Card,
  Form,
  Breadcrumb,
  Button,
  Accordion,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";
import { Controller } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Context from "./Ctx";
import { toast } from "react-toastify";

const ArchivosAsesoria = () => {
  const name = "mm_documentosAnexos";
  const { readOnly, control, errors, setValue, watch, getValues } =
    useContext(Context);
  const anexos = watch(name, []);
  const MAX_FILE_SIZE = 200000;
  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    if (file.size > MAX_FILE_SIZE) {
      toast.warn("El archivo es muy pesado, no debe superar los 200 MB");
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = function () {
      const _anexos = getValues(name) || [];
      _anexos.push({
        a_titulo: file.name,
        f_archivo: reader.result,
        b_reservaLegal: false,
      });
      setValue(name, _anexos);
      e.target.value = "";
    };
  };

  const onCheck = (event, index) => {
    setValue(`${name}.${index}.b_reservaLegal`, event.target.checked);
  };

  const remove = (index) => {
    let _anexos = getValues(name);
    _anexos.splice(index, 1);
    setValue(name, _anexos);
  };

  useEffect(() => {
    setValue(name, []);
  }, []);

  return (
    <div>
      {anexos?.length ? (
        <Table className="mb-3">
          <thead>
            <th>Documento</th>

            <Policy
              policy={[ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE, ROL_ESTUDIANTE]}
            >
              <th>Reserva legal</th>
            </Policy>
            <th></th>
          </thead>
          <tbody>
            {anexos?.map((d, i) => (
              <tr key={i}>
                <td>{d.a_titulo}</td>
                <Policy
                  policy={[ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE, ROL_ESTUDIANTE]}
                >
                  <td>
                    <Form.Check
                      checked={d.b_reservaLegal}
                      onChange={(e) => onCheck(e, i)}
                    />
                  </td>
                </Policy>
                <td>
                  <Button type="button" size="sm" onClick={() => remove(i)}>
                    <FaTimes />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No ha cargado ningún archivo.</Alert>
      )}
      <Form.Group>
        <Form.File onChange={onChange} label="Cargar archivos" />
      </Form.Group>
    </div>
  );
};

export default ArchivosAsesoria;
