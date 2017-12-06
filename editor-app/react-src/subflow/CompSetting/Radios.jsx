import React from 'react'

export default ({status,mode1,mode2}) => {
    let view = ''
    if(status){
        view = (
            <div className="radio-box">
                <div>
                    <label className="radio-lable" onClick={mode1}>
                        <span className="radio-img"><img width="20" height="20" src={require("../unselected.png")} /></span>
                        <span className="radio-text">{`阻塞等待`}</span> 
                    </label> 
                    <div className="property-row-content radio-detail-text"> 
                        必须在子流程完成审批后，父流程才可继
                        续流转。                
                    </div>
                </div>
                <label className="radio-lable" >
                    <span className="radio-img"><img width="20" height="20" src={require("../selected.png")} /></span>
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
                    <span className="radio-img"><img width="20" height="20" src={require("../selected.png")} /></span>
                    <span className="radio-text">{`阻塞等待`}</span> 
                </label> 
                <div className="property-row-content radio-detail-text"> 
                    必须在子流程完成审批后，父流程才可继
                    续流转。                
                </div>

            </div>
                <label className="radio-lable" onClick={mode2}>
                    <span className="radio-img"><img width="20" height="20" src={require("../unselected.png")} /></span>
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


