import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AccessDenied = ({ msn }) => {
  return (
    <Container>
      <div className="jumbotron" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 className="display-5">Acceso restringido</h1>
        <p className="lead">{msn || "Contacta con el administrador"}</p>
        <Link to="/">
          <Button type="link">Regresar al inicio</Button>
        </Link>
      </div>
    </Container>
  );
};
export default AccessDenied;
