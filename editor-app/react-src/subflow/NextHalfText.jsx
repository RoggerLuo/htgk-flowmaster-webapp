import React from 'react'
import { connect } from 'react-redux'
import  './style'
import Radios from './Radios'

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
            <div className="property-row-title"> 
                子流程阻塞设置
            </div>

            <label htmlFor={"withdraw"} style={{cursor:'pointer'}}>
                <Radios />

            </label>
        </div>
    )

}
/*

<div style={{height:'10px',width:'100%'}}></div>
<div style={{height:'10px',width:'100%'}}></div>



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
