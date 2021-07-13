import { Table,Typography,Breadcrumb,Button,Card,Input,Space,Form} from 'antd'
import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Page from 'components/Page'
import inscripciones from 'constants/inscripciones.json'
import { useImmer } from 'use-immer';
import TextNew from 'components/TextNew';

import {
    FolderViewOutlined,SearchOutlined
  } from "@ant-design/icons";
  import Highlighter from 'react-highlight-words';
const ListadoIncripciones=()=>{
    const [docs,setDoc]=useImmer([]);
    const [loading,setLoading]=useState(true)
    const [searchText,setSearchText]=useState('')
    const [searchedColumn,setSearchedColumn]=useState('')

    const getColumnSearchProps = dataIndex => {
      let searchInput;
      const _props={
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Limpiar
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                  setSearchText(selectedKeys[0])
                  setSearchedColumn(dataIndex)
              }}
            >
              Resaltar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    }
    return _props
  };
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(0)
      setSearchedColumn(dataIndex)
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setSearchText('')
    };

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
            setDoc(draft=>inscripciones)
        },1000)
    },[])

    return (
        <Page>
            <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item><Link to='/inscripcion-estudiantes'>Inscripción estudiantes</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Listado de incripciones</Breadcrumb.Item>
          </Breadcrumb>
            <div className='section-title'>
            <Typography.Title level={4}>
              Listado de inscripciones
            </Typography.Title>
          </div>
            <Card className='card-shadown'>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                
              <Form style={{flex:1}}>
                <Form.Item label='Buscar'>
                  <Input/>
                </Form.Item>
              </Form>
              <div style={{flex:1}}></div>
              </div>
            <Table dataSource={docs} loading={loading} size='small' rowKey='_id' scroll={{x:400,y:400}}>
                <Table.Column width={150} fixed={true} title='No. de inscripción' dataIndex='inscripcion'/>
                <Table.Column width={150} {...getColumnSearchProps('nombre')} sorter={(a, b) => a.nombre.length - b.nombre.length} sortDirections={['descend', 'ascend']} title='Nombres y apellidos' render={(d)=><Link to={`/inscripcion-estudiante/${d.id}/detalle`}><TextNew date={d.exp}>{d.nombre}</TextNew></Link>}/>
                <Table.Column width={150} title='Tipo de documento' dataIndex='tipodoc'/>
                <Table.Column width={150} title='Documento de identidad' dataIndex='doc'/>
                <Table.Column width={150} title='Fecha de expedición' dataIndex='exp'/>
                
            </Table>
            </Card>
        </Page>
    )
}

export default ListadoIncripciones