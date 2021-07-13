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
          <Form.Item label="Codigo estudiantil" name='a_cod_estudiantil' rules={rules}>
            <Input />
          </Form.Item>
        </div>
        <div>

          <Form.Item label="Año" name='ano' rules={rules}>
            <InputNumber />
          </Form.Item>
        </div>
        </div>
        <div className="grid-2">
          <div>

          <Form.Item label="Semestre" name='semestre' rules={rules}>
            <InputNumber />
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Jornada" name='jornada' rules={rules}>
            <Select>
              <Select.Option value={1}>Diurna</Select.Option>
            </Select>
          </Form.Item>
          </div>
        </div>
        <div className="grid-2">
          <div>

          <Form.Item label="Consultorio número" name='consultorio' rules={rules}>
            <Select>
              <Select.Option value={1}>Consultorio 1</Select.Option>
            </Select>
          </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

          <Form.Item label="Grupo" name='grupo' rules={rules}>
            <Select>
              <Select.Option value={1}>Grupo 1</Select.Option>
            </Select>
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Turno" name='turno' rules={rules}>
            <Input />
          </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

          <Form.Item label="Lugar" name='lugar' rules={rules}>
            <Select>
              <Select.Option value={1}>Lugar 1</Select.Option>
            </Select>
          </Form.Item>
          </div>
          <div>

          <Form.Item label="Fecha inscripción" name='fecha_inscripcion' rules={rules}>
            <DatePicker />
          </Form.Item>
          </div>
          
        </div>
      </Card>
    </>
  );
};

export default DatosInscripcion;
