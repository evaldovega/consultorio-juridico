import { useState, useContext, useEffect } from "react";
import Policy, { policyAllow } from "components/Policy";
import { Context } from "components/Policy/Ctx";
import {
  ROL_ADMIN,
  ROL_ASESOR,
  ROL_DOCENTE,
  ROL_ESTUDIANTE,
  CONFIRM_BORRAR_ARCHIVO,
} from "constants/apiContants";
import { toast } from "react-toastify";
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
import API, { baseUrl } from "utils/Axios";
import Spin from "components/Spin";
const ArchivosAsesoria = ({ asesoriaId, caso = {}, setCaso }) => {
  const { mm_documentosAnexos = [] } = caso;
  const [cargando, setCargando] = useState(false);
  const { policies, persona: usuarioEnSesion } = useContext(Context);
  const MAX_FILE_SIZE = 200000;

  const edit = async (anexo, anexos) => {
    try {
      setCargando(true);
      await API.patch(`asesorias/docsanexos/${anexo.id}/`, {
        b_reservaLegal: anexo.b_reservaLegal,
        a_titulo: anexo.a_titulo,
      });
      setCaso({ ...caso, mm_documentosAnexos: anexos });
      setCargando(false);
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
        r_usuarios_persona: usuarioEnSesion,
        r_asesoria_solicitudAsesoria: asesoriaId,
      });
      setCaso({
        ...caso,
        mm_documentosAnexos: [...caso.mm_documentosAnexos, data],
      });
      setCargando(false);
    } catch (error) {
      setCargando(false);
    }
  };

  const puedeRemover = (archivo) => {
    if (policies && policies.length) {
      return (
        policyAllow([ROL_ASESOR, ROL_ADMIN, ROL_DOCENTE], policies) ||
        archivo.r_usuarios_persona == usuarioEnSesion
      );
    }
    return false;
  };

  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.warn("El archivo es muy pesado, no debe superar los 200 MB");
      return;
    }
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
    if (window.confirm(CONFIRM_BORRAR_ARCHIVO)) {
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
    }
  };

  return (
    <Spin cargando={cargando}>
      <div>
        <Table className="mb-3">
          <thead>
            <th>Documento</th>
            <Policy
              policy={[ROL_ESTUDIANTE, ROL_ASESOR, ROL_ADMIN, ROL_DOCENTE]}
            >
              <th>Reserva legal</th>
            </Policy>
            <th></th>
          </thead>
          <tbody>
            {mm_documentosAnexos?.map((d, i) => (
              <tr key={i}>
                <td>
                  <a target="blank" href={`${d.f_archivoDocumento}`}>
                    {d.a_titulo}
                  </a>
                </td>
                <Policy
                  policy={[ROL_ESTUDIANTE, ROL_ASESOR, ROL_ADMIN, ROL_DOCENTE]}
                >
                  <td>
                    <Form.Check
                      checked={d.b_reservaLegal}
                      onChange={(e) => onCheck(e, i)}
                    />
                  </td>
                </Policy>
                <td>
                  {puedeRemover(d) ? (
                    <Button type="button" size="sm" onClick={() => remove(i)}>
                      <FaTimes />
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form.Group>
          <Form.Label>Cargar otro archivo</Form.Label>
          <Form.File onChange={onChange} />
        </Form.Group>
      </div>
    </Spin>
  );
};

export default ArchivosAsesoria;
