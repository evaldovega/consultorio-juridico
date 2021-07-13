import React, { useState } from "react";
import {
  Form,
  Space,
  Input,
  Card,
  Divider,
  Select,
  DatePicker,
  Switch,Typography
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const DatosLaborales = ({ form, Countries = [], States = [], Cities = [],showShadow=true }) => {
  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [work, setWork] = useState(false);

  const selectedCountry = (country) => {
    const _states = States.states.filter((c) => c.id_country == country);
    form.setFieldsValue({ "estado-laboral": "", "ciudad-laboral": "" });
    setStates(_states);
  };
  const selectedState = (state) => {
    const _cities = Cities.cities.filter((c) => c.id_state == state);
    form.setFieldsValue({ "ciudad-laboral": "" });
    setCities(_cities);
  };

  return (
    <>
      <Typography.Title level={5} className="title-blue">
        Datos laborales
      </Typography.Title>
      <Card className={showShadow ? 'card-shadown' : ''}>
      <div className="grid-2">
        <div>

          <Form.Item
            label="Profesión u oficio"
            tooltip={{
              title: "Ejemplo: Estudiante",
              icon: <InfoCircleOutlined />,
            }}
            name="r_config_profesion"
            rules={rules}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="grid-2">
          <div>

          <Form.Item label="Servidor público" name="b_servidorPublico">
            <Switch checkedChildren="Si" unCheckedChildren="No" />
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Trabaja" name="trabaja-laboral">
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              onChange={setWork}
            />
          </Form.Item>
          </div>
          </div>
        </div>

        {work ? (
          <div>
            <Space style={{ display: "flex" }} size='large'>
              <Form.Item label="Pais" name="r_config_paisLaboral" rules={rules}>
                <Select
                  autocomplete="off"
                  disabled={!work}
                  onChange={selectedCountry}
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Countries.countries.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Estado" name="r_config_departamentoLaboral" rules={rules}>
                <Select
                  onChange={selectedState}
                  disabled={!work}
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {states.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Space>
            <Space style={{ display: "flex" }} size='large'>
              <Form.Item label="Ciudad" name="r_config_ciudadLaboral" rules={rules}>
                <Select
                  showSearch
                  disabled={!work}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cities.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Empresa" name="a_nombreEmpresa" rules={rules}>
                <Input disabled={!work} />
              </Form.Item>
            </Space>

            <Space style={{ display: "flex" }} size='large'>
              <Form.Item
                label="Dirección"
                name="a_direccionEmpresa"
                rules={rules}
              >
                <Input disabled={!work} />
              </Form.Item>
              <Form.Item
                label="Barrio"
                name="a_barrioEmpresa"
                rules={rules}
              >
                <Input disabled={!work} />
              </Form.Item>
            </Space>
            <Space style={{ display: "flex" }} size='large'>
              <Form.Item
                label="Teléfono"
                name="a_telefonoEmpresa"
                rules={rules}
              >
                <Input disabled={!work} />
              </Form.Item>
              <Form.Item
                label="Cargo"
                name="a_cargoEmpresa"
                rules={rules}
              >
                <Input disabled={!work} />
              </Form.Item>
            </Space>
            <Space style={{ display: "flex" }} size='large'>
              <Form.Item
                label="Nivel salarial"
                name="a_nivelSalarial"
                rules={rules}
              >
                <Input disabled={!work} />
              </Form.Item>
              <div></div>
            </Space>
          </div>
        ) : null}
      </Card>
    </>
  );
};

export default DatosLaborales;
