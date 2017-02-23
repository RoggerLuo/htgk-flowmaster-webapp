import React,{createClass} from 'react';
import './SolidFrame.less'

const SolidFrame = ({click,modeSwitch,children}) => {
    let style = "1px solid #bac2ce"
    if(modeSwitch=='delete'){
        style = "1px solid red"
    }else{
        style = "1px solid #bac2ce"
    }
    return(
        <div className="solid-frame-container">
            <div className="solid-frame" style={{border:style}}>
                {children}
            </div>
            <i onClick={click} className="icon qingicon icon-guanbi2fill" style={{margin: '-8px',color:'red'}}></i>
        </div>
    )
}

export default SolidFrame