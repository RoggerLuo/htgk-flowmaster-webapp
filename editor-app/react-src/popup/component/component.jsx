import React,{createClass} from 'react';
import './style'

const Component = ({cancel,confirm,display,children,title,height}) => {
    const confirmDecorated = ()=>{
        confirm()
        cancel()
    }
    return(
        <div className="popup-coverwrap" style={{display:display}}>
            <div className="popup" style={{height:height}}>
                <div className="x">                
                    <i className="icon qingicon icon-close" onClick={cancel}></i>
                </div>
                <div className="header">
                    {title}
                </div>
                
                <div className="content">
                    {children}
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