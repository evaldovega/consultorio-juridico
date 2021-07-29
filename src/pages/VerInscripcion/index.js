import { Table, Typography, Breadcrumb, Button, Form, Tabs, Popconfirm, notification } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "components/Page";
import { useImmer } from "use-immer";
import { FolderViewOutlined, PrinterFilled, DeleteFilled } from "@ant-design/icons";
import { useForm } from 'antd/lib/form/Form';
import DatosPersonales from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosPersonales'
import Discapacidad from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/Discapacidad';
import DatosDocumento from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosDocumento';
import DatosUbicacion from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosUbicacion';
import DatosLaborales from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosLaborales';
import DatosInscripcion from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosInscripcion';
import ArchivosInscripcion from "./Archivos";
import API from 'utils/Axios';
import Moment from 'moment';
// import inscripciones from 'constants/inscripciones.json'

const { TabPane } = Tabs;

const VerInscripcion = () => {
  const { id } = useParams();
  const [inscripciones, setInscripciones] = useState([])
  const [loading, setLoading] = useState(false)
  const [discapacidades, setDiscapacidades] = useState([])
  const [fechaExpDoc, setFechaExp] = useState("")
  const [doc, setDoc] = useState(null)
  const [form] = useForm()

  const getInscripciones = async () => {
    API.get('estudiantes/inscripcion/').then(response => {
      console.log(JSON.stringify(response.data))
      setDoc({
        ...response.data.find((i) => i.id == id),
        ced: "https://assets.homeis.com/image/fetch/q_auto:low,f_auto/https%3A%2F%2Fassets-gcp.homeis.com%2Fimage%2Fupload%2Fc_fill%2Ce_sharpen%2Cf_jpg%2Cq_auto%2Cw_600%2Fv1%2Fhomeis-prod%2Fprod%2Fuploads%2Fpost%2F2020-08-07%2F18%2F5d813a67a6874b0011c5c62c-459a73af-f697-43ba-af34-8814eb0e7d96.png",
      });
    })
  }

  useEffect(() => {
    getInscripciones();
  }, [])

  useEffect(() => {
    if (doc) {
      form.setFieldsValue({
        a_primerNombre: doc.r_usuarios_persona.a_primerNombre,
        a_segundoNombre: doc.r_usuarios_persona.a_segundoNombre,
        a_primerApellido: doc.r_usuarios_persona.a_primerApellido,
        a_segundoApellido: doc.r_usuarios_persona.a_segundoApellido,
        r_config_paisNacimiento: doc.r_usuarios_persona.r_config_paisNacimiento,
        r_config_departamento: doc.r_usuarios_persona.r_config_departamento,
        r_config_ciudadNacimiento: doc.r_usuarios_persona.r_config_ciudadNacimiento,
        a_fechaNacimiento: Moment(doc.r_usuarios_persona.a_fechaNacimiento),
        c_genero: doc.r_usuarios_persona.c_genero,
        r_config_orientacion: doc.r_usuarios_persona.r_config_orientacion,
        r_config_etnia: doc.r_usuarios_persona.r_config_etnia,
        r_config_eps: doc.r_usuarios_persona.r_config_eps,
        f_archivoFotoPerfil: doc.r_usuarios_persona.f_archivoFotoPerfil,
        mm_discapacidad: doc.mm_discapacidad,
        r_config_tipoDocumento: doc.r_usuarios_persona.r_config_tipoDocumento,
        a_numeroDocumento: doc.r_usuarios_persona.a_numeroDocumento,
        r_config_paisExpedicion: doc.r_usuarios_persona.r_config_paisExpedicion,
        a_fechaExpedicionDocumento: Moment(doc.r_usuarios_persona.a_fechaExpedicionDocumento),
        a_direccion: doc.a_direccion,
        a_barrio: doc.a_barrio,
        a_telefono: doc.a_telefono,
        a_celular: doc.r_usuarios_persona.a_celular,
        a_correoElectronico: doc.r_usuarios_persona.a_correoElectronico,
        r_config_paisUbicacion: doc.r_config_paisUbicacion,
        a_codigoEstudiantil: doc.a_codigoEstudiantil,
        a_anioInscripcion: doc.a_anioInscripcion,
        a_semestreInscripcion: doc.a_semestreInscripcion,
        r_config_jornadaInscripcion: doc.r_config_jornadaInscripcion,
        a_numeroConsultorio: doc.a_numeroConsultorio,
        r_config_grupo: doc.r_config_grupo,
        a_turno: doc.a_turno,
        r_config_lugarPracticas: doc.r_config_lugarPracticas,
        dt_fechaInscripcion: Moment(doc.dt_fechaInscripcion),

      })
      setDiscapacidades(doc.mm_discapacidad)
      setFechaExp(doc.r_usuarios_persona.a_fechaExpedicionDocumento)
      // console.log(JSON.stringify(doc))
    }
  }, [doc])

  const save = async (data) => {
    let dataJson = {
      "r_usuarios_persona": {
        "f_archivoFotoPerfil_str": data.f_archivoFotoPerfil,
        "a_primerNombre": data.a_primerNombre,
        "a_segundoNombre": data.a_segundoNombre,
        "a_primerApellido": data.a_primerApellido,
        "a_segundoApellido": data.a_segundoApellido,
        "a_fechaNacimiento": Moment(data.a_fechaNacimiento).format('YYYY-MM-DD'),
        "a_celular": data.a_celular,
        "a_correoElectronico": data.a_correoElectronico,
        "r_config_paisNacimiento": data.r_config_paisNacimiento,
        "r_config_departamento": data.r_config_departamento,
        "r_config_ciudadNacimiento": data.r_config_ciudadNacimiento,
        "c_genero": data.c_genero,
        "r_config_orientacion": data.r_config_orientacion,
        "r_config_eps": data.r_config_eps,
        "r_config_tipoDocumento": data.r_config_tipoDocumento,
        "a_numeroDocumento": data.a_numeroDocumento,
        "a_fechaExpedicionDocumento": Moment(data.a_fechaExpedicionDocumento).format('YYYY-MM-DD'),
        "r_config_paisExpedicion": data.r_config_paisExpedicion,
        "r_config_departamentoExpedicion": data.r_config_departamentoExpedicion,
        "r_config_ciudadExpedicion": data.r_config_ciudadExpedicion,
        "f_archivoDocumento_str": data.f_archivoDocumento
      },
      "mm_discapacidad": data.mm_discapacidad,
      "r_config_paisUbicacion": data.r_config_paisUbicacion,
      "r_config_departamentoUbicacion": data.r_config_departamentoUbicacion,
      "r_config_ciudadUbicacion": data.r_config_ciudadUbicacion,
      "a_direccion": data.a_direccion,
      "a_barrio": data.a_barrio,
      "a_telefono": data.a_telefono,
      // "r_config_profesion": data.r_config_profesion,
      "b_servidorPublico": data.b_servidorPublico,
      "r_config_paisLaboral": data.r_config_paisLaboral,
      "r_config_departamentoLaboral": data.r_config_departamentoLaboral,
      "r_config_ciudadLaboral": data.r_config_ciudadLaboral,
      "a_nombreEmpresa": data.a_nombreEmpresa,
      "a_direccionEmpresa": data.a_direccionEmpresa,
      "a_cargoEmpresa": data.a_cargoEmpresa,
      "a_nivelSalarial": data.a_nivelSalarial,
      "a_codigoEstudiantil": data.a_codigoEstudiantil,
      "a_anioInscripcion": data.a_anioInscripcion,
      "a_semestreInscripcion": data.a_semestreInscripcion,
      "r_config_jornadaInscripcion": data.r_config_jornadaInscripcion,
      "a_numeroConsultorio": data.a_numeroConsultorio,
      "r_config_grupo": data.r_config_grupo,
      "a_turno": data.a_turno,
      "r_config_lugarPracticas": data.r_config_lugarPracticas,
      "dt_fechaInscripcion": Moment(data.dt_fechaInscripcion).format('YYYY-MM-DD')
    }
    console.log(JSON.stringify(dataJson))
    setLoading(true)
    API.patch('estudiantes/inscripcion/' + id + "/", dataJson).then(({ data }) => {
      setLoading(false)
      notification['success']({
        message: 'Felicitaciones',
        description:
          'Estas inscrito a las practicas.',
      });
    }).catch(error => {
      console.log(error.response.data)
    })
  }

  return (
    <Page>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/inscripcion-estudiantes">Inscripción estudiantes</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/inscripcion-estudiantes/listado">
              Listado de incripciones
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Detalle</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Button className='btn-secundary' size='middle' shape="circle" icon={<PrinterFilled />} style={{ marginRight: 16 }} />
          <Popconfirm title='Se eliminará la inscripción' okText='Eliminar' cancelText='Cerrar'>
            <Button danger type='primary' shape="circle" icon={<DeleteFilled />}></Button>
          </Popconfirm>
        </div>
      </div>
      <Tabs type='card' className='tabs' style={{ marginTop: 100, boxShadow: "2px" }}>
        <TabPane tab="Inscripción a prácticas de consultorio jurídico" key="1">
          {doc ? (
            <Form form={form} layout='vertical' className='formulario-curso' scrollToFirstError={true} onFinish={save}>
              <DatosPersonales doc={doc} showShadow={false} form={form} />
              <br></br>
              <Discapacidad doc={doc} showShadow={false} valores={discapacidades} form={form} />
              <br></br>
              <DatosDocumento doc={doc} showShadow={false} form={form} fechaExp={fechaExpDoc} />
              <br></br>
              <DatosUbicacion doc={doc} showShadow={false} form={form} />
              <br></br>
              <DatosInscripcion doc={doc} showShadow={false} form={form} />
              <br></br>
              <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: 50, marginBottom: 50 }}>
                <Button htmlType='submit' size='large' type='primary'>Registrar</Button>
              </div>
            </Form>
          ) : (
            <></>
          )}
        </TabPane>
        <TabPane tab="Documentos anexados" key="2">

          <ArchivosInscripcion doc={doc} />
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default VerInscripcion;
