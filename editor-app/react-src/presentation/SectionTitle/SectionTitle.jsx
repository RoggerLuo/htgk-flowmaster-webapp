import React,{createClass} from 'react';
import { render } from 'react-dom'
import './style'

const SectionTitle = ({text,modeSwitch,add,del,cancel}) => {
    let rightSide=''
    if(modeSwitch == 'icon'){
        rightSide = (
            <span>
                <i className="icon qingicon icon-add" onClick={add}></i>
                <i className="icon qingicon icon-delete" onClick={del}></i>
            </span>
        )
    }else{
        rightSide = (<span style={{color:'#00b0ff'}} onClick={cancel}>取消</span>)
    }
    return (
        <div className="section-title">
            <span>{text}</span>
            {rightSide}
        </div>
    )
}

export default SectionTitle
