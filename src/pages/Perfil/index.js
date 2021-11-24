import { useState } from "react";
import Page from "components/Page";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PerfilMaster from "./Master";
import { toast } from "react-toastify";
import { FaPenAlt, FaEye } from "react-icons/fa";
const Perfil = () => {
  const id_persona = localStorage.getItem("id_persona");
  const [readOnly, setReadOnly] = useState(true);

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
        <Card.Header className="d-flex justify-content-end">
          <Button onClick={() => setReadOnly(!readOnly)}>
            {!readOnly ? <FaPenAlt /> : <FaEye />}
          </Button>
        </Card.Header>
        <Card.Body style={{ padding: "2.5rem" }}>
          <PerfilMaster
            id={id_persona}
            callback={callback}
            allowSearchPerson={false}
            readOnly={readOnly}
          />
        </Card.Body>
      </Card>
    </Page>
  );
};
export default Perfil;
