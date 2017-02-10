import React,{createClass} from 'react';
import './style'

const Component = ({cancel,confirm,display,children}) => {
    const confirmDecorated = ()=>{
        confirm()
        cancel()
    }
    return(
        <div className="popup-coverwrap" style={{display:display}}>
            <div className="popup">
                <div className="x">                
                    <i className="icon qingicon icon-close" onClick={cancel}></i>
                </div>
                <div className="header">
                    请输入标题
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