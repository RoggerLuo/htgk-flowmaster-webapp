import React from 'react'
import { connect } from 'react-redux'
import  './style'

const CirculationNextHalf = ({ put, currentRepo, dispatch }) => {
    if(!fm.approve.is_display_prevShapeSpecify_for_circulation(fm.currentSelectedShape,currentRepo)){
        return null
    }

    const previousNodeSpecifiedChange = () => {
        if(fm.versionModel) return
        dispatch({type:'circulation/previousNodeSpecifiedChange'})
        activeSave() 
    }
    const previousNodeSpecified = currentRepo.previousNodeSpecified
    return(
        <div>
            <div style={{height:'14px',width:'100%'}}></div>
            <label htmlFor={"previousNodeSpecified"} style={{cursor:'pointer'}}> 
                <div className="property-row-content"> 
                    允许上一节点处理人指定本节点审批人
                </div>
            </label>
            &nbsp;
            <input 
                onChange={previousNodeSpecifiedChange} 
                checked={previousNodeSpecified||false} 
                value={previousNodeSpecified||false}
                style={{cursor:'pointer',position: 'relative',bottom: '1px'}} 
                id="previousNodeSpecified" 
                name="previousNodeSpecified" 
                type="checkbox" 

            />             
        </div>
    )
}

export default rdx.connect('circulation',CirculationNextHalf)

/*
<div className="property-row-content" style={{color: '#999999'}}> 
    从【特定节点审批人】【二次开发】获取的审批人类型不在选择范围中。 
</div>
*/