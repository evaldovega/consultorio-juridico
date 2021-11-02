import React, { useEffect, useState } from "react";
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
import API from 'utils/Axios';

const DatosInscripcion = ({ showShadow = true }) => {
  const [jornadas, setJornadas] = useState([])
  const [lugarPracticas, setLugarPracticas] = useState([])
  const [grupos, setGrupos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = () => {
    setLoading(true)
    setError(null)
    API('configuracion/jornadas/').then(({ data }) => {
      setJornadas(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/lugar-practicas/').then(({ data }) => {
      setLugarPracticas(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/grupo/').then(({ data }) => {
      setGrupos(data)
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

  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  return (
    <>
      <Typography.Title level={5} className="title-blue">
        Datos de Inscripcion
      </Typography.Title>
      <Card className={showShadow ? 'card-shadown' : ''}>
        <div className="grid-2">
          <div>
            <Form.Item label="Codigo estudiantil" name='a_codigoEstudiantil' rules={rules}>
              <Input />
            </Form.Item>
          </div>
          <div>

            <Form.Item label="Año" name='a_anioInscripcion' rules={rules}>
              <InputNumber />
            </Form.Item>
          </div>
        </div>
        <div className="grid-2">
          <div>

            <Form.Item label="Semestre" name='a_semestreInscripcion' rules={rules}>
              <InputNumber />
            </Form.Item>
          </div>
          <div>

            <Form.Item label="Jornada" name='r_config_jornadaInscripcion' rules={rules}>
              <Select>
                {jornadas.map((el, i) => (
                  <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="grid-2">
          <div>

            <Form.Item label="Consultorio número" name='a_numeroConsultorio' rules={rules}>
              <Select>
                <Select.Option value={1}>Consultorio 1</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

            <Form.Item label="Grupo" name='r_config_grupo' rules={rules}>
              <Select>
                {grupos.map((el, i) => (
                  <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>

            <Form.Item label="Turno" name='a_turno' rules={rules}>
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="grid-2">
          <div>

            <Form.Item label="Lugar" name='r_config_lugarPracticas' rules={rules}>
              <Select>
                {lugarPracticas.map((el, i) => (
                  <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>

            <Form.Item label="Fecha inscripción" name='dt_fechaInscripcion' rules={rules}>
              <DatePicker />
            </Form.Item>
          </div>

        </div>
      </Card>
    </>
  );
};

export default DatosInscripcion;
