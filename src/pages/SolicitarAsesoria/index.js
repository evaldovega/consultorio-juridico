import {
  Breadcrumb, Button, Card,
  Checkbox, DatePicker, Form,
  Input, notification, Select,
  Spin, Switch, Typography
} from 'antd';
import City from 'components/City';
import Country from "components/Country";
import State from 'components/State';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import API from 'utils/Axios';
import ArchivosAsesoria from "./Archivos";
import SolicitarAsesoriaDocs from './Documentos';

var moment = require('moment')

const { default: Page } = require("components/Page")
const { default: Policy } = require("components/Policy")
const { ROL_PERSONA } = require("constants/apiContants")


const SolicitarAsesoria = () => {
  const [form] = Form.useForm();
  const rules = [{ required: true, message: "Por favor rellene este campo!" }];
  const [loading, setLoading] = useState(false)
  const [tiposDocumento, setTipos] = useState([])
  const [discapacidades, setDiscapacidades] = useState([])
  const [afectacionViolencia, setAfectacionViolencia] = useState([])
  const [orientaciones, setOrientaciones] = useState([])
  const [estadosCiviles, setEstadosCiviles] = useState([])
  const [escolaridades, setEscolaridades] = useState([])
  const [profesiones, setProfesiones] = useState([])
  const [tiposVivienda, setTiposVivienda] = useState([])
  const [etnias, setEtnias] = useState([])
  const [error, setError] = useState(null)

  const save = async (data) => {
    setLoading(true);
    API.post('asesorias/solicitud/', data)
      .then(({ data }) => {
        setLoading(false)
        notification['success']({
          message: 'Felicitaciones',
          description:
            'Su asesoría fue enviada correctamente.',
        });
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  const load = () => {
    setLoading(true)
    setError(null)
    API('configuracion/tipo-documento/').then(({ data }) => {
      setTipos(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/afectacion-violencia/').then(({ data }) => {
      setAfectacionViolencia(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/orientacion/').then(({ data }) => {
      setOrientaciones(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/discapacidad/').then(({ data }) => {
      data.map((el) => (
        discapacidades.push({ 'label': el.a_titulo, 'value': el.id })
      ))
      // console.log("Discapacidades: " + JSON.stringify(data))
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/etnia/').then(({ data }) => {
      setEtnias(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/escolaridad/').then(({ data }) => {
      setEscolaridades(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/estado-civil/').then(({ data }) => {
      setEstadosCiviles(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/profesion/').then(({ data }) => {
      setProfesiones(data)
    }).catch(error => {
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    API('configuracion/tipo-vivienda/').then(({ data }) => {
      setTiposVivienda(data)
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
    <Policy policy={[]}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Solicitar asesoria</Breadcrumb.Item>
        </Breadcrumb>
        <div className='section-title'>
          <Typography.Title level={4}>
            Formato Registro de Asesoría Jurídica - Consultorio Jurídico
          </Typography.Title>
          <Typography.Title style={{ color: '#003789', fontWeight: 'bold', fontSize: 24, textAlign: 'left', marginTop: 50 }}>
            Datos del usuario
          </Typography.Title>
          <Typography.Paragraph style={{ textAlign: 'left', color: '#707070', fontSize: 16 }}>
            Con base en nuestra Política de Tratamiento de Datos Personales, Resolución Rectoral 001425 de agosto 9 de 2016, La Universidad del Atlántico proporciona los medios para garantizar y no vulnerar los derechos de la privacidad, la intimidad personal y el buen nombre con el tratamiento de datos personales consignados en nuestras bases de datos.
          </Typography.Paragraph>
        </div>
        <Form form={form} layout="vertical" onFinish={save}>
          <Card className='card-shadown' style={{ marginTop: 64 }}>
            <Spin spinning={loading}>
              <Form.Item name="dt_fechaAsesoria" initialValue={moment().format('YYYY-MM-DD')} noStyle>
                <Input type="hidden"/>
              </Form.Item>
              <Form.Item name="ht_horaAsesoria" initialValue={moment().format('HH:mm')} noStyle>
                <Input type="hidden" />
              </Form.Item>
              <div className="grid-2">
                <div>

                  <Form.Item
                    label="Nombres y apellidos"
                    name="a_nombreCompleto"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Edad"
                    name="a_edad"
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <Form.Item label="Tipo de documento" name="r_config_tipoDocumento">
                  <Select>
                    {tiposDocumento.map((el, i) => (
                      <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div>
                  <Form.Item
                    label="Número de identidad"
                    name="a_numeroDocumento"
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="grid-3">
                <Country label="País de expedición" name="r_config_paisExpedicion" state='r_config_departamentoExpedicion' rules={rules} />
                <State label="Departamento de expedición" name="r_config_departamentoExpedicion" city='r_config_ciudadExpedicion' rules={rules} />
                <City label="Municipio de expedición" name="r_config_ciudadExpedicion" rules={rules} />
              </div>
            </Spin>
          </Card>
          <Card className='card-shadown' style={{ marginTop: 54 }}>
            <Spin spinning={loading}>
              <div className="grid-4">
                <div>
                  <Form.Item label="Género" name="c_genero">
                    <Select>
                      <Select.Option value="F">Femenino</Select.Option>
                      <Select.Option value="M">Masculino</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Orientación sexual" name="r_config_orientacion">
                    <Select>
                      {orientaciones.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Etnia" name="r_config_etnia">
                    <Select>
                      {etnias.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Nivel educativo" name="r_config_escolaridad">
                    <Select>
                      {escolaridades.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <Form.Item label="Mujer cabeza de familia" name="b_mujerCabezaFamilia">
                    <Switch checkedChildren="Si" unCheckedChildren="No" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Afectado por la violencia" name="r_config_afectacionViolencia">
                    <Select>
                      {afectacionViolencia.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <Form.Item label="Migrante" name="b_migrante">
                    <Switch checkedChildren="Si" unCheckedChildren="No" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="¿De dónde?"
                    name="a_migrante"
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </Spin>
          </Card>
          <Typography.Title level={5} className="title-blue">
            Discapacidad
          </Typography.Title>
          <Card className='card-shadown'>
            <div className='discapacidades'>
              <Form.Item name="mm_discapacidad">
                {discapacidades.length > 0 ? (
                  <Checkbox.Group
                    options={discapacidades}
                    style={{ width: "100%" }}
                  />
                ) : (
                  <></>
                )}
              </Form.Item>
            </div>
          </Card>
          <Card className='card-shadown' style={{ marginTop: 54 }}>
            <Spin spinning={loading}>
              <div className="grid-3">
                <div>
                  <Form.Item
                    label="Dirección de residencia"
                    name="a_direccion"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Barrio"
                    name="a_barrio"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Country name="r_config_paisUbicacion" state='r_config_departamentoUbicacion' rules={rules} />
                </div>
                <State name="r_config_departamentoUbicacion" city='r_config_ciudadUbicacion' rules={rules} />
                <div>
                  <City name="r_config_ciudadUbicacion" rules={rules} />
                </div>
                <div>
                  <Form.Item label="Vivienda" name="r_config_tipovivienda">
                    <Select>
                      {tiposVivienda.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <Form.Item label="Estado civil" name="r_config_estadoCivil">
                    <Select>
                      {estadosCiviles.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Teléfono celular"
                    name="a_telefonoCelular"
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <Form.Item
                    label="Correo electrónico"
                    name="a_correoElectronico"
                    rules={[{
                      type: 'email',
                      message: 'Introduzca un e-mail válido.'
                    }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Profesión u oficio" name="r_config_profesion">
                    <Select>
                      {profesiones.map((el, i) => (
                        <Select.Option value={el.id}>{el.a_titulo}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

              </div>
            </Spin>
          </Card>
          <Card className='card-shadown' style={{ marginTop: 54 }}>
            <Spin spinning={loading}>
              <div className="grid-2">
                <div className="grid-2">
                  <div>
                    <Form.Item label="Trabaja" name="b_trabaja">
                      <Switch checkedChildren="Si" unCheckedChildren="No" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item label="Servidor público" name="b_servidorPublico">
                      <Switch checkedChildren="Si" unCheckedChildren="No" />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <div>
                    <Form.Item
                      label="Cargo"
                      name="a_cargoEmpresa"
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <Form.Item
                    label="Nombre de la empresa donde labora"
                    name="a_nombreEmpresa"
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Presentación de SISBEN" name="b_presentacionSisben">
                    <Switch checkedChildren="Si" unCheckedChildren="No" />
                  </Form.Item>
                </div>
              </div>
              <div className="grid-2">
                <div>
                  <Form.Item label="Presentación de recibo de servicio público" name="b_presentacionServiciosPublicos">
                    <Switch checkedChildren="Si" unCheckedChildren="No" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Estrato" name="c_estrato">
                    <Select>
                      <Select.Option value="1">Estrato 1</Select.Option>
                      <Select.Option value="2">Estrato 2</Select.Option>
                      <Select.Option value="3">Estrato 3</Select.Option>
                      <Select.Option value="4">Estrato 4</Select.Option>
                      <Select.Option value="5">Estrato 5</Select.Option>
                      <Select.Option value="6">Estrato 6</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </Spin>
          </Card>
          <Typography.Title level={5} className="title-blue">
            Asunto de consulta
          </Typography.Title>
          <Card className='card-shadown' style={{ marginTop: 34 }}>
            <Spin spinning={loading}>
              <Form.Item name="t_asuntoConsulta" rules={[{ required: true, message: 'Describa los hechos' }]} tooltip="Describa detalladamente los hechos">
                <Input.TextArea rows={5} cols={5} placeholder="Exponga su caso de manera breve..." />
              </Form.Item>
            </Spin>
          </Card>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={5} className="title-blue">
                Documentos anexados
              </Typography.Title>
            </div>
            <div style={{ textAlign: 'right', flex: 1, marginTop: 50 }}>
              <SolicitarAsesoriaDocs />
            </div>
          </div>
          <Card className='card-shadown' style={{ marginTop: 34 }}>
            <Spin spinning={loading}>
              <ArchivosAsesoria />
            </Spin>
          </Card>
          <Form.Item style={{ marginTop: 20, textAlign: 'right' }}>
            <Button type='primary' htmlType='submit'>Guardar</Button>
          </Form.Item>
        </Form>
      </Page>
    </Policy>
  );
}

export default SolicitarAsesoria