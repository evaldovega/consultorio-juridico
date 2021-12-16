import { useState } from "react";
import { useEffect } from "react";
import API from "utils/Axios";

const PersonaTag = ({ id }) => {
  const [doc, setDoc] = useState({});

  const cargar = () => {
    if (id) {
      API(`/usuarios/personas/${id}/`).then(({ data }) => {
        setDoc(data);
      });
    }
  };
  useEffect(() => {
    cargar();
  }, [id]);
  return (
    <small>
      {doc?.a_primerNombre} {doc?.a_primerApellido}
    </small>
  );
};
export default PersonaTag;
