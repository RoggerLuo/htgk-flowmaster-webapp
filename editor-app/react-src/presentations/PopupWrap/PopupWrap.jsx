import React,{createClass} from 'react';
import './style'

const Component = ({title,cancel,confirm,display,put, /*后面可选*/ children,height,width}) => {
    const confirmDecorated = ()=>{
        confirm()
        cancel()
    }
    
    return(
        <div className="popup-coverwrap" style={{display:display}}>
            <div className="popup" style={{height:height,width:width}}>
                <div className="x">                
                    <i className="icon qingicon icon-close" onClick={cancel}></i>
                </div>
                <div className="header">
                    {title}
                </div>
                
                <div className="content">
                    <div className="innerContent">
                        {children}
                    </div>
                </div>

                <div className="footer">
                    <div className="button-group">
                        <div className="cancel" onClick={cancel}>
                            {put('global.cancel')}
                        </div>
                        <div className="confirm" onClick={confirmDecorated}>
                            {put('global.confirm')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import connectPut from 'react-put'
const putOptions = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(putOptions)(Component)

export default ConnectedApp
