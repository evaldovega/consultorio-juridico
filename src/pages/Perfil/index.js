import Page from "components/Page";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { POLITICA_DATOS } from "constants/apiContants";
import Country from "components/Country";
import State from "components/State";
import City from "components/City";
import OrientacionSexualSelector from "components/OrientacionSexualSelector";
import EtniaSelector from "components/EtniaSelector";
import Discapacidad from "pages/InscripcionEstudiantes/Formularios/Inscripcion/Discapacidad";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Typography, Card } = require("antd");

const Perfil = () => {
  const rules = [{ required: true, message: "Ingrese esta información" }];
  const [form] = Form.useForm();
  return (
    <Page>
      <div>
        <Typography.Title>Datos del usuario</Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FEF5E7",
            border: "2px solid #F5CBA7",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <img
            width={96}
            src="https://image.flaticon.com/icons/png/512/3898/3898808.png"
          />
          <Typography.Paragraph>
            Politica de datos {POLITICA_DATOS}...
          </Typography.Paragraph>
        </div>

        <Form layout="vertical" form={form}>
          <Typography.Title level={5} className="title-blue">
            Datos básicos
          </Typography.Title>
          <Card className="card-shadown">
            <div className="grid-3">
              <Form.Item label="Nombre y apellidos" rules={rules} name="nombre">
                <Input />
              </Form.Item>
              <Form.Item
                label="Fecha de nacimiento"
                rules={rules}
                name="nacimiento"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="Estado civil" rules={rules} name="ec">
                <Select />
              </Form.Item>
              <Form.Item
                label="Profesión u oficio"
                rules={rules}
                name="profesion"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Correo electrónico" name="ce">
                <Input />
              </Form.Item>
              <Form.Item label="Número de celular" name="ce">
                <Input />
              </Form.Item>
            </div>
          </Card>
          <br></br>
          <Card className="card-shadown">
            <div className="grid-3">
              <Form.Item label="Genero" name="genero">
                <Select>
                  <Select.Option value="F">Femenino</Select.Option>
                  <Select.Option value="M">Masculino</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Orientación sexual"
                name="orientacion"
                rules={rules}
              >
                <OrientacionSexualSelector />
              </Form.Item>
              <Form.Item label="Etnia" name="etnia" rules={rules}>
                <EtniaSelector />
              </Form.Item>
              <Form.Item label="Mujer cabeza de familia" name="cdf">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Afectado por la violencia" name="aplv">
                <Checkbox />
              </Form.Item>
              <div style={{ display: "flex", minWidth: 300 }}>
                <Form.Item label="Migrante" name="migrante">
                  <Checkbox />
                </Form.Item>
                <Form.Item label="&nbsp;" name="ddem">
                  <Input placeholder="De donde?" />
                </Form.Item>
              </div>
            </div>
          </Card>

          <br></br>

          <Card className="card-shadown">
            <div className="grid-3">
              <Country
                label="Pais de residencia"
                name="id_pais"
                state="id_state"
              />
              <State name="id_state" city="id_ciudad" />
              <City name="id_ciudad" />
              <Form.Item label="Barrio">
                <Input />
              </Form.Item>
              <Form.Item label="Dirección">
                <Input />
              </Form.Item>
              <Form.Item label="Vivienda">
                <Select />
              </Form.Item>
            </div>
          </Card>

          <br></br>
          <Card className="card-shadown">
            <div className="grid-3">
              <Form.Item label="Presentación del SISBEN" rules={rules}>
                <Select />
              </Form.Item>
              <Form.Item label="Estrato" rules={rules}>
                <Select />
              </Form.Item>
              <Form.Item label="Presentación de servicio público" rules={rules}>
                <Select />
              </Form.Item>
              </div>
          </Card>
          <br></br>
          <Typography.Title level={5} className="title-blue">
            Documento de identidad
          </Typography.Title>
          <Card className="card-shadown">
            <div className="grid-3">
              <Form.Item label="Nùmero de documento" rules={rules}>
                <Input />
              </Form.Item>
              <Country
                label="Pais de expedicion"
                name="id_pais"
                state="id_state"
              />
              <State name="id_state" city="id_ciudad" />
              <City name="id_ciudad" />
            </div>
          </Card>
          <br></br>

          <Discapacidad form={form} showShadow={true} />

          <br></br>
          <Typography.Title level={5} className="title-blue">
            Datos laborales
          </Typography.Title>
          <Card className="card-shadown">
            <div className="grid-3">
            <Form.Item label="Trabaja" name="aplv">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Es un servidor público" name="aplv">
                <Checkbox />
              </Form.Item>
              <Form.Item label="Cargo" name="aplv">
                <Input />
              </Form.Item>
              <Form.Item label="Nombre de la empresa" name="aplv">
                <Input />
              </Form.Item>
            </div>
          </Card>
          <br></br>
          <Form.Item>
            <Button type="primary">Guardar perfil</Button>
          </Form.Item>
        </Form>
      </div>
    </Page>
  );
};
export default Perfil;
