import Errors from "components/Errors";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useContext } from "react";
import Context from "./Ctx";
import { baseUrl } from "utils/Axios";
import Img from "components/Img";

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
    if (url) {
      const nuevaUrl = url.includes(baseUrl)
        ? url
        : url.includes("base64")
        ? url
        : `${baseUrl}${url}`;
      setSrc(nuevaUrl);
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
        <Img originalSrc={src} />
      </div>
      <Form.Control type="file" onChange={onChange} />
      <Controller
        name="f_archivoFotoPerfil"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} type="hidden" />}
      />
      <Errors message={errors?.f_archivoFotoPerfil?.message} />
    </>
  );
};

export default FotoPerfil;
