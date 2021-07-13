import React, { useEffect, useState } from "react";
import { Form, Space,Spin, Input, Card, Button, DatePicker, Select,Alert } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useCustomEventListener } from 'react-custom-events';
import API from "utils/Axios";

const City=({form,rules=[],label='Ciudad',name='ciu'})=>{

    const [state,setState]=useState(null)
    const [docs,setDocs] = useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const selected=(id)=>{
        console.log(id)
        if(form){
          form.setFieldsValue({[name]:id})
        }
    }


    const load=()=>{
        setLoading(true)
        setError(null)
        API(`configuracion/ciudad?r_config_departamento=${state}`).then(({data})=>{
            setDocs(data)
        })
        .catch((error)=>{
            setError(error.toString())
        })
        .finally(()=>setLoading(false))
    }

    
    useCustomEventListener(`load-${name}`, data => {
      setState(data)
    });

    useEffect(()=>{
      if(state){
        load()
      }
    },[state])

    if(error){
        return (
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Form.Item name={name} rules={rules}>
              <Input type="hidden" />
            </Form.Item>
            <Alert type="warning" message={`${error}, ciudades no cargadas.`} />
            <Button
              icon={<SyncOutlined />}
              size="large"
              onClick={load}
              htmlType="button"
            ></Button>
          </div>
        );
    }

    return (
      <Spin spinning={loading}>
        <Form.Item label={label} name={name} rules={rules}>
          <Select
            autocomplete="off"
            onChange={selected}
            showSearch disabled={!state}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {docs.map((c) => (
              <Select.Option key={c.id} value={c.id}>
                {c.a_titulo}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Spin>
    );
}

export default City