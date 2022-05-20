import React from 'react'
import Policy from "components/Policy";
import { Space, Typography } from "antd";

import {
    ROL_ADMIN,
} from "constants/apiContants";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import Page from "components/Page";
import {
    Breadcrumb,
    Row,
    Col,
    Container,
    Card,
    CardDeck,
} from "react-bootstrap";
import ItemModule from "components/ItemModule";
import AccessDenied from "components/Policy/AccessDenied";
import SectionHeader from "components/SectionHeader";
import { ReactComponent as Lapiz } from "images/pencil.svg"

const FuncionesAdmin = () => {
    return (
        <Policy
            policy={[ROL_ADMIN]}
            feedback={<AccessDenied />}
        >
            <SectionHeader
                text="Funciones de administrador"
                img="url(/images/banner_inscripcionestudiantes.jpg)"
            />
            <div style={{
                backgroundImage: "url(/images/sectionbackground.jpg)",
                backgroundSize: "cover",
                height: "65vh"
            }}>

                <Page>
                    <div style={{
                        width: "80%",
                        margin: "auto"
                    }}>

                        <Row className="modules">
                            <Col xs="12" md="4" className="mb-4">
                                <ItemModule
                                    Icon={() => <Lapiz style={{ width: "50px", height: "50px" }} />}
                                    link="/funciones-admin/roles"
                                    title="Roles"
                                />
                            </Col>
                        </Row>
                    </div>
                </Page>
            </div>
        </Policy>
    )
}

export default FuncionesAdmin