import React,{useState} from 'react'

import { PageHeader,Skeleton,Spin, Space,notification,Layout, Divider,Form,Typography,Breadcrumb, Card,Button } from 'antd';
import Footer from 'components/Footer'
import { useParams } from 'react-router';
import { ACCESS_TOKEN_NAME, MODULES } from 'constants/apiContants';
import { Link } from 'react-router-dom';
import HeaderPage from 'components/Header';
import { useForm } from 'antd/lib/form/Form';
import DatosPersonales from './DatosPersonales'
import Discapacidad from './Discapacidad';
import DatosDocumento from './DatosDocumento';
import DatosUbicacion from './DatosUbicacion';
import DatosLaborales from './DatosLaborales';
import DatosInscripcion from './DatosInscripcion';

const Countries = require('constants/Countries.json')
const States = require('constants/States.json')
const Cities = require('constants/Cities.json')

const {Content,Header}=Layout

const InscripcionPracticasConsultorioJuridico=()=>{
    const [loading,setLoading]=useState(false)
    const [form]=useForm()

    const save=()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            notification['success']({
                message: 'Felicitaciones',
                description:
                  'Estas incrito a las practicas.',
              });
        },3000)
    }
    return (<>
    
        <HeaderPage/>
   
       <div className='content-body'>
           <Spin spinning={loading}>
           <Breadcrumb>
               <Breadcrumb.Item><Link to='/'>Inicio</Link></Breadcrumb.Item>
               <Breadcrumb.Item><Link to='/inscripcion-estudiantes'>Inscripción estudiantes</Link></Breadcrumb.Item>
               <Breadcrumb.Item>Inscripción a practicas consultorio jurídico</Breadcrumb.Item>
           </Breadcrumb>
           <div className='section-title'>
               <Typography.Title level={4}>Inscripción a practicas de Consultorio Jurídico</Typography.Title>
           </div>
           <Form form={form} layout='vertical' className='formulario-curso' scrollToFirstError={true} onFinish={save}>
        <DatosPersonales Countries={Countries} States={States} Cities={Cities} form={form}/>
        <br></br>
        <Discapacidad form={form}/>
        <br></br>
        <DatosDocumento form={form} Countries={Countries} States={States} Cities={Cities}/>
        <br></br>
        <DatosUbicacion form={form} Countries={Countries} States={States} Cities={Cities}/>
        <br></br>
        <DatosLaborales form={form} Countries={Countries} States={States} Cities={Cities}/>
        <br></br>
        <DatosInscripcion form={form}/>
        <br></br>
            <div style={{display:'flex',flex:1,justifyContent:'flex-end',width:'100%',marginTop:50,marginBottom:50}}>
                <Button htmlType='submit' size='large' type='primary'>Registrar</Button>
            </div>
        </Form>
        </Spin>
       </div>
       
       
       <Footer/>
       </>)
}

export default InscripcionPracticasConsultorioJuridico