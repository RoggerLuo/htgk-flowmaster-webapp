import React,{createClass} from 'react';
import './style'

const Boardbutton = ({data,toggle,close,display,children}) => { //data:{click,text}
    return(
        <div className="boardbutton">
            <div onClick={toggle}>
                {children}
            </div>
            <div className="myoption" style={{display:display}} >
                {data.map((el,index)=>{
                    return (
                        <div key={index} onClick={()=>{el.click();close()}} className="option">{el.text}</div>                
                    )
                })}
            </div>
            <div className="big-cover" style={{display:display}} onClick={close}></div>
        </div>
    )
}

export default Boardbutton

