import React from 'react'
import { connect } from 'react-redux'
import  './style'

const ApproveNode = ({ put, currentRepo, dispatch }) => {
    const withdrawChange = () => {
        dispatch({type:'approve/withdrawChange'})
        activeSave() 
    }
    const previousNodeSpecified = currentRepo[0] && currentRepo[0].previousNodeSpecified
    const withdraw = currentRepo[0] && currentRepo[0].withdraw 
    const enableSingleSelect = currentRepo[0] && currentRepo[0].enableSingleSelect 
    return(
        <div>
            <div style={{height:'10px',width:'100%'}}></div>
            <div style={{height:'10px',width:'100%'}}></div>
            <label htmlFor={"withdraw"} style={{cursor:'pointer'}}>
                <div className="property-row-content"> 
                    允许退回发起人
                </div>
            </label>
            &nbsp;
            <input 
                onChange={withdrawChange} 
                checked={withdraw||false} 
                value={withdraw||false}
                style={{cursor:'pointer'}} 
                id="withdraw" 
                name="withdraw" 
                type="checkbox" 
            /> 

        </div>
    )
}
/*
<div className="property-row-title">{put('approveNode.remark.title')}</div>
<div className="property-row-content">{put('approveNode.remark.content')}</div>
*/
const mapStateToProps = (state) => {
    const repo = state.manual.repo
    const id = state.manual.id
    const currentRepo = repo.filter((el,index)=>el.id == id) || false
    return {currentRepo} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveNode)
