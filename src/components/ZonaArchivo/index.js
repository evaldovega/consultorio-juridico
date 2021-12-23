import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";

const ZonaArchivo = ({ onArchivo }) => {
  const [clases, setClases] = useState({ active: false, "drag-area": true });
  const [archivo, setArchivo] = useState(null);

  const archivoSeleccionado = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var reader = new FileReader();
    console.log(e);
    const file =
      e.target && e.target.files && e.target.files.length
        ? e.target.files[0]
        : e.dataTransfer.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      setArchivo({
        f_archivo: reader.result,
        a_titulo: file.name,
      });

      e.target.value = "";
    };
  };

  useEffect(() => {
    onArchivo(archivo);
  }, [archivo]);

  if (archivo) {
    return (
      <center>
        <h4>{archivo.a_titulo}</h4>
        <Button variant="danger" onClick={() => setArchivo(null)}>
          Cancelar
        </Button>
      </center>
    );
  }
  return (
    <div
      className={classNames(clases)}
      onDragOver={(e) => {
        setClases({ ...clases, active: true });
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setClases({ ...clases, active: false });
        e.preventDefault();
      }}
      onDrop={archivoSeleccionado}
    >
      <div className="icon">
        <FaFileUpload />
      </div>
      <header>
        {clases.active
          ? "Suelta para cargar"
          : "Arrastra & Suelta un archivo aquí"}
      </header>
      <span>O</span>
      <Button variant="primary">
        Selecciona un archivo
        <input type="file" onChange={archivoSeleccionado} />
      </Button>
    </div>
  );
};
export default ZonaArchivo;
