import React from 'react'
import { connect } from 'react-redux'
import  './style'

const Radios = ({status,mode1,mode2}) => {
    let view = ''
    if(status){
        view = (
            <div className="radio-box">
                <div>
                    <label className="radio-lable" onClick={mode1}>
                        <span className="radio-img"><img width="20" height="20" src={require("./unselected.png")} /></span>
                        <span className="radio-text">{`阻塞等待`}</span> 
                    </label> 
                    <div className="property-row-content radio-detail-text"> 
                        必须在子流程完成审批后，父流程才可继
                        续流转。                
                    </div>
                </div>
                <label className="radio-lable" >
                    <span className="radio-img"><img width="20" height="20" src={require("./selected.png")} /></span>
                    <span className="radio-text">{`非阻塞等待`}</span> 
                </label> 
                <div className="property-row-content radio-detail-text"> 
                    子流程发起后，父流程可以继续流转，父
                    子流程相互独立。                
                </div>
            </div>
        )
    }else{
        view = (
            <div className="radio-box">
            <div>
                <label className="radio-lable">
                    <span className="radio-img"><img width="20" height="20" src={require("./selected.png")} /></span>
                    <span className="radio-text">{`阻塞等待`}</span> 
                </label> 
                <div className="property-row-content radio-detail-text"> 
                    必须在子流程完成审批后，父流程才可继
                    续流转。                
                </div>

            </div>
                <label className="radio-lable" onClick={mode2}>
                    <span className="radio-img"><img width="20" height="20" src={require("./unselected.png")} /></span>
                    <span className="radio-text">{`非阻塞等待`}</span> 
                </label>  
                <div className="property-row-content radio-detail-text"> 
                    子流程发起后，父流程可以继续流转，父
                    子流程相互独立。                
                </div>
            </div>
        )
    }
    return view
}

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
