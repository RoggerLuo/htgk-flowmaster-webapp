import React from 'react'
import { connect } from 'react-redux'

const List = ({value, text, versionId, checked, dispatch}) => {
    const onclick = () => {
        dispatch({
            type:'subflow/add',
            subProcess:{
                subProcDefKey:value,
                name:text,
                versionId
            }
        })
    }
    return (
        <div style={{paddingLeft:'24px',paddingTop:'10px'}}>
            <div className="property-row-content bluecolor-hover" onClick={onclick} style={{cursor:'pointer'}}> 
                {text} 
            </div>
        </div>
    )
}
// <label htmlFor={`listItem${index}${index2}`} style={{cursor:'pointer'}}> 
// </label>

const mapStateToProps = (state) => {
    // const repo = state.subflow.repo
    // const id = state.subflow.id
    // const filteredRepo = repo.filter((el,index)=>el.id == id) || false
    // const currentRepo = filteredRepo && filteredRepo[0] || false
    return {} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

/*
<input 
    onChange={onchange} 
    checked={checked||false} 
    value={checked||false}
    style={{cursor:'pointer'}} 
    id={`listItem${index}${index2}`}
    name={`listItem${index}${index2}`}
    type="checkbox" 
/>  
&nbsp;
*/