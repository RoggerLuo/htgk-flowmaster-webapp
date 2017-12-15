import React from 'react'
import { connect } from 'react-redux'
// import { requestFormData } from '../../../ngEvent/initialize/requestFormData'

const List = ({ value, text, versionId, checked, dispatch,currentRepo }) => {
    const onclick = () => {
        dispatch({
            type: 'subflow/add',
            subProcess: {
                subProcDefKey: value,
                name: text,
                versionId
            }
        })
        activeSave() 
        window.requestFormData(value,function(dataObj){
            if(!dataObj) return
            dispatch({type:'subflow/leftFields',leftFields:dataObj.components})
            // window.subFormData = window.subFormData?window.subFormData:{}
            // window.subFormData[value] = dataObj
        })
    }
    let style = {cursor:'pointer'}
    if(currentRepo.subProcess.subProcDefKey == value){
        style = Object.assign({},style,{color:'#00b1fb'})
    }
    return (
        <div style={{paddingLeft:'24px',paddingTop:'10px'}}>
            <div className="property-row-content bluecolor-hover" onClick={onclick} style={style}> 
                {text} 
            </div>
        </div>
    )
}

// <label htmlFor={`listItem${index}${index2}`} style={{cursor:'pointer'}}> 
// </label>
const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const filteredRepo = repo.filter((el,index)=>el.id == id) || false
    const currentRepo = filteredRepo && filteredRepo[0] || false
    return {currentRepo}
}
const mapDispatchToProps = (dispatch) => {
    return { dispatch }
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