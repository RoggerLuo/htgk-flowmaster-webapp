import React,{createClass} from 'react';
import { render } from 'react-dom'
import Dropdown from './basicComp/Dropdown'
import DialoguePopup from './basicComp/DialoguePopup'
import SoftContainer from './basicComp/SoftContainer'
import Boardbutton from './basicComp/Boardbutton'
import CharactersList from './basicComp/CharactersList'
import './approveComp.less'
import '../qingfont/iconfont.css'

const Approve = ({text,optionArray}) => {
    /* 可以改成return的模式，这样你就可以加其他语句了 */
    return(
    <div>
        <div className="section-title">审批人员</div>
        
        <SoftContainer>SoftContainerSoftContainerSoftContainer</SoftContainer>        
        <DialoguePopup> cc<Dropdown />ccchildren</DialoguePopup>
        
        <div className="section-title">审批规则</div>
        <div className="content">只需节点上任意一人审批即可通过</div>
        
        <Dropdown />
        <Boardbutton />
        <CharactersList />
    
    </div>
)}

export default function(){
    render(
        <div>
            <Approve />
        </div>
        ,
        document.getElementById('approvePropertyCtrl')
    );
}