import React,{createClass} from 'react';
import { render } from 'react-dom'
import DialoguePopup from '../basicComp/DialoguePopup'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ConditionGroup from './conditionGroup'
import './style'

const Radios = ({mode1,mode2}) => {
    return (
        <div className="radio-box">
            <label className="radio-lable">
                <input onClick={mode1} className="radio" name="condition" type="radio" value="" />
                手动选择 
            </label> 
            <label className="radio-lable">
                <input onClick={mode2} className="radio" name="condition" type="radio" value="" />
                编写公式 
            </label> 
        </div>)
}

const Component = () => {
    
    return(
        <div className="react-approve" >
            <SectionTitleContainer text='条件设置'/>            
            <Radios />
            <div className="section-content">满足以下条件则分支流向节点“{window.nextElementIs}”</div>
            <Options />
            <div className="section-title">说明：</div>
            <div className="section-content">
                条件与条件间是“或”的关系<br/>
                规则与规则间是“与”的关系
            </div>
        </div>
    )

}
