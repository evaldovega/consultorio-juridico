const { Spin,Select } = require("antd")
const { useState, useEffect } = require("react")
const { default: API } = require("utils/Axios")

const OrientacionSexualSelector=({form,name})=>{
    const [loading,setLoading]=useState(false)
    const [docs,setDocs]=useState([])

    const load=()=>{
        setLoading(true)
        API('configuracion/orientacion')
        .then(({data})=>{
            setDocs(data)
        })
        .finally(()=>setLoading(false))
    }

    useEffect(()=>{
        load()
    },[])

    return (
        <Spin spinning={loading}>
            <Select>
                {docs.map(d=>(<Select.Option value={d.id}>{d.a_titulo}</Select.Option>))}
            </Select>
        </Spin>
    )
}

export default OrientacionSexualSelector