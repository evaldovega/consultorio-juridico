import PersonaTag from "components/PersonaTag";
import moment from "moment";
import { FaUserCircle, FaRegUser } from "react-icons/fa";

const Footer = ({ actuacion }) => {
  return (
    <div className="d-flex justify-space-between align-items-center mt-2">
      <div className="circle-icon mr-2">
        <FaRegUser fontSize={14} />
      </div>
      <PersonaTag id={actuacion.r_usuarios_persona} />
      <small style={{ marginLeft: 4 }}>
        {moment(actuacion?.sys_fechaCreacion).fromNow()}
      </small>
    </div>
  );
};

export default Footer;
