import {Form,Input,Button,Breadcrumb,Typography, Card,Spin, notification, Select} from 'antd'
import City from 'components/City';
import State from 'components/State';
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import SolicitarAsesoriaDocs from './Documentos';
const { default: Page } = require("components/Page")
const { default: Policy } = require("components/Policy")
const { ROL_PERSONA } = require("constants/apiContants")


const SolicitarAsesoria=()=>{
    const [form]=Form.useForm();
    const [loading,setLoading]=useState(false)

    const save=()=>{
        setLoading(true);
        setTimeout(()=>{
            notification.success({duration:5,message:'Asesoria registrada correctamente',description:'Su radicado es 2021-002, le notificaremos cuando se le asigne un abogado.'})
            setLoading(false)
            form.setFieldsValue({asunto:""})
        },2000)
    }
    
    return (
      <Policy policy={[ROL_PERSONA]}>
        <Page>
        <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Solicitar asesoria</Breadcrumb.Item>
          </Breadcrumb>

          <Card className='card-shadown' style={{marginTop:64}}>
              <Spin spinning={loading}>
          <Form form={form} layout="vertical" onFinish={save}>
           
              <State />
            
              <City/>
            
            <Form.Item label="Asunto" name="asunto" rules={[{required:true,message:'Describa los hechos'}]} tooltip="Describa detalladamente los hechos">
              <Input.TextArea rows={5} cols={5} />
            </Form.Item>
            

              <SolicitarAsesoriaDocs/>
        <br></br>
              <Form.Item>
                <Button type='primary' htmlType='submit'>Solicitar</Button>
              </Form.Item>
          </Form>
          </Spin>
          </Card>
          
        </Page>
      </Policy>
    );
}

export default SolicitarAsesoria