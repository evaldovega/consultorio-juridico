import {Modal,Form, Input, Button, Spin} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useEffect, useState } from 'react'

const OrientacionSexualFormulario=({id,onSaved})=>{
    const [visible,setVisible]=useState(false)
    const [loading,setLoading]=useState(false)
    const [form]=useForm()

    const onCancel=()=>{
        if(!loading){
            window.location.hash=''
            window.history.replaceState(null, null, ' ')
        }
    }
    const save=(data)=>{
        setLoading(true)
        setTimeout(()=>{
            if(id==''){
                onSaved({...data,id:new Date().getTime()})
            }else{
                onSaved({...data,id})
            }
            setLoading(false)
            setTimeout(()=>{
                onCancel()
            },500)
        },3000)
    }
    useEffect(()=>{
        if(id!=null){
            setVisible(true)
                
            
        }else{
            setVisible(false)
        }
        
    },[id])

    useEffect(()=>{
        if(form){
            form.resetFields()
        }
    },[form])

    const buttons=[<Button disabled={loading} type='primary' onClick={()=>form.submit()}>Guardar</Button>]

    return (
        <Modal visible={visible} maskClosable={false} onCancel={()=>onCancel()} footer={buttons} title={id!='' ? 'Editar orientación':'Crear orientación'} >
            <Spin spinning={loading}>
            <Form form={form} onFinish={save} defaultValue={{cod:'',nombre:''}}>
                <Form.Item name='cod' label='Código' rules={[{ required: true, message: "Por favor rellene este campo!" }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name='nombre' label='Nombre' rules={[{ required: true, message: "Por favor rellene este campo!" }]}>
                    <Input/>
                </Form.Item>
            </Form>
            </Spin>
        </Modal>
    )
}
export default  OrientacionSexualFormulario