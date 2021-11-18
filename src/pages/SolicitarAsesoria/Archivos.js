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
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Context from "./Ctx";

const ArchivosAsesoria = () => {
  const name = "mm_documentosAnexos";
  const { readOnly, control, errors, setValue, watch, getValues } =
    useContext(Context);
  const anexos = watch(name, []);

  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      const _anexos = getValues(name) || [];
      _anexos.push({
        a_titulo: file.name,
        f_archivo: reader.result,
        reserva_legal: false,
      });
      setValue(name, _anexos);
      e.target.value = "";
    };
  };

  const onCheck = (event, index) => {
    setValue(`${name}.${index}.reserva_legal`, event.target.checked);
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
      <Table className="mb-3">
        <thead>
          <th>Documento</th>
          <th>Reserva legal</th>
          <th></th>
        </thead>
        <tbody>
          {anexos?.map((d, i) => (
            <tr key={i}>
              <td>{d.a_titulo}</td>
              <td>
                <Form.Check
                  checked={d.reserva_legal}
                  onChange={(e) => onCheck(e, i)}
                />
              </td>
              <td>
                <Button type="button" size="sm" onClick={() => remove(i)}>
                  <FaTimes />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form.Group>
        <Form.File onChange={onChange} label="Adjuntar" />
      </Form.Group>
    </div>
  );
};

export default ArchivosAsesoria;
