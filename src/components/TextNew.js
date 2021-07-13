import React from 'react'
const { default: IsNew } = require("./IsNew")

const TextNew=({date,children})=>{
    return (
        <span style={{display:'flex',verticalAlign:'top'}}>
            <IsNew date={date}/>
            <span style={{textOverflow:'ellipsis',flex:'1 1 auto',whiteSpace:'nowrap',overflow:'hidden',boxFlex:1}}>{children}</span>
        </span>
    )
}
export default TextNew