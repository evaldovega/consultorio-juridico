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
import API, { baseUrl } from "utils/Axios"
import { CONFIRM_BORRAR_ARCHIVO } from "constants/apiContants"

const ArchivosAnexos = () => {
  const name = "mm_anexos";
  const { readOnly, control, errors, setValue, watch, getValues } =
    useContext(Context);
  const anexos = watch(name, []);
  const MAX_FILE_SIZE = 200000000;
  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    console.log(file.size, MAX_FILE_SIZE);
    if (file.size > MAX_FILE_SIZE) {
      toast.warn("El archivo es muy pesado, no debe superar los 200 MB");
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = function () {
      const _anexos = getValues(name) || [];
      _anexos.push({
        a_titulo: file.name,
        f_archivo: reader.result
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

  const borrarExistente = async (index, id) => {
    let _anexos = getValues(name);
    if (window.confirm(CONFIRM_BORRAR_ARCHIVO)) {
      anexos.splice(index, 1);
      try {
        const { data } = await API.delete(`usuarios/anexos/${id}/`);
        setValue(name, _anexos);
      } catch (error) {
        console.log(error)
      }
    }
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
              <th></th>
            </Policy>
            <th></th>
          </thead>
          <tbody>
            {anexos?.map((d, i) => (
              <tr key={i}>
                <td>
                  {d.f_archivoDocumento ? (
                    <a href={`${baseUrl}${d.f_archivoDocumento}`}>
                      {d.a_titulo}
                    </a>
                  ) : (
                    d.a_titulo
                  )}
                </td>
                <td>
                  <Button 
                    type="button"
                    size="sm"
                    onClick={
                      d.f_archivoDocumento ? (
                        () => borrarExistente(i, d.id)
                      ) : (
                        () => remove(i)
                      )
                    }
                  >
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

export default ArchivosAnexos;
