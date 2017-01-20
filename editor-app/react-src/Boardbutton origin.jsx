import React,{createClass} from 'react';
import { render } from 'react-dom'
const Boardbutton = ({text,optionArray}) => {
    /* 可以改成return的模式，这样你就可以加其他语句了 */
    return(
    <div className="boardbutton">
        <div className="section-title">审批人员</div>
        <div className="mybutton">
            添加审批人员 <span className="inverted-triangle">▼</span>
        </div>
        <div className="myoption">
            <div className="option">
                选择发起人上级
            </div>                
            <div className="option">
                选择机构角色
            </div>                
            <div className="option">
                选择特定人员 
            </div>                
        </div>

        <div className="characters">
            <div className="character">
                <span className="name">张三</span><span>&nbsp;X</span>
            </div>
            或
            <div className="character">
                <span className="name">上两级领导</span><span>&nbsp;X</span>
            </div>

        </div>
        <div className="section-title">审批规则</div>
        <div className="content">只需节点上任意一人审批即可通过</div>

        
    

        


        <div className="popup-dialogue">

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


        <div className="drop-down">
            <div className="drop-down-placeholder">
            测试14px
            </div>

            <table className="drop-down-table">
            <tbody>
                <tr>
                    <td className="drop-down-choosed">
                        测试14px <span className="inverted-triangle">▼</span>
                    </td>
                </tr>
                    <tr className="drop-down-options">
                    <td>
                        <div className="drop-down-option">
                            一
                        </div>                
                        <div className="drop-down-option">
                            两
                        </div>
                        </td>                
                    </tr>    
            </tbody>
            </table>                 
        </div>

        <div className="soft-container">
            <i className="icon iconfont icon-xiangxia2"></i>

            两测试测试长度一测试测试长度一
            <i className="icon iconfont icon-icon-test"></i>

        </div>

        <li>
        <i className="icon iconfont icon-xiangxia2"></i>
            <div className="name">向下2</div>
            <div className="fontclass">.icon-xiangxia2</div>
        </li>
        
        <li>
        <i className="icon iconfont icon-enter"></i>
            <div className="name">enter</div>
            <div className="fontclass">.icon-enter</div>
        </li>
        
        <li>
        <i className="icon iconfont icon-icon-test"></i>
            <div className="name">色块－文件夹</div>
            <div className="fontclass">.icon-icon-test</div>
        </li>

    </div>
)}
export default Boardbutton