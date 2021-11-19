import { useEffect, useState, useContext } from "react";
import { Card, Form, Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const Anexos = ({ control, getValues, setValue, watch }) => {
  const name = "mm_documentosAnexos";

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
      });
      setValue(name, _anexos);
      e.target.value = "";
    };
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
    <Card className="mt-1 mb-1">
      <Card.Body style={{ padding: "2.5rem" }}>
        <h2 className="title-line">
          <span>Pruebas y anexos</span>
        </h2>
        <Table className="mb-3">
          <thead>
            <th>Documento</th>
            <th></th>
          </thead>
          <tbody>
            {anexos?.map((d, i) => (
              <tr key={i}>
                <td>{d.a_titulo}</td>
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
      </Card.Body>
    </Card>
  );
};

export default Anexos;
