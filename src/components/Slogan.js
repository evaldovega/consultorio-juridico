import { Typography } from "antd"

const Slogan=()=>{
    return (
        <Typography.Text
              style={{ fontSize: 28, lineHeight: "35px" ,textAlign:'center'}}
              italic
            >
              Bienvenido al <strong>Consultorio Jurídico</strong> y <br></br>
              <strong>Centro de Conciliación</strong> de la <br></br>Universidad
              del Atlántico
            </Typography.Text>
    )
}

export default Slogan