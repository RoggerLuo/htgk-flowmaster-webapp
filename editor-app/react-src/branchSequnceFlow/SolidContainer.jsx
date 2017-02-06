import React,{createClass} from 'react';
import { render } from 'react-dom'
const SoftContainer = ({text,optionArray,children}) => {
    let redFrame={border: '1px solid red'}
    return(
        <div className="solid-container-container">
            <div className="solid-container" style={redFrame}>
                {children}
            </div>
            <i className="icon qingicon icon-guanbi2fill icon-red-close-for-condition" onClick={()=>{deleteRule(key1,key2)}}></i>
        </div>
    )
}
export default SoftContainer

