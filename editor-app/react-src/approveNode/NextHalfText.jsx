import React from 'react'
import { connect } from 'react-redux'
import  './style'
import Setting from './Setting'

const ApproveWithdrawProperty = ({ put, currentRepo, dispatch }) => {
    const previousNodeSpecifiedChange = () => {
        dispatch({type:'approve/previousNodeSpecifiedChange'})
        activeSave() 
    }
    const enableSingleSelectChange = () => {
        dispatch({type:'approve/enableSingleSelectChange'})
        activeSave() 
    }
    const previousNodeSpecified = currentRepo[0] && currentRepo[0].previousNodeSpecified
    const enableSingleSelect = currentRepo[0] && currentRepo[0].enableSingleSelect 
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
            
            <div style={{height:'10px',width:'100%'}}></div>
            (&nbsp; 
                <input 
                    onChange={enableSingleSelectChange} 
                    value={enableSingleSelect||false}
                    style={{cursor:'pointer'}} 
                    id="previousNodeSpecified" 
                    name="previousNodeSpecified" 
                    type="checkbox" 
                    checked={enableSingleSelect||false} 
                /> 
                &nbsp;
                <label htmlFor={"previousNodeSpecified"} style={{cursor:'pointer'}}> 
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
/*
<div style={{height:'10px',width:'100%'}}></div>
<div style={{height:'10px',width:'100%'}}></div>

<div className="property-row-title">{put('approveWithdrawProperty.remark.title')}</div>
<div className="property-row-content">{put('approveWithdrawProperty.remark.content')}</div>
*/
const mapStateToProps = (state) => {
    const repo = state.approve.repo
    const id = state.approve.id
    const currentRepo = repo.filter((el,index)=>el.id == id) || false
    return {currentRepo} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveWithdrawProperty)
