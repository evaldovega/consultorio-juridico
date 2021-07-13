import React, { useState } from "react";
import { Form, Space, Input, Card, Button, Select, DatePicker,Typography,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UploadCustom from "components/Upload";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
const DatosDocumento = ({ form, Countries = [], States = [], Cities = [],showShadow=true, doc=null}) => {
  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const selectedCountry = (country) => {
    const _states = States.states.filter((c) => c.id_country == country);
    form.setFieldsValue({
      "estado-expedicion-doc": "",
      "ciudad-expedicion-doc": "",
    });
    setStates(_states);
  };
  const selectedState = (state) => {
    const _cities = Cities.cities.filter((c) => c.id_state == state);
    form.setFieldsValue({ "ciudad-expedicion-doc": "" });
    setCities(_cities);
  };


  return (
    <>
      <Typography.Title level={5} className="title-blue">
        Datos del documento
      </Typography.Title>
      <Card className={showShadow ? "card-shadown" : ""}>
        <div className="grid-2">
          <div>
            <Form.Item label="Tipo" name="r_config_tipoDocumento" rules={rules}>
              <Select>
                <Select.Option value={1}>Cedula</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Número" name="a_numeroDocumento" rules={rules}>
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <Form.Item
              label="Fecha expedición"
              name="a_fechaExpedicionDocumento"
              rules={rules}
            >
              <DatePicker />
            </Form.Item>
          </div>
          <Country name="r_config_paisExpedicion" state='r_config_departamentoExpedicion' rules={rules} />
        </div>

        <div className="grid-2">
          <State name="r_config_departamentoExpedicion" city='r_config_ciudadExpedicion' rules={rules} />
          <City name="r_config_ciudadExpedicion" rules={rules} />
        </div>

        <UploadCustom
          label="Foto del docuemento"
          size={{ width: 300 }}
          form={form}
          name="f_archivoDocumento"
          accept=".png,.jpg,.jpeg"
        >
          <Button
            type="primary"
            className="btn-secundary"
            icon={<UploadOutlined />}
          >
            Arrastra o selecciona una foto legible del documento
          </Button>
        </UploadCustom>
      </Card>
    </>
  );
};

export default DatosDocumento;
