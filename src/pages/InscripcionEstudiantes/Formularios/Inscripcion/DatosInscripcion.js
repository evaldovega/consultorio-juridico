import React from "react";
import {
  Form,
  Space,
  Input,
  Card,
  Divider,
  Select,
  InputNumber,
  DatePicker,
  Typography,
} from "antd";

const DatosInscripcion = ({showShadow=true}) => {
  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  return (
    <>
      <Typography.Title level={5} className="title-blue">
        Datos de Inscripcion
      </Typography.Title>
      <Card className={showShadow ? 'card-shadown' : ''}>
      <div className="grid-2">
        <div>

          <Form.Item label="Codigo estudiantil" rules={rules}>
            <Input />
          </Form.Item>
        </div>
        <div>

          <Form.Item label="Año" rules={rules}>
            <InputNumber />
          </Form.Item>
        </div>
        </div>
        <div className="grid-2">
          <div>

          <Form.Item label="Semestre" rules={rules}>
            <InputNumber />
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Jornada" rules={rules}>
            <Select>
              <Select.Option>Diurna</Select.Option>
            </Select>
          </Form.Item>
          </div>
        </div>
        <div className="grid-2">
          <div>

          <Form.Item label="Consultorio número" rules={rules}>
            <Select>
              <Select.Option>Consultorio 1</Select.Option>
            </Select>
          </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

          <Form.Item label="Grupo" rules={rules}>
            <Select>
              <Select.Option>Grupo 1</Select.Option>
            </Select>
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Turno" rules={rules}>
            <Input />
          </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

          <Form.Item label="Lugar" rules={rules}>
            <Select>
              <Select.Option>Lugar 1</Select.Option>
            </Select>
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Fecha inscripción" rules={rules}>
            <DatePicker />
          </Form.Item>
          </div>
          
        </div>
      </Card>
    </>
  );
};

export default DatosInscripcion;
