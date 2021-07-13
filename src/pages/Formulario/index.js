import React, { useEffect, useState } from 'react'
import { PageHeader,Skeleton, Space,Tabs,Layout, Divider,Form,Typography,Breadcrumb } from 'antd';
import Footer from '../../components/Footer'
import { useParams } from 'react-router';
import { ACCESS_TOKEN_NAME, MODULES } from '../../constants/apiContants';
import DatosPersonales from './DatosPersonales';
import DatosDocumento from './DatosDocumento';
import { Link } from 'react-router-dom';
import HeaderPage from '../../components/Header';
import { useForm } from 'antd/lib/form/Form';

const {Content,Header}=Layout
const Curso=()=>{
    const {id}=useParams()
    const [loading,setLoading]=useState(true)
    const [curso,setCurso]=useState({})
    const [form]=useForm()
    useEffect(()=>{
        const _curso=MODULES.find(m=>m.id==id)
        if(_curso){
            setCurso(_curso)
        }
    },[])

    useEffect(()=>{
        if(curso.name){
            setLoading(false)
        }
    },[curso])

    return (<Layout className='formulario-curso'>
    
     <HeaderPage/>

    <Content style={{width:'60%',margin:'0 auto',marginTop:32}}>
        <Breadcrumb>
            <Breadcrumb.Item><Link to='/'>Inicio</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={`/${curso.parent}`}>{curso.parent}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{curso.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{textAlign:'center',marginBottom:32}}>
            <Typography.Title level={4}>Incripción a Prácticas</Typography.Title>
        </div>
        <Form layout='vertical' form={form} autocomplete='off'>
        
        <DatosPersonales form={form}/>

    <br/>
        <DatosDocumento form={form}/>
        </Form>
    </Content>
    
    
    <Footer/>
    </Layout>)
}

export default Curso