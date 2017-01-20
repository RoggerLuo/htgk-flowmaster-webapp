import React,{createClass} from 'react';
import { render } from 'react-dom'
const SoftContainer = ({text,optionArray,children}) => {
    /* 可以改成return的模式，这样你就可以加其他语句了 */
    return(
        <div className="soft-container-container">
            <div className="soft-container">
                {children}
            </div>
            <i className="icon qingicon icon-guanbi2fill" style={{verticalAlign: 'middle'}}></i>
        </div>
)}
export default SoftContainer