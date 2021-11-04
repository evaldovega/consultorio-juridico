import { UploadOutlined,DeleteOutlined } from '@ant-design/icons';

const { Card, Typography, Form, Input, Radio, Upload, Button } = require("antd")


const Adjunto=({form, index, field, remove})=>{

        const fileProps={
                beforeUpload:(file)=>{
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            if(form){
                                const anexos=form.getFieldValue("versionSolicitanteAnexos") || [];
                                anexos[index]={nombre:file.name,data:e.target.result}
                                form.setFieldsValue({versionSolicitanteAnexos:anexos})
                                console.log(anexos)
                            }
                        };
                        reader.readAsDataURL(file);
                        return false
                }
        }

        return (
                <div className="grid-3">
        
        <Form.Item {...field} name={[field.name, 'data']} label="Archivo" fieldKey={[field.fieldKey, 'data']}>
                <Upload multiple={true} {...fileProps}  fileList={[]}>
                        <Button htmlType="button" icon={<UploadOutlined/>}>Seleccionar</Button>
                </Upload>
        </Form.Item>
        <Form.Item {...field} name={[field.name, 'nombre']} label="Nombre" fieldKey={[field.fieldKey, 'nombre']}>
                <Input />
        </Form.Item>
        <Form.Item label="&nbsp;">
                <Button danger shape="circle" onClick={()=>remove(index)} icon={<DeleteOutlined/>}/>
        </Form.Item>
        </div>)
}

export default Adjunto