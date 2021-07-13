import { Table, Breadcrumb, Button,Popconfirm,Space } from 'antd'
import React, { useEffect, useState } from 'react'
import {  Link, Route, useLocation } from "react-router-dom";
import {DeleteFilled,EditFilled} from '@ant-design/icons'
import ConfiguracionesMaster from '../../Master'
import { useHash } from 'utils/useHash';
import { useImmer } from "use-immer";
import OrientacionSexualFormulario from '../Formulario';

const OrientacionSexual=()=>{
    const location=useLocation()
    const {hash}=useHash()
    const [id,setId]=useState(null)
    const [docs,setDocs]=useImmer([{
        id:1,
        cod:1,
        nombre:'Heterosexual'
    },
    {
        id:2,
        cod:1,
        nombre:'Homosexual'
    },
    {
        id:3,
        cod:1,
        nombre:'Bisexual'
    }])

    const onSaved=(data)=>{
        setDocs(draft=>{
            const exist=draft.findIndex(d=>d.id==data.id)
            if(exist>-1){
                draft[exist]=data
            }else{
                draft.push(data)
            }
            return draft
        })
    }

    useEffect(()=>{
        console.log(hash)
        if(hash=='#new'){
            setId('')
        }else if(hash.length && hash!='#'){
            setId(hash.replace('#',''))
        }else{
            setId(null)
        }
    },[hash])

    const actions=(record)=>{
        return (
            <Space>
                <Button type='primary' shape="round" size='middle' onClick={()=>window.location.hash=record.id} icon={<EditFilled/>}></Button>
                <Popconfirm  title='Se borrara el registro'>
                    <Button shape="round" size='middle' type='danger' icon={<DeleteFilled/>}></Button>
                </Popconfirm>
            </Space>
        )
    }

    return (
        <ConfiguracionesMaster>
            <OrientacionSexualFormulario id={id} onSaved={onSaved}/>
            <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/configuraciones">Configuraciones</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Orientaciones sexuales</Breadcrumb.Item>
          </Breadcrumb>

         
          
          <div style={{marginTop:32,marginBottom:32,display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
              <Button type='primary' onClick={()=>window.location.hash='new'}>Registrar nueva orientación sexual</Button>
          </div>
            <Table dataSource={docs} rowKey='id' pagination={false}>
                <Table.Column title='Código' dataIndex='cod'/>
                <Table.Column title='Nombre' dataIndex='nombre'/>
                <Table.Column title='Acciones' render={(r)=>actions(r)}/>
            </Table>
        </ConfiguracionesMaster>
    )
}
export default OrientacionSexual