import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import API from "utils/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useRef } from "react";

const BuscadorEstudiante = ({ style = {}, onSelect, ...rest }) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  let typeahead = useRef();

  const handleSearch = (query) => {
    setLoading(true);

    API(`/estudiantes/inscripcion?q=${query}`).then(({ data }) => {
      setOptions(
        data.map((d) => ({
          id: d.r_usuarios_persona.id,
          label:
            d.r_usuarios_persona.a_primerNombre +
            " " +
            d.r_usuarios_persona.a_primerApellido,
        }))
      );
      setLoading(false);
    });
  };
  const filterBy = () => true;

  useEffect(() => {
    onSelect(singleSelections);
    //setTimeout(() => setSingleSelections([]), 500);
  }, [singleSelections]);

  return (
    <AsyncTypeahead
      id="basic-typeahead-single"
      ref={(ref) => (typeahead = ref)}
      filterBy={filterBy}
      className="menu-relative"
      labelKey="label"
      isLoading={loading}
      onChange={(e) => {
        setSingleSelections(e);
        typeahead.clear();
      }}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Seleccione un estudiante..."
      selected={singleSelections}
      style={{ ...style }}
      {...rest}
    />
  );
};

export default BuscadorEstudiante;
