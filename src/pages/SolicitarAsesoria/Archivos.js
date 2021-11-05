import React from 'react'
import { Upload, message, Button, List, Avatar } from 'antd';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
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

const ArchivosAsesoria = () => {
  const [archivos, setArchivos] = useState([
    {
      icon: "https://image.flaticon.com/icons/png/512/136/136522.png",
      title: "Nombre del documento adjuntado",
    },
    {
      icon: "https://image.flaticon.com/icons/png/512/136/136522.png",
      title: "Nombre del documento adjuntado",
    },
    {
      icon: "https://image.flaticon.com/icons/png/512/136/136522.png",
      title: "Nombre del documento adjuntado",
    }
  ]);

  return (
    <div>
      <List itemLayout="horizontal"
        dataSource={archivos}
        renderItem={item => (
          <List.Item extra={
            <Button 
              style={{
                border: 0
              }}
            >
              <CloseOutlined style={{
                height: 30,
                color: "#b0b0b0"
              }} />
            </Button>
          }>
            <List.Item.Meta
              avatar={<img width={20} src={item.icon} />}
              title={<a href="https://ant.design">{item.title}</a>}

            />
          </List.Item>
        )}>

      </List>
    </div>
  )
}

export default ArchivosAsesoria