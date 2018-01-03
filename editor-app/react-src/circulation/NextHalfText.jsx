import React from 'react'
import { connect } from 'react-redux'
import  './style'

const CirculationNextHalf = ({ put, currentRepo, dispatch }) => {
    const previousNodeSpecifiedChange = () => {
        if(fm.versionModel) return
        dispatch({type:'circulation/previousNodeSpecifiedChange'})
        activeSave() 
    }
    const previousNodeSpecified = currentRepo.previousNodeSpecified
    return(
        <div>
            <div style={{height:'10px',width:'100%'}}></div>
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
                style={{cursor:'pointer'}} 
                id="previousNodeSpecified" 
                name="previousNodeSpecified" 
                type="checkbox" 

            />             
            <div className="property-row-content" style={{color: '#999999'}}> 
                从【特定节点审批人】【二次开发】获取的审批人类型不在选择范围中。 
            </div>
        </div>
    )
}

export default rdx.connect('circulation',CirculationNextHalf)
