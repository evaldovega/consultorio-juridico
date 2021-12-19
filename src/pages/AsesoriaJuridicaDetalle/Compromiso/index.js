import { useState, useEffect } from "react";
import { Button, Container, Alert } from "react-bootstrap";

import { useContext } from "react";
import { Context } from "components/Policy/Ctx";
import CompromisoFormulario from "./Formulario";
import moment from "moment";

const Compromisos = ({ asesoriaId, caso = {}, setCaso }) => {
  const { persona: personaId } = useContext(Context);
  const [establecido, setEstablecido] = useState(false);
  const [asignado, setAsignado] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (caso) {
      setAsignado(
        caso.mm_estudiantesAsignados &&
          caso.mm_estudiantesAsignados.includes(personaId)
      );
      setEstablecido(caso?.t_recomendaciones?.length);
    }
  }, [caso, personaId]);

  if (!establecido) {
    return (
      <Container className="mb-4">
        {asignado ? (
          <div className="d-flex justify-content-center">
            <Button type="button" onClick={() => setVisible(true)}>
              Establecer compromiso ahora para llevar este caso
            </Button>
          </div>
        ) : (
          <Alert variant="info">
            No se ha establecido un compromiso. Solo los estudiantes asignados
            pueden establecerlo.
          </Alert>
        )}
        <CompromisoFormulario
          caso={caso}
          setCaso={setCaso}
          asesoriaId={asesoriaId}
          visible={visible}
          setVisible={setVisible}
        />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h2 className="title-line">
          <span>Compromiso</span>
        </h2>
        <p>
          <h4>Recomendaciones</h4>
          {caso?.t_recomendaciones}
          <h4>Compromiso</h4>
          {caso?.t_compromisos}
          <h4>Fecha limite para cumplir compromisos</h4>
          {moment(caso?.dt_fechaCumplimientoCompromisos).format("YYYY/MM/DD")}
        </p>
      </Container>
    </>
  );
};

export default Compromisos;
