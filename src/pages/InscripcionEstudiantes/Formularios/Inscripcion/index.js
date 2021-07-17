import React, { useState } from 'react'

import { PageHeader, Skeleton, Spin, Space, notification, Layout, Divider, Form, Typography, Breadcrumb, Card, Button } from 'antd';
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
import API from 'utils/Axios';
import Moment from 'moment';

const Countries = require('constants/Countries.json')
const States = require('constants/States.json')
const Cities = require('constants/Cities.json')

const { Content, Header } = Layout

const InscripcionPracticasConsultorioJuridico = () => {
    const [loading, setLoading] = useState(false)
    const [form] = useForm()

    const error = (e) => {
        console.log(e)
    }
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
        console.log(JSON.stringify(dataJson.r_usuarios_persona.f_archivoFotoPerfil))
        setLoading(true)
        API.post('estudiantes/inscripcion/',dataJson).then(({data})=>{
            setLoading(false)
            notification['success']({
                message: 'Felicitaciones',
                description:
                    'Estas incrito a las practicas.',
            });
        })
        // setTimeout(() => {
        // }, 3000)
    }

    return (<>

        <HeaderPage />

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
                <Form form={form} layout='vertical' scrollToFirstError={true} className='formulario-curso' onError={error} onFinish={save}>
                    <DatosPersonales form={form} />
                    <br></br>
                    <Discapacidad form={form} />
                    <br></br>
                    <DatosDocumento form={form} />
                    <br></br>
                    <DatosUbicacion form={form} />
                    <br></br>
                    <DatosLaborales form={form} />
                    <br></br>
                    <DatosInscripcion form={form} />
                    <br></br>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: 50, marginBottom: 50 }}>
                        <Button htmlType='submit' size='large' type='primary'>Registrar</Button>
                    </div>
                </Form>
            </Spin>
        </div>


        <Footer />
    </>)
}

export default InscripcionPracticasConsultorioJuridico