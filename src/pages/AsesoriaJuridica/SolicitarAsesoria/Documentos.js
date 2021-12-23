import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
const { Upload,Button } = require("antd")

const SolicitarAsesoriaDocs=()=>{
    const [fileList,setFileList]=useImmer([]);

    useEffect(()=>{
        console.log(fileList);
    },[fileList])
    return (
        <div>
            <Upload 
                onRemove={(file)=>{
                    const index = fileList.indexOf(file);
                    setFileList(draft=>{
                        draft.splice(index,1);
                        return draft
                    })
                }}
                beforeUpload={(file)=>{
                    setFileList(draft=>{
                        draft.push(file);
                        return draft
                    })
                /*const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload=()=>{
                    setFileList(draft=>{
                        draft.push(reader.result)
                        return draft
                    });
                }*/
                return false
            }} multiple={true} fileList={fileList} listType="picture"
      >
                <Button className="btn-upload" icon={<UploadOutlined />}>Anexar archivos</Button>
            </Upload>
        </div>
    )
}
export default SolicitarAsesoriaDocs;