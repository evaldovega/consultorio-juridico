import React, { useState, useEffect } from "react";
import {
  Form,
  Space,
  Input,
  Card,
  Divider,
  Select,
  DatePicker,
  Switch, Typography
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import API from 'utils/Axios';

const DatosLaborales = ({ form, showShadow = true }) => {
  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  const [work, setWork] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profesiones, setProfesiones] = useState([])

  const load = () => {
    setLoading(true)
    setError(null)
    API('configuracion/profesion/').then(({ data }) => {
      setProfesiones(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }

  useEffect(() => {
    load()
  }, [])

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
            // rules={rules}
            >
              <Select>
                {profesiones.map((el, i) => (
                  <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                ))}
              </Select>
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
