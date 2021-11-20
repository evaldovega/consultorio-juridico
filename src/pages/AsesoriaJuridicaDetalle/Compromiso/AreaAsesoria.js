import { useForm, Controller } from "react-hook-form";
import Errors from "components/Errors";
import { useState, useEffect } from "react";
import API from "utils/Axios";
import { Form } from "react-bootstrap";

const AreaAsesoria = ({ control, errors, readOnly }) => {
  const [cargando, setCargando] = useState(false);
  const [docs, setDocs] = useState([]);

  const cargar = async () => {
    try {
      setCargando(true);
      const { data } = await API("configuracion/area-asesoria/");
      setDocs(data);
    } catch (error) {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <Controller
      name="r_config_areaAsesoria"
      control={control}
      defaultValue=""
      rules={{ required: "Ingrese información" }}
      render={({ field }) => (
        <Form.Group>
          <Form.Label>
            Área de la consulta <span className="required" />
          </Form.Label>
          <Form.Control
            {...field}
            as="select"
            readOnly={readOnly}
            plaintext={readOnly}
            disabled={readOnly}
          >
            <option value="">Seleccione</option>
            {docs.map((d) => (
              <option key={d.id} value={d.id}>
                {d.a_titulo}
              </option>
            ))}
          </Form.Control>
          {!readOnly && (
            <Errors message={errors?.r_config_areaAsesoria?.message} />
          )}
        </Form.Group>
      )}
    />
  );
};

export default AreaAsesoria;
