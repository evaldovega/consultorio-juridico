import classNames from "classnames";
import { Spinner } from "react-bootstrap";

const Spin = ({ cargando, children }) => {
  const classes = classNames({
    spin: true,
    "spin-cargando": cargando,
  });
  return (
    <div className={classes}>
      {children}
      <Spinner animation="border"></Spinner>
    </div>
  );
};

export default Spin;
