import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import API from "utils/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useRef } from "react";

const BuscadorEstudiante = ({ style = {}, onSelect, ...rest }) => {
  const [singleSelections, setSingleSelections] = useState([]);
  const [cedula, setCedula] = useState(localStorage.getItem('doc_identidad'));
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grupos, setGrupos] = useState("")
  let typeahead = useRef();

  const getAsignaciones = async () => {
    await API.get(`asignacion/empleados/?cedula=${localStorage.getItem('doc_identidad')}`)
      .then(response => {
        setGrupos(`(${response.data.results.map((el, i) => (
          `'${el?.r_config_grupo?.a_codigoAcademusoft}'`
        ))})`)
      })
  }

  const handleSearch = async (query) => {
    setLoading(true);
    await API.post("academusoft/estudiantes/matriculados/todos/", {
      doc_docente: localStorage.getItem('doc_identidad'),
      grupos: grupos
    })
    await API.get(`estudiantes/inscripcion/?cedula=${query}`)
      .then(response => {
        let inscripcion = response.data.results[0]
        let array_options = []
        array_options.push({
          id: inscripcion?.r_usuarios_persona?.id,
          label: `${inscripcion?.r_usuarios_persona.a_primerNombre} ${inscripcion?.r_usuarios_persona.a_segundoNombre} ${inscripcion?.r_usuarios_persona.a_primerApellido} ${inscripcion?.r_usuarios_persona.a_segundoApellido} `
        })
        setOptions(array_options);
        setLoading(false);
      });
      console.log(grupos)
  };
  const filterBy = () => true;

  useEffect(() => {
    getAsignaciones();
  }, [])

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
