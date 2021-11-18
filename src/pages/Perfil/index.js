import Page from "components/Page";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PerfilMaster from "./Master";
import { toast } from "react-toastify";

const Perfil = () => {
  const id_persona = localStorage.getItem("id_persona");

  const callback = ({ persona, success }) => {
    if (success) {
      toast.success("🙌 Perfil actualizado correctamente", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <Page>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Inicio</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Card.Body style={{ padding: "2.5rem" }}>
          <PerfilMaster
            id={id_persona}
            callback={callback}
            allowSearchPerson={false}
          />
        </Card.Body>
      </Card>
    </Page>
  );
};
export default Perfil;
