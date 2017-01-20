import React,{createClass} from 'react';
import { render } from 'react-dom'
const PopupDialogue = ({text,optionArray}) => {
    /* 可以改成return的模式，这样你就可以加其他语句了 */
    return(
        <div className="popup-dialogue">
            <div className="popup-dialogue-visible">
                <div className="main-text">
                    申请的上一
                    
                    级领导
                </div>
                <div className="button-group">
                    <div className="cancel">
                        取消
                    </div>
                    <div className="placeholder">
                    </div>

                    <div className="confirm">
                        确定
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopupDialogue