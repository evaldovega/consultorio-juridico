import React, { useState } from "react";
import { Form, Space, Input, Card, Button, DatePicker, Select, Typography,Upload } from "antd";
import { UploadOutlined,DeleteOutlined } from "@ant-design/icons";

const UploadCustom=({children,form=null,name=null,multiple=false,accept='*',label='',size={},setBase64})=>{
    const [image,setImage]=useState('')

    const props={
        listype:'text',
        beforeUpload:(file)=>{
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result)
                if(name && form){
                    console.log('hola')
                    form.setFieldsValue({[name]:e.target.result})
                }
            };
            reader.readAsDataURL(file);
          return false
        }
      }
      const renderInput=()=>{
          if(name){
              return (<Form.Item name={name} 
              rules={[{required:true,message:'Selecciona una archivo'}]}
              >
              <Input type='hidden' />
            </Form.Item>)
          }
      }

      const clean=()=>{
        form.setFieldsValue({name:""})
          setImage("")
      }
      if(image.length){
          return (
            <>
              {renderInput()}
              <Card
                actions={[<DeleteOutlined onClick={clean} />]}
                title={label}
              >
                <img {...size} style={{ ...size }} src={image} />
              </Card>
            </>
          );
      }
      return (
        <>
        {renderInput()}
            <Upload style={{width:'100%'}} multiple={multiple} accept={accept} fileList={[]} {...props}>
                {children}
            </Upload>
            
        </>
      )
}

export default UploadCustom