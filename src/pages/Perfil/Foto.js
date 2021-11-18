import Errors from "components/Errors";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { useContext } from "react";
import Context from "./Ctx";
import { baseUrl } from "utils/Axios";

const FotoPerfil = () => {
  const { readOnly, watch, control, errors, setValue } = useContext(Context);
  const [src, setSrc] = useState("");

  const url = watch("f_archivoFotoPerfil", "");

  const onChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setSrc(reader.result);
      setValue("f_archivoFotoPerfil", reader.result);
      e.target.value = "";
    };
  };

  useEffect(() => {
    console.log({ url });
    if (url) {
      setSrc(url);
    }
  }, [url]);
  return (
    <>
      <div
        style={{
          position: "relative",
          width: 128,
          height: 128,
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid silver",
        }}
      >
        <Image className="img-fluid" src={`${baseUrl}${src}`} />
        <Form.Control
          type="file"
          style={{
            opacity: 0,
            position: "absolute",
            width: 128,
            height: 128,
            top: 0,
            left: 0,
            zIndex: 2,
          }}
          onChange={onChange}
        />
      </div>
      <Controller
        name="f_archivoFotoPerfil"
        control={control}
        defaultValue=""
        rules={{ required: "Seleccione una foto de perfil" }}
        render={({ field }) => <input {...field} type="hidden" />}
      />
      <Errors message={errors?.f_archivoFotoPerfil?.message} />
    </>
  );
};

export default FotoPerfil;
