import Spin from "components/Spin";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";

const Img = ({ originalSrc, style = {}, ...otrasPropiedades }) => {
  const [src, setSrc] = useState("");
  const [cargando, setCargando] = useState("");
  const noCargada = (e) => {
    setSrc("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    setTimeout(() => setCargando(false), 500);
    console.log("Foto no cargada ", e);
  };
  const cargada = () => {
    setTimeout(() => setCargando(false), 500);
  };
  useEffect(() => {
    setCargando(true);
    setSrc(originalSrc);
  }, [originalSrc]);

  return (
    <Spin cargando={cargando}>
      <Image
        className="img-fluid"
        src={src}
        onError={noCargada}
        onLoad={cargada}
        style={style}
        {...otrasPropiedades}
      />
    </Spin>
  );
};
export default Img;
