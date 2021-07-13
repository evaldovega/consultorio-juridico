import React, { useEffect, useState } from "react";
import { Form, Space,Spin, Input, Card, Button, DatePicker, Select,Alert } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { emitCustomEvent,useCustomEventListener } from 'react-custom-events';
import API from "utils/Axios";
import { useForm } from "antd/lib/form/Form";

const State=({form,rules=[],label='Departamento',name='dep',city})=>{

    const [docs,setDocs] = useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [country,setCountry]=useState(null)

    const selected=(id)=>{
        console.log(id)
        if(form){
          form.setFieldsValue({[name]:id})
        }
        emitCustomEvent(`load-${city}`,id)
    }

    useCustomEventListener(`load-${name}`, data => {
      setCountry(data)
    });

    const load=()=>{
        setLoading(true)
        setError(null)
        API(`configuracion/departamento?r_config_pais=${country}`).then(({data})=>{
            setDocs(data)
        })
        .catch((error)=>{
            setError(error.toString())
        })
        .finally(()=>setLoading(false))
    }
    

    useEffect(()=>{
        if(country){
          load()
        }
    },[country])

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
          <Alert type="warning" message={`${error}, Dep. no cargados.`} />
          <Button
            icon={<SyncOutlined />}
            size="large"
            onClick={load}
            htmlType="button"
          ></Button>
        </div>
        )
    }

    return (
      <Spin spinning={loading}>
        <Form.Item label={label} name={name} rules={rules}>
          <Select
            autocomplete="off"
            onChange={selected} disabled={!country}
            showSearch
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

export default State