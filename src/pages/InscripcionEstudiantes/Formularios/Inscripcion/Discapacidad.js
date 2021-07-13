import React, { useEffect, useState } from "react";
import { Form, Space, Input, Card, Divider, Checkbox, Typography,Spin, Result, Button } from "antd";
import API from 'utils/Axios';
import { Chunk } from "utils";

const Discapacidad = ({showShadow=true}) => {
  const dataTest=[
    {id:1,label:'No aplica'},
    {id:1,label:'No aplica'},
    {id:1,label:'No aplica'},
    {id:1,label:'No aplica'}
  ]
  const rules = [{ required: true, message: "Please input your username!" }];
  const [docs,setDocs]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  const load=()=>{
    console.log(docs)
    setLoading(true)
    setError(null)
    API('configuracion/discapacidad/').then(({data})=>{
      setDocs(Chunk(data))
    }).catch(error=>{
      setError(error.response ? error.response.statusText : error.toString())
    }).finally(()=>{
      setTimeout(()=>{
        setLoading(false)
      },1000)
    })
  }

  useEffect(()=>{
    load()
  },[])

  if(error){
    return (
      <Card className={showShadow ? 'card-shadown' : ''}>
        <Result status='warning'
      title={error}
      
      extra={
        <Button htmlType='button' type="secundary" key="console" onClick={load}>
          Recargar listado de discapacidades
        </Button>
      }
    />
    </Card>)
  }
  return (
    <Spin spinning={loading}>
      <Typography.Title level={5} className="title-blue">
        Discapacidad
      </Typography.Title>
      <Card className={showShadow ? 'card-shadown' : ''}>

      <div className='discapacidades'>
        {docs.map((discapacidades,index)=>(
          <Space key={index} style={{ display: "flex" }} size="large">
            {discapacidades.map(d=><Checkbox key={d.id} value={d.id}>{d.a_titulo}</Checkbox>)}
          </Space>
        ))}
        </div>
      </Card>
    </Spin>
  );
};

export default Discapacidad;
