import React from 'react'
import moment from 'moment'

const IsNew=({date})=>{
    const diff=moment().diff(moment(date))
    if(518400000-diff<=0){
        return null
    }
    
    return (
        <span style={{position:'relative',display:'inline-block',margin:'0 4px',marginRight:0,marginLeft:0}}>
            <i class="ms-Icon ms-Icon--Glimmer" style={{position:'absolute',bottom:'100%',fontSize:'.66em',marginBottom:'-.9em',right:'-.15em'}}></i>
        </span>
    )
}
export default IsNew