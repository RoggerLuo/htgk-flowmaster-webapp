import React from 'react'
import {connect} from 'react-redux'

const Radios =  ({dispatch,isWaiting}) => {
    const mode1 = () => {
        reduxStore.dispatch({type:'subflow/isWaiting',isWaiting:false})
    }
    const mode2 = () => {
        reduxStore.dispatch({type:'subflow/isWaiting',isWaiting:true})
    }
    let view = ''
    if(isWaiting){
        view = (
            <div className="radio-box">
                <div style={{cursor:'pointer'}}>
                    <label className="radio-lable">
                        <span className="radio-img"><img width="20" height="20" src={require("../selected.png")} /></span>
                        <span className="radio-text">{`阻塞等待`}</span> 
                    </label> 
                    <div className="property-row-content radio-detail-text"> 
                        必须在子流程完成审批后，父流程才可继
                        续流转。                
                    </div>

                </div>

                <div style={{cursor:'pointer'}}>

                    <label className="radio-lable" onClick={mode2}>
                        <span className="radio-img"><img width="20" height="20" src={require("../unselected.png")} /></span>
                        <span className="radio-text">{`非阻塞等待`}</span> 
                    </label>  
                    <div className="property-row-content radio-detail-text"> 
                        子流程发起后，父流程可以继续流转，父
                        子流程相互独立。                
                    </div>
                </div>
            </div>

        )
        
    }else{
        view = (
            <div className="radio-box">
                
                <div style={{cursor:'pointer'}}>
                    <label className="radio-lable" onClick={mode1}>
                        <span className="radio-img"><img width="20" height="20" src={require("../unselected.png")} /></span>
                        <span className="radio-text">{`阻塞等待`}</span> 
                    </label> 
                    <div className="property-row-content radio-detail-text"> 
                        必须在子流程完成审批后，父流程才可继
                        续流转。                
                    </div>
                </div>
                
                <div style={{cursor:'pointer'}}>

                    <label className="radio-lable" >
                        <span className="radio-img"><img width="20" height="20" src={require("../selected.png")} /></span>
                        <span className="radio-text">{`非阻塞等待`}</span> 
                    </label> 
                    <div className="property-row-content radio-detail-text"> 
                        子流程发起后，父流程可以继续流转，父
                        子流程相互独立。                
                    </div>
                </div>
            </div>
        )
        
    }
    return view
}
const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const currentRepo = repo.filter((el,index)=>el.id == id) 
    if(currentRepo.length==0) return {isWaiting:false}
    const isWaiting = currentRepo[0].isWaiting
    return {isWaiting} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(Radios)    


