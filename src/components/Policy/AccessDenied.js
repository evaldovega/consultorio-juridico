import {Alert, Button,Result } from "antd";
import { Link } from "react-router-dom";

const AccessDenied = ({ msn }) => {
  return (
    <div style={{ padding: 32 }}>
      <Result
        status="403"
        title="403"
        subTitle={msn}
        extra={<Link to="/">
        <Button type="link">Regresar al inicio</Button>
      </Link>}
      />
    </div>
  );
};
export default AccessDenied;
