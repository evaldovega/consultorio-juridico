import { useState } from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import API from "utils/Axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useRef } from "react";

const CiudadanoBusqueda = ({ style = {}, onSelect, ...rest }) => {
  const today = new Date()
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
    // await API.post("academusoft/estudiantes/matriculados/todos/", {
    //   doc_docente: localStorage.getItem('doc_identidad'),
    //   grupos: grupos
    // })
    await API.get(`estudiantes/inscripcion/?anio_validez=${today.getFullYear()}&q=${query}`)
      .then(response => {
        setOptions(response.data.results.map((el) => (
          {
            id: el?.r_usuarios_persona?.id,
            label: `${el?.r_usuarios_persona.a_primerNombre} ${el?.r_usuarios_persona.a_segundoNombre || ""} ${el?.r_usuarios_persona.a_primerApellido} ${el?.r_usuarios_persona.a_segundoApellido || ""} `
          }
        )))
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
      searchText="Buscando..."
      emptyLabel="No se encontraron estudiantes."
      labelKey="label"
      isLoading={loading}
      onChange={(e) => {
        setSingleSelections(e);
        typeahead.clear();
      }}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Escriba el nombre del estudiante"
      selected={singleSelections}
      style={{ ...style }}
      {...rest}
    />
  );
};

export default CiudadanoBusqueda;
