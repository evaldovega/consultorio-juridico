import React from 'react'
import Page from 'components/Page'
import Policy from 'components/Policy'
import { ROL_PERSONA } from 'constants/apiContants'
import MigaPan from "components/MigaPan";
import MigaPanInicio from "components/MigaPan/Inicio";
import MigaPanAsesoriaJuridica from "components/MigaPan/AsesoriaJuridica";

export default function EncuestaSatisfaccion() {
    return (
        <Policy policy={[ROL_PERSONA]}>
            <Page>
                <MigaPan>
                    <MigaPanInicio />
                    <MigaPanAsesoriaJuridica />
                    <span>Encuesta de satisfacción</span>
                </MigaPan>
            </Page>
        </Policy>
    )
}