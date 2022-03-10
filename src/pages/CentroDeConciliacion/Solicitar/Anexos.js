import { useEffect, useState, useContext } from "react";
import { Card, Form, Table, Button, Alert } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import API from "utils/Axios";
import { toast } from "react-toastify";
import Spin from "components/Spin";

const Anexos = ({
  control,
  getValues,
  setValue,
  watch,
  idConciliacion,
  persona,
}) => {
  const anexos = watch("mm_documentosAnexos", []);
  const [docs, setDocs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const MAX_FILE_SIZE = 200000000;

  const onChange = (e) => {
    var reader = new FileReader();
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.warn("El archivo es muy pesado, no debe superar los 200 MB");
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = async function () {
      if (idConciliacion) {
        try {
          setCargando(true);
          const { data } = await API.post("/conciliacion/prueba_anexo/", {
            a_titulo: file.name,
            f_archivo: reader.result,
            r_conciliacion_solicitudConciliacion: idConciliacion,
            r_usuarios_persona: persona,
          });
          setDocs([...docs, data]);
          toast.success("Documento anexado correctamente");
        } catch (error) {
          toast.error("Documento no anexado, intentelo nuevamente por favor");
        }
        setCargando(false);
      } else {
        const _anexos = getValues("mm_documentosAnexos") || [];
        _anexos.push({
          a_titulo: file.name,
          f_archivo: reader.result,
        });
        setValue("mm_documentosAnexos", _anexos);
      }
      e.target.value = "";
    };
  };

  const remove = (index) => {
    let _anexos = getValues("mm_documentosAnexos");
    _anexos.splice(index, 1);
    setValue("mm_documentosAnexos", _anexos);
  };

  const removeRemote = async (index) => {
    try {
      const tmp = [...docs];
      const doc = docs[index];
      setCargando(true);
      await API.delete(`/conciliacion/prueba_anexo/${doc.id}/`);
      tmp.splice(index, 1);
      setDocs(tmp);
    } catch (error) {
      toast.error("Documento no removido, intentelo nuevamente por favor");
    }
    setCargando(false);
  };

  const cargar = async () => {
    try {
      const { data } = await API(
        `/conciliacion/prueba_anexo/?conciliacion=${idConciliacion}`
      );
      setDocs(data);
    } catch (error) {}
  };

  console.log(anexos)

  useEffect(() => {
    console.log("ANEXOS: " + JSON.stringify(anexos))
    setValue("mm_documentosAnexos", []);
  }, []);

  useEffect(() => {
    if (idConciliacion) {
      cargar();
    }
  }, []);

  return (
    <Spin cargando={cargando}>
      <Card className="mb-4">
        <Card.Body style={{ padding: "2.5rem" }}>
          <h2>Pruebas y anexos</h2>
            <Table className="mb-3">
              <thead>
                <th>Documento</th>
                <th></th>
              </thead>
              <tbody>
                {docs?.length || anexos?.length ? (
                  <>
                    {docs?.map((d, i) => (
                      <tr key={`anexo-remoto${i}`}>
                        <td>{d.a_titulo}</td>
                        <td>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => removeRemote(i)}
                          >
                            <FaTimes />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {anexos?.map((d, i) => (
                      <tr key={`anexo${i}`}>
                        <td>{d.a_titulo}</td>
                        <td>
                          <Button type="button" size="sm" onClick={() => remove(i)}>
                            <FaTimes />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <Alert variant="info">No ha cargado ningún archivo.</Alert>
                )}
              </tbody>
            </Table>
            {/* {docs?.length ? ( (
            <Alert variant="info">No ha cargado ningún archivo.</Alert>
          )} */}
          <Form.Group>
            <Form.File onChange={onChange} label="Adjuntar" />
          </Form.Group>
        </Card.Body>
      </Card>
    </Spin>
  );
};
// api/conciliacion/pruebas
export default Anexos;
