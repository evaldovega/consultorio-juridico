import Errors from "components/Errors";
import LugarPractica from "components/LugarPracticas";
import React, { useEffect, useState, useContext } from "react";
import { Alert, Card, Row, Col, Form, Table, Pagination } from "react-bootstrap";
import { Controller } from "react-hook-form";
import API from "utils/Axios";
import Context from "./Ctx";
import { PAGE_SIZE } from "constants/apiContants";

const CasosAsignados = ({ id }) => {
    const [casos, setCasos] = useState([])
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [links, setLinks] = useState(null)
    const [paginacion, setPaginacion] = useState(null);
    const [params, setParams] = useState({ page_size: PAGE_SIZE, page: 1 });

    const load = async () => {
        const { data } = await API.get(`asesorias/solicitud/?persona=${id}`, { params })
        setCasos(data.results)
        setTotalRegistros(data.count || 0);
        setPaginacion({ paginas: data.total_pages, registros: data.count });
        setLinks(data.links);
    }

    const next = () => {
        const page = links.next.match(/page=[0-9]+/);
        console.log(page);
        setParams({ ...params, page: page[0].split("=")[1] });
    };

    const prev = () => {
        const text = links.previous.match(/page=[0-9]+/);
        const page = text ? text[0].split("=")[1] : 1;
        setParams({ ...params, page });
    };

    const calcularPaginas = () => {
        if (paginacion && casos.length) {
            let startPage, endPage;
            if (paginacion.paginas <= 10) {
                startPage = 1;
                endPage = paginacion.paginas;
            } else {
                if (params.page <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (params.page + 4 >= paginacion.paginas) {
                    startPage = paginacion.paginas - 9;
                    endPage = paginacion.paginas;
                } else {
                    startPage = params.page - 5;
                    endPage = params.page + 4;
                }
            }
            const paginas = [];
            console.log(startPage, endPage);
            for (let i = startPage; i <= endPage; i++) {
                paginas.push(i);
            }
            return paginas.map((i) => {
                const p = { active: i == params.page };
                if (!p.active) {
                    p.onClick = () => {
                        setParams({ ...params, page: i });
                    };
                }
                return <Pagination.Item {...p}>{i}</Pagination.Item>;
            });
        }
    };

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        load()
    }, [params])

    return (
        <>
            {casos !== [] && (
                <Card style={{ marginTop: "20px" }}>
                    <Card.Body>
                        <h2>Casos asignados del estudiante</h2>
                        {casos.length ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Caso jurídico</th>
                                        <th>Fecha y hora de la asesoría</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {casos.map((el, i) => (
                                        <tr>
                                            <th>
                                                <a href={`/asesoria-juridica/caso/${el.id}`}>
                                                    {el.id}
                                                </a>
                                            </th>
                                            <th>{el.dt_fechaAsesoria} {el.ht_horaAsesoria}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Alert variant="warning">Este estudiante no tiene ningún caso asignado.</Alert>
                        )}
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                        <Form.Group className="d-flex align-items-center">
                            <Form.Label>Número de registros</Form.Label>&nbsp;
                            <Form.Control
                                as="select"
                                style={{ width: 150 }}
                                onChange={(e) =>
                                    setParams({ ...params, page: 1, page_size: e.target.value })
                                }
                            >
                                <option value={10} selected={params.page_size == 10}>
                                    10
                                </option>
                                <option value={50} selected={params.page_size == 50}>
                                    50
                                </option>
                                <option value={100} selected={params.page_size == 100}>
                                    100
                                </option>
                                <option value={500} selected={params.page_size == 500}>
                                    500
                                </option>
                            </Form.Control>
                        </Form.Group>
                        <Pagination>
                            {links && links.previous ? (
                                <Pagination.Prev onClick={prev} />
                            ) : (
                                <Pagination.Prev disabled />
                            )}
                            {calcularPaginas()}
                            {links && links.next ? (
                                <Pagination.Next onClick={next} />
                            ) : (
                                <Pagination.Next disabled />
                            )}
                        </Pagination>
                        <strong>Registros encontrados {totalRegistros || 0}</strong>
                    </Card.Footer>
                </Card>
            )}
        </>
    )
}

export default CasosAsignados