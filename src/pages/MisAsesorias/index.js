import Page from "components/Page"
import { Table,Typography,Breadcrumb,Button,Card,Input,Space,Form} from 'antd'
import { Link } from "react-router-dom";
import Policy from "components/Policy"
import { useState } from "react";
const { ROL_PERSONA } = require("constants/apiContants")

const MisAsesorias=()=>{
    const [docs,setDocs]=useState([{numero:'0001-2021',fecha:'2021-08-10',hora:'8:00 am',asunto:'Vecino insoportable, nunca le baja la música'}])
    return (
      <Policy policy={[ROL_PERSONA]}>
        <Page>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Mis asesorias</Breadcrumb.Item>
          </Breadcrumb>
          <div className="section-title">
            <Typography.Title level={4}>Asesorias solicitadas</Typography.Title>
            <Button type='primary'>Solicitar asesoria</Button>
          </div>
          <Table dataSource={docs}>
            <Table.Column title="N. Solicitud" dataIndex='numero' />
            <Table.Column title="Asunto" dataIndex='asunto'/>
            <Table.Column title="Fecha" dataIndex='fecha'/>
            <Table.Column title="Hora" dataIndex='hora'/>
          </Table>
          {/*<div className="grid-3">
            <div className='folder blue'>
              <div class="back-folder-part"></div>
              <div className='sheets'>
              <div className='sheet'></div>
              <div className='sheet'></div>
              <div className='sheet'></div>
              </div>
              <div class="main-folder-part">
                  <Typography.Title level={5} style={{textAlign:'center',color:'#ffff'}}>2021-001</Typography.Title>
                  <Typography.Paragraph style={{textAlign:'center',color:'#ffff'}}>Lic. Ernesto m.</Typography.Paragraph>
              </div>
            </div>
            <div className='folder blue'>
              <div class="back-folder-part"></div>
              <div class="main-folder-part">
                  <Typography.Title level={5} style={{textAlign:'center',color:'#ffff'}}>2020-001</Typography.Title>
              </div>
            </div>
            <div className='folder blue'>
              <div class="back-folder-part"></div>
              <div class="main-folder-part">
                  <Typography.Title level={5} style={{textAlign:'center',color:'#ffff'}}>2020-001</Typography.Title>
              </div>
            </div>
            <div className='folder gray'>
              <div class="back-folder-part"></div>
              <div class="main-folder-part">
                  <Typography.Title level={5} style={{textAlign:'center',color:'#ffff'}}>2019-001</Typography.Title>
              </div>
            </div>
          </div>*/}
        </Page>
      </Policy>
    );
}
export default MisAsesorias