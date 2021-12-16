import PersonaTag from "components/PersonaTag";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";

const Footer = ({ actuacion }) => {
  return (
    <div className="d-flex justify-space-between align-items-center mt-2">
      <FaUserCircle style={{ marginRight: 4 }} />
      <PersonaTag id={actuacion.r_usuarios_persona} />
      <small style={{ marginLeft: 4 }}>
        {moment(actuacion?.sys_fechaCreacion).fromNow()}
      </small>
    </div>
  );
};

export default Footer;
