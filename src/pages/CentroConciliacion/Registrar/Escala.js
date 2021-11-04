import { Card,Checkbox,Form, Input, Typography } from "antd"

const EscalaConflicto=({form})=>{
        return (
                <Card className="card-shadown">
                        <Typography.Title>Escala del conflicto</Typography.Title>
                        <div className="grid-3">
                                <Form.Item name="escalaConflictoSinViolencia" label="Sin violencia">
                                        <Input/>
                                </Form.Item>
                                <Form.Item name="escalaConflictoConViolencia" label="Con violencia">
                                        <Input/>
                                </Form.Item>
                                <Form.Item name="escalaConflictoConArma" label="Con Arma">
                                        <Input/>
                                </Form.Item>
                        </div>
                        <div className="grid-2">
                                <Form.Item name="escalaConflictoSinTerceros" label="Sin intervención de terceros">
                                        <Input/>
                                </Form.Item>
                                <Form.Item name="escalaConflictoConTerceros" label="Con intervención de terceros">
                                        <Input/>
                                </Form.Item>
                        </div>
                        <div className="grid-2">
                                <Form.Item name="escalaConflictoUltimaIntervencion" label="La última vez que alguien intervino fué directamente">
                                        <Input/>
                                </Form.Item>   
                                <div className="grid-2">
                                        <Form.Item name="escalaConflictoUltimaIntervencionInstitucional" label="Institucionales">
                                                <Checkbox/>
                                        </Form.Item>
                                        <Form.Item name="escalaConflictoUltimaIntervencionInstitucionalesCuales" label="Cuales">
                                        <Input/>
                                </Form.Item>  
                                </div>
                        </div>
                </Card>
        )
}

export default EscalaConflicto