import React from 'react'
import { connect } from 'react-redux'
import  './style'
import Setting from './Setting'

const ManualWithdrawProperty = ({ put, currentRepo, dispatch }) => {
    const change1 = () => rdx.put('manual','replace',['previousNodeSpecified'],!currentRepo.previousNodeSpecified,'boolean')
    const change2 = () => rdx.put('manual','replace',['enableSingleSelect'],!currentRepo.enableSingleSelect,'boolean')
    const previousNodeSpecified = currentRepo.previousNodeSpecified
    const enableSingleSelect = currentRepo.enableSingleSelect 
    return(
        <div>
            <div style={{height:'30px',width:'100%'}}></div>
            <label htmlFor={"previousNodeSpecified"} style={{cursor:'pointer'}}> 
                <div className="property-row-content"> 
                    允许上一节点处理人指定本节点审批人
                </div>
            </label>
            &nbsp;
            <input 
                onChange={change1} 
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
            
            <div style={{height:'10px',width:'100%'}}></div>
            (&nbsp; 
                <input 
                    onChange={change2} 
                    value={enableSingleSelect||false}
                    style={{cursor:'pointer'}} 
                    id="enableSingleSelect" 
                    name="enableSingleSelect" 
                    type="checkbox" 
                    checked={enableSingleSelect||false} 
                /> 
                &nbsp;
                <label htmlFor={"enableSingleSelect"} style={{cursor:'pointer'}}> 
                    <div className="property-row-content">指定审批人仅支持单选</div> 
                </label>
            &nbsp;)

            <div className="property-row-title"> 
                审批项设置
            </div>
            <Setting />
        </div>
    )
}
export default rdx.connect('manual',ManualWithdrawProperty)
