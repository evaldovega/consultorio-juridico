import { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import API from "utils/Axios";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
// import { LugarPracticasFormulario } from "components/LugarPracticas/Formulario";

const LugarPractica = ({
  field,
  labelKey = "a_titulo",
  name = "lugar",
  mostrarTodos = false,
  watch,
}) => {
  const [value, setValue] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [visible, setVisible] = useState(false);
  const [autoridadGuardada, setAutoridadGuardada] = useState([]);
  const select = useRef();
  const lugar = watch(name);

  function filterBy(option, state) {
    if (state.selected.length) {
      return true;
    }
    return option.label.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
  }

  const cargarLugares = () => {
    API("configuracion/lugar-practicas/").then(({ data }) => {
      setLugares(data.map((d) => ({ value: d.id, label: d[labelKey] })));
    });
  };

  useEffect(() => {
    cargarLugares();
  }, []);

  useEffect(() => {
    const _lugar = lugares.find((l) => l.value == lugar);
    if (_lugar) {
      setValue(_lugar);
    } else {
      setValue(null);
    }
  }, [lugar, lugares]);

  return (
    <>
      {/* <Select
        closeMenuOnSelect={true}
        isClearable
        value={value}
        placeholder="Seleccione un lugar"
        options={lugares}
        onChange={(d) => {
          field.onChange(d?.value);
        }}
      /> */}

      
      <Form.Label>Lugar de prácticas <span className="required" /></Form.Label>
      <div class="input-group mb-3 d-flex">
        <div class="input-group-prepend">
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={() => setVisible(true)}
          >
            <FaPlus />
          </button>
        </div>
        {/* <Form.Control as="select" {...field} ref={select}>
          <option value="">Seleccione...</option>
          {lugares.map((el) => (
            <option value={el.value} key={el.value}>
              {el.label}
            </option>
          ))}
        </Form.Control> */}
        <div style={{ display: 'flex', flex: 1 }} className="container-select">
          <Select
            closeMenuOnSelect={true}
            isClearable
            value={value}
            placeholder="Seleccione un lugar"
            options={lugares}
            styles={{ flex: 1 }}
            onChange={(d) => {
              field.onChange(d?.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LugarPractica;
