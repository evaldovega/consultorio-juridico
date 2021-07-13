import React, { useState } from "react";
import { Form, Space, Input, Card, Button, DatePicker, Select, Typography,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadCustom from "components/Upload";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";

const DatosPersonales = ({
  form,
  Countries = [],
  States = [],
  Cities = [],
  showShadow=true,
  doc=null
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const rules = [{ required: true, message: "Por favor rellena este campo!" }];

  const selectedCountry = (country) => {
    const _states = States.states.filter((c) => c.id_country == country);
    form.setFieldsValue({ estado: "", ciudad: "" });
    setStates(_states);
  };
  const selectedState = (state) => {
    const _cities = Cities.cities.filter((c) => c.id_state == state);
    form.setFieldsValue({ ciudad: "" });
    setCities(_cities);
  };

  return (
    <>
      <Typography.Title level={5} className="title-blue">
        Datos personales
      </Typography.Title>
      <Card className={showShadow ? "card-shadown" : ""}>
        <div className="grid-2">
          <div>
            <Form.Item
              label="Primer nombre"
              name="a_primerNombre"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Segundo nombre"
              name="a_segundoNombre"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <Form.Item
              label="Primer apellido"
              name="a_primerApellido"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Segundo apellido"
              name="a_segundoApellido"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <Country
            form={form}
            name="r_config_paisUbicacion"
            state="r_config_departamentoUbicacion"
          />

          <State
            form={form}
            name="r_config_departamentoUbicacion"
            city="r_config_ciudadUbicacion"
          />
        </div>

        <div className="grid-2">
          <City form={form} name="r_config_ciudadUbicacion" />

          <div>
            <Form.Item
              label="Fecha de nacimiento"
              name="a_fechaNacimiento"
              rules={rules}
            >
              <DatePicker />
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <Form.Item label="Género" name="c_genero" rules={rules}>
              <Select>
                <Select.Option value="Femenino">Femenino</Select.Option>
                <Select.Option value="Masculino">Masculino</Select.Option>
                <Select.Option value="Otro">Otro</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Orientación"
              name="r_config_orientacion"
              rules={rules}
            >
              <Select>
                <Select.Option value={1}>Heterosexual</Select.Option>
                <Select.Option value={2}>Homosexual</Select.Option>
                <Select.Option value={3}>Bisexual</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <Form.Item label="Etnia" name="r_config_etnia" rules={rules}>
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Entidad de salud"
              name="r_config_eps"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <UploadCustom
          form={form}
          name="f_archivoFotoPerfil"
          label="Foto de perfil"
          size={{ width: 200 }}
          accept=".png,.jpg,.jpeg"
        >
          <Button
            type="primary"
            className="btn-secundary"
            icon={<UploadOutlined />}
          >
            Arrastra o selecciona una foto del aspirante
          </Button>
        </UploadCustom>
      </Card>
    </>
  );
};

export default DatosPersonales;
