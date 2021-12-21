import { useState, useContext } from "react";
import Page from "components/Page";
import { Breadcrumb, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PerfilMaster from "./Master";
import { toast } from "react-toastify";
import { FaPenAlt, FaEye } from "react-icons/fa";
import { Context } from "components/Policy/Ctx";

const Perfil = () => {
  const { policies, persona } = useContext(Context);
  const id_persona = localStorage.getItem("id_persona");
  const [readOnly, setReadOnly] = useState(true);

  const callback = ({ persona, success }) => {
    if (success) {
      toast.success("Perfil actualizado correctamente", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setReadOnly(true);
    }
  };
  return (
    <Page>
      <div className="d-flex justify-content-between align-items-center">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={() => setReadOnly(!readOnly)}>
          {!readOnly ? <FaPenAlt /> : <FaPenAlt />}
        </Button>
      </div>

      <Card>
        <Card.Body style={{ padding: "2.5rem" }}>
          <PerfilMaster
            id={id_persona}
            callback={callback}
            allowSearchPerson={false}
            readOnly={readOnly}
            policies={policies}
          />
        </Card.Body>
      </Card>
    </Page>
  );
};
export default Perfil;
