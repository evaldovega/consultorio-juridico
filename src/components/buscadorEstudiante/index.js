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
    API.post("/academusoft/estudiantes/", { estudiante: query })
    .then(({ data }) => {
      let array_options = []
      array_options.push({
        id: data.id,
        label: `${data.a_primerNombre} ${data.a_segundoNombre} ${data.a_primerApellido} ${data.a_segundoApellido} `
      })
      setOptions(array_options);
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
