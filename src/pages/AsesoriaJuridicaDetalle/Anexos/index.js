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
import API from "utils/Axios";

const ArchivosAsesoria = ({ asesoriaId, caso = {}, setCaso }) => {
  const name = "mm_documentosAnexos";
  const { mm_documentosAnexos = [] } = caso;
  const [cargando, setCargando] = useState(false);

  const edit = async (anexo, anexos) => {
    try {
      setCargando(true);
      await API.patch(`asesorias/docsanexos/${anexo.id}/`, {
        b_reservaLegal: anexo.b_reservaLegal,
        a_titulo: anexo.a_titulo,
      });
      setCaso({ ...caso, mm_documentosAnexos: anexos });
    } catch (error) {
      setCargando(false);
    }
  };

  const save = async (f_archivo, a_titulo) => {
    try {
      setCargando(true);
      const { data } = await API.post(`asesorias/docsanexos/`, {
        f_archivo,
        a_titulo,
        b_reservaLegal: false,
        r_usuarios_persona: 1,
        r_asesoria_solicitudAsesoria: asesoriaId,
      });
      setCaso({
        ...caso,
        mm_documentosAnexos: [...caso.mm_documentosAnexos, data],
      });
    } catch (error) {
      setCargando(false);
    }
  };

  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      save(reader.result, file.name);
      e.target.value = "";
    };
  };

  const onCheck = (event, index) => {
    const _anexos = [...mm_documentosAnexos];
    _anexos[index].b_reservaLegal = event.target.checked;
    edit(_anexos[index], _anexos);
  };

  const remove = async (index) => {
    const anexo = mm_documentosAnexos[index];
    const _anexos = [...mm_documentosAnexos];
    _anexos.splice(index, 1);
    try {
      setCargando(true);
      const { data } = await API.delete(`asesorias/docsanexos/${anexo.id}`);
      setCaso({ ...caso, mm_documentosAnexos: _anexos });
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  return (
    <div>
      <Table className="mb-3">
        <thead>
          <th>Documento</th>
          <th>Reserva legal</th>
          <th></th>
        </thead>
        <tbody>
          {mm_documentosAnexos?.map((d, i) => (
            <tr key={i}>
              <td>{d.a_titulo}</td>
              <td>
                <Form.Check
                  checked={d.b_reservaLegal}
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
