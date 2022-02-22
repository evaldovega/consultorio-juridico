import { useContext, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Breadcrumb, Card, Row, Col, Image, Form } from "react-bootstrap";
import Context from "./Ctx";
import Errors from "components/Errors";
import API, {baseUrl} from "utils/Axios";
import { ROL_ESTUDIANTE } from "constants/apiContants";
import moment from "moment";
import ArchivosAnexos from './ArchivosAnexos';

const PerfilAnexos = () => {
    const { readOnly, control, errors, watch, setValue, policies, persona } =
        useContext(Context);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orientaciones, setOrientaciones] = useState([]);
    const [etnias, setEtnias] = useState([]);
    const [estadosCiviles, setEstadosCiviles] = useState([]);

    const certificacionARL = watch('f_archivoARL')
    const certificacionEPS = watch('f_archivoEPS')

    const selectedARL = (el) => {
        if (!el.files.length) {
            setValue("f_archivoARL", "");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(el.files[0]);
        reader.onload = function () {
            setValue("f_archivoARL", reader.result);
            //el.value = "";
        };
    };

    const selectedEPS = (el) => {
        if (!el.files.length) {
            setValue("f_archivoEPS", "");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(el.files[0]);
        reader.onload = function () {
            setValue("f_archivoEPS", reader.result);
            //el.value = "";
        };
    };

    const load = () => {
        setLoading(true);
        setError(null);
        Promise.all([
            API("configuracion/orientacion/"),
            API("configuracion/etnia/"),
            API("configuracion/estado-civil/"),
        ])
            .then(
                ([
                    { data: r_orientaciones },
                    { data: r_etnias },
                    { data: r_estadoCivil },
                ]) => {
                    setOrientaciones(r_orientaciones);
                    setEtnias(r_etnias);
                    setEstadosCiviles(r_estadoCivil);
                    setLoading(false);
                }
            )
            .catch((error) => {
                setLoading(false);
                setError(error.response ? error.response.statusText : error.toString());
            });
    };

    useEffect(() => {
        load();
    }, [readOnly]);

    useEffect(() => {
        console.log(certificacionARL)
    })

    if (readOnly) {
        const orientacion = orientaciones.find(
            (o) => o.id == persona?.r_config_orientacion
        );
        const etnia = etnias.find((o) => o.id == persona?.r_config_etnia);
        const estadoCivil = estadosCiviles.find(
            (o) => o.id == persona?.r_config_estadoCivil
        );

        return (
            <div className="mb-4">
                <h2 className="mb-4">Datos Demográficos</h2>
                <table width={"100%"}>
                    <tr>
                        <th>Fecha de nacimiento</th>
                        <th>Lugar de nacimiento</th>
                        <th>Genero</th>
                        <th>Orientación sexual</th>
                    </tr>
                    <tr>
                        <td>{moment(persona?.a_fechaNacimiento).format("YYYY-MM-DD")}</td>
                        <td>{persona?.a_lugarNacimiento || "No especificado"}</td>
                        <td>{persona?.c_genero || "No especificado"}</td>
                        <td>{orientacion?.a_titulo || "No especificada"}</td>
                    </tr>
                    <tr>
                        <th>Etnia</th>
                        <th>Número de hijos</th>
                        <th>Estado civil</th>
                    </tr>
                    <tr>
                        <td>{etnia?.a_titulo || "No especificada"}</td>
                        <td>{persona?.a_numeroHijos || "No especificado"}</td>
                        <td>{estadoCivil?.a_titulo || "No especificado"}</td>
                    </tr>
                </table>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <h2 className="mb-4">Anexos

            </h2>
            <Row className="mb-1">
                <Form.Group as={Col} xs="12" md="6">
                    <Form.Label>
                        Adjuntar certificación ARL
                    </Form.Label>
                    <br />
                    {certificacionARL && certificacionARL.substring(0, 1) === "/" &&
                        <a href={`${baseUrl}${certificacionARL}`}>Descargar certificación</a>
                    }
                    {certificacionARL && certificacionARL.substring(0, 1) === "h" &&
                        <a href={`${certificacionARL}`}>Descargar certificación</a>
                    }
                    {!readOnly ? (
                        <Form.Control
                            type="file"
                            onChange={(e) => selectedARL(e.target)}
                            readOnly={readOnly}
                        />
                    ) : null}
                    <Controller
                        name="f_archivoARL"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="hidden"
                                readOnly={readOnly}
                                plaintext={readOnly}
                            />
                        )}
                    />
                    <Errors message={errors.f_archivoDocumento?.message} />
                </Form.Group>
                <Form.Group as={Col} xs="12" md="6">
                    <Form.Label>
                        Adjuntar certificación EPS
                    </Form.Label>
                    <br />
                    {certificacionEPS && certificacionEPS.substring(0, 1) === "/" &&
                        <a href={`${baseUrl}${certificacionEPS}`}>Descargar certificación</a>
                    }
                    {certificacionEPS && certificacionEPS.substring(0, 1) === "h" &&
                        <a href={`${certificacionEPS}`}>Descargar certificación</a>
                    }
                    {!readOnly ? (
                        <Form.Control
                            type="file"
                            onChange={(e) => selectedEPS(e.target)}
                            readOnly={readOnly}
                        />
                    ) : null}
                    <Controller
                        name="f_archivoEPS"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="hidden"
                                readOnly={readOnly}
                                plaintext={readOnly}
                            />
                        )}
                    />
                    <Errors message={errors.f_archivoDocumento?.message} />
                </Form.Group>
            </Row>
            <ArchivosAnexos />
        </div>
    );
};

export default PerfilAnexos;
