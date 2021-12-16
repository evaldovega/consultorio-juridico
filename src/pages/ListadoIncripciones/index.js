import { Button, Input, Space, Form } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "components/Page";
import API from "utils/Axios";
import { Breadcrumb, Card, Table, Spinner } from "react-bootstrap";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Policy from "components/Policy";
import { ROL_ASESOR, ROL_ADMIN } from "constants/apiContants";
import { MDBDataTable } from 'mdbreact'

const ListadoIncripciones = () => {
  const [docs, setDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [headerTable, setHeaderTable] = useState([
    {
      label: 'No. de inscripción',
      field: 'no_inscripcion'
    },
    {
      label: 'Nombres y apellidos',
      field: 'nombres_apellidos'
    },
    {
      label: 'Tipo de documento',
      field: 'tipo_documento'
    },
    {
      label: 'Documento de identidad',
      field: 'documento_identidad'
    },
    {
      label: 'Fecha de expedición',
      field: 'fecha_expedicion'
    },
  ])

  const [tableData, setTableData] = useState([])

  const getInscripciones = async () => {
    API.get("estudiantes/inscripcion/").then((response) => {
      console.log(JSON.stringify(response.data));
      setDoc(response.data);
      setTableData(response.data.map((d) => ({
        "no_inscripcion": d.id,
        "nombres_apellidos": `${d.r_usuarios_persona.a_primerNombre} ${d.r_usuarios_persona.a_segundoNombre} ${d.r_usuarios_persona.a_primerApellido} ${d.r_usuarios_persona.a_segundoApellido}`,
        "tipo_documento": d.r_usuarios_persona.r_config_tipoDocumento,
        "documento_identidad": d.r_usuarios_persona.a_numeroDocumento,
        "fecha_expedicion": d.r_usuarios_persona.a_fechaExpedicionDocumento
      })))
    });
  };

  const getColumnSearchProps = (dataIndex) => {
    let searchInput;
    const _props = {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
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
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Limpiar
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Resaltar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
    return _props;
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(0);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    setTimeout(() => {
      getInscripciones();
      setLoading(false);
      //setDoc(draft=>inscripciones)
    }, 1000);
  }, []);

  return (
    <Policy policy={[ROL_ASESOR, ROL_ADMIN]}>
      <Page>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/inscripcion-estudiantes">Inscripción estudiantes</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Listado de incripciones</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            {loading && (
              <div className="d-flex justify-content-center">
                <Spinner
                  animation="border"
                  role="status"
                  variant="primary"
                ></Spinner>
              </div>
            )}
            <MDBDataTable
              hover
              entriesOptions={[3, 5, 20, 25]}
              entries={3}
              entriesLabel="Mostrar entradas"
              searchLabel="Buscar"
              infoLabel={["Mostrando", "a", "de", "entradas"]}
              noRecordsFoundLabel="No se han encontrado registros."
              paginationLabel={["Anterior", "Siguiente"]}
              pagesAmount={4}
              data={{
                columns: headerTable,
                rows: tableData
              }}
              fullPagination
            />
          </Card.Body>
        </Card>
      </Page>
    </Policy>
  );
};

export default ListadoIncripciones;
