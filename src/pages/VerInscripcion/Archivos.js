import React from 'react'
import { Upload, message, List,Avatar } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const ArchivosInscripcion=()=>{
  const [archivos, setArchivos] = useState([
    {
      icon: "https://image.flaticon.com/icons/png/512/136/136522.png",
      title: "Informe de riesgos",
    },
    {
      icon: "https://image.flaticon.com/icons/png/512/732/732220.png",
      title:'Consolidado de notas 5 semenstre'
    },
    {
      icon: 'https://image.flaticon.com/icons/png/512/136/136524.png',
      title: 'Foto de la casa'
    }
  ]);

    return (
        <div>
        <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargarlo</p>
    <p className="ant-upload-hint">
    </p>
  </Dragger>
  <List itemLayout="horizontal"
    dataSource={archivos}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<img width={42} src={item.icon} />}
          title={<a href="https://ant.design">{item.title}</a>}
          
        />
      </List.Item>
    )}>

  </List>
        </div>
    )
}

export default ArchivosInscripcion