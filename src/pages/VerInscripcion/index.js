import { Table, Typography, Breadcrumb, Button, Form, Tabs,Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Page from "components/Page";
import { useImmer } from "use-immer";
import { FolderViewOutlined,PrinterFilled,DeleteFilled } from "@ant-design/icons";
import { useForm } from 'antd/lib/form/Form';
import DatosPersonales from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosPersonales'
import Discapacidad from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/Discapacidad';
import DatosDocumento from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosDocumento';
import DatosUbicacion from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosUbicacion';
import DatosLaborales from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosLaborales';
import DatosInscripcion from 'pages/InscripcionEstudiantes/Formularios/Inscripcion/DatosInscripcion';
import ArchivosInscripcion from "./Archivos";
import API from 'utils/Axios';
// import inscripciones from 'constants/inscripciones.json'

const { TabPane } = Tabs;

const Countries = require('constants/Countries.json')
const States = require('constants/States.json')
const Cities = require('constants/Cities.json')

const VerInscripcion = () => {
    const {id} =useParams();
    const [inscripciones, setInscripciones] = useState([])
    const [loading,setLoading]=useState(false)
    const [doc,setDoc]=useState(null)
    const [form]=useForm()

    const getInscripciones = async () => {
      API.get('estudiantes/inscripcion/').then(response=>{
        console.log(JSON.stringify(response.data))
        setDoc({
          ...response.data.find((i) => i.id == id),
          ced: "https://assets.homeis.com/image/fetch/q_auto:low,f_auto/https%3A%2F%2Fassets-gcp.homeis.com%2Fimage%2Fupload%2Fc_fill%2Ce_sharpen%2Cf_jpg%2Cq_auto%2Cw_600%2Fv1%2Fhomeis-prod%2Fprod%2Fuploads%2Fpost%2F2020-08-07%2F18%2F5d813a67a6874b0011c5c62c-459a73af-f697-43ba-af34-8814eb0e7d96.png",
        });
      })
    }

    useEffect(()=>{
      getInscripciones();
    },[])

    useEffect(()=>{
      if(doc){
        form.setFieldsValue({
          a_primerNombre:doc.r_usuarios_persona.a_primerNombre,
          a_segundoNombre:doc.r_usuarios_persona.a_segundoNombre,
          a_primerApellido:doc.r_usuarios_persona.a_primerApellido,
          a_segundoApellido:doc.r_usuarios_persona.a_segundoApellido,
          r_config_paisNacimiento:doc.r_usuarios_persona.r_config_paisNacimiento,
          r_config_departamento:doc.r_usuarios_persona.r_config_departamento,
          r_config_ciudadNacimiento:doc.r_usuarios_persona.r_config_ciudadNacimiento,
          c_genero:doc.r_usuarios_persona.c_genero,
          r_config_orientacion:doc.r_usuarios_persona.r_config_orientacion,
          r_config_etnia:doc.r_usuarios_persona.r_config_etnia,
          r_config_eps:doc.r_usuarios_persona.r_config_eps,
          f_archivoFotoPerfil:doc.r_usuarios_persona.f_archivoFotoPerfil,
          mm_discapacidad:doc.r_usuarios_persona.mm_discapacidad,
        })
      }
    },[doc])
    
    const save=()=>{}
  return (
    <Page>
      <div style={{display:'flex',justifyContent:'space-between'}}>
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
          <Button className='btn-secundary' size='middle' shape="circle"  icon={<PrinterFilled/>} style={{marginRight:16}}/>
          
          <Popconfirm title='Se eliminará la inscripción' okText='Eliminar' cancelText='Cerrar'>
          <Button danger type='primary' shape="circle" icon={<DeleteFilled/>}></Button>
          </Popconfirm>
      </div>
      </div>
      <Tabs type='card' className='tabs' style={{marginTop:100}}>
        <TabPane tab="Inscripción a prácticas de consultorio jurídico" key="1">
        <Form form={form} layout='vertical' className='formulario-curso' scrollToFirstError={true} onFinish={save}>
        <DatosPersonales doc={doc} showShadow={false} Countries={Countries} States={States} Cities={Cities} form={form}/>
        <br></br>
        <Discapacidad doc={doc} showShadow={false} form={form}/>
        <br></br>
        <DatosDocumento doc={doc} showShadow={false} form={form} Countries={Countries} States={States} Cities={Cities}/>
        <br></br>
        <DatosUbicacion doc={doc} showShadow={false} form={form} Countries={Countries} States={States} Cities={Cities}/>
        
        <br></br>
        <DatosInscripcion doc={doc} showShadow={false} form={form}/>
        <br></br>
            <div style={{display:'flex',flex:1,justifyContent:'flex-end',width:'100%',marginTop:50,marginBottom:50}}>
                <Button htmlType='submit' size='large' type='primary'>Registrar</Button>
            </div>
        </Form>
        </TabPane>
        <TabPane tab="Documentos anexados" key="2">
          
          <ArchivosInscripcion doc={doc}/>
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default VerInscripcion;
