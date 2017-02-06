import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'




const SoftContainer = ({text,optionArray,children,conditionIndex}) => {
    let redFrame={border: '1px solid red'}
    return(
        <div className="solid-container-container">
            <div className="solid-container" style={redFrame}>
                {children}
            </div>
            <i className="icon qingicon icon-guanbi2fill icon-red-close-for-condition" onClick={()=>{deleteCondition(conditionIndex)}}></i>
        </div>
    )
}
export default SoftContainer

