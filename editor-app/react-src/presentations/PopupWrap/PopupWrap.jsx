import React,{createClass} from 'react';
import './style'

const Component = ({title,cancel,confirm,display, /*后面可选*/ children,height,width}) => {
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
                            取消
                        </div>
                        <div className="confirm" onClick={confirmDecorated}>
                            确定
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component
