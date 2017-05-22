import React,{createClass} from 'react';
import './style'

const SolidFrame = ({del,mode,children}) => { //click点击删除,modeSwitch=='delete',children
    let style = "1px solid #c5c5c5"
    let display = "none"
    if( mode =='delete'){
        style = "1px solid red"
        display = ''

    }else{
        style = "1px solid #c5c5c5"
        display = 'none'
    }
    return(
        <div className="solid-frame-container">
            <div className="solid-frame" style={{border:style}}>
                {children}
            </div>
            <i onClick={del} className="icon iconfont icon-guanbi2fill" style={{display:display,margin: '-8px',color:'red'}}></i>
        </div>
    )
}

export default SolidFrame