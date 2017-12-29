import React from 'react'
import { connect } from 'react-redux'

const List = ({ value, text, versionId, checked, dispatch, currentRepo }) => {
    const onclick = () => {
        dispatch({
            type: 'subflow/add',
            subProcess: {
                subProcDefKey: value,
                name: text,
                versionId
            }
        })
        rdx.save() 
        window.requestFormData(value,function(dataObj){
            if(!dataObj) return
            dispatch({type:'subflow/leftFields',leftFields:dataObj.components})
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
export default rdx.connect('subflow',List)
