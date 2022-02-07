import { Form } from "react-bootstrap";
import API from "utils/Axios";
import { useEffect, useState, useRef } from "react";
import AutoridadFormulario from "./Formulario";
import { FaPlus } from "react-icons/fa";

const Autoridad = ({ field = {}, setValue }) => {
  const [docs, setDocs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [visible, setVisible] = useState(false);
  const select = useRef();

  const cargar = () => {
    setCargando(true);
    API.get("configuracion/entidad/")
      .then((response) => {
        setDocs(response.data);
      })
      .finally(() => {
        setCargando(false);
      });
  };

  const autoriadGuardada = (doc) => {
    setDocs([...docs, doc]);
    setVisible(false);
    if (setValue) {
      setValue([field.name], doc.id);
    } else {
      select.current.value = doc.id;
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <>
      <AutoridadFormulario
        visible={visible}
        autoriadGuardada={autoriadGuardada}
        setVisible={setVisible}
      />
      <Form.Label>Autoridad</Form.Label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={() => setVisible(true)}
          >
            <FaPlus />
          </button>
        </div>
        <Form.Control as="select" {...field} ref={select}>
          <option value="">Seleccione...</option>
          {docs.map((el) => (
            <option value={el.id} key={el.id}>
              {el.a_titulo}
            </option>
          ))}
        </Form.Control>
      </div>
    </>
  );
};

export default Autoridad;
