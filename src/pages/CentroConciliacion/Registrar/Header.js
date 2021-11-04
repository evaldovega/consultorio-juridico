import { Card, Descriptions, Typography } from "antd"
import { useContext } from "react"
import Context from "./Ctx"
import moment from "moment"

const Header=()=>{
        const {numeroCaso,setNumeroCaso,fechaSolicitud,setFechaSolicitud} = useContext(Context)
        return (
                <Card className="shadown" style={{width:300}}>
                        <Descriptions>
                                <Descriptions.Item span={6} label="Número de caso">{numeroCaso}</Descriptions.Item>
                                <Descriptions.Item span={6} label="Fecha de solicitud">{moment(fechaSolicitud).format("YYYY/MM/DD")}</Descriptions.Item>
                        </Descriptions>
                </Card>
        )
}

export default Header