import React, { useState } from "react";
import {
  Form,
  Space,
  Input,
  Card,
  Divider,
  Select,
  DatePicker,
  Typography,
} from "antd";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";

const DatosUbicacion = ({ form, Countries = [], States = [], Cities = [],showShadow=true }) => {
  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedCountry = (country) => {
    const _states = States.states.filter((c) => c.id_country == country);
    form.setFieldsValue({ "estado-ubicacion": "", "ciudad-ubicacion": "" });
    setStates(_states);
  };
  const selectedState = (state) => {
    const _cities = Cities.cities.filter((c) => c.id_state == state);
    form.setFieldsValue({ "ciudad-ubicacion": "" });
    setCities(_cities);
  };

  return (
    <>
      <Typography.Title level={5} className="title-blue">
        Datos de ubicación
      </Typography.Title>
      <Card className={showShadow ? 'card-shadown' : ''}>
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

          <Form.Item label="Dirección" name="a_direccion" rules={rules}>
            <Input />
          </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>
          <Form.Item label="Barrio" name="a_barrio" rules={rules}>
            <Input />
          </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

          <Form.Item label="Celular" name="a_celular" rules={rules}>
            <Input />
          </Form.Item>
          </div>
          <div>
          <Form.Item
            label="Correo electrónico"
            name="a_correoElectronico"
            rules={rules}
          >
            <Input />
          </Form.Item>
          </div>
        </div>
      </Card>
    </>
  );
};

export default DatosUbicacion;
