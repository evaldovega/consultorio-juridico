import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import API from "utils/Axios";
import Select from "react-select";

const LugarPractica = ({
  field,
  labelKey = "a_titulo",
  name = "lugar",
  mostrarTodos = false,
  watch,
}) => {
  const [value, setValue] = useState(null);
  const [lugares, setLugares] = useState([]);
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
      <Select
        closeMenuOnSelect={true}
        isClearable
        value={value}
        placeholder="Seleccione un lugar"
        options={lugares}
        onChange={(d) => {
          field.onChange(d?.value);
        }}
      />
    </>
  );
};

export default LugarPractica;
