import React,{createClass} from 'react';
import { render } from 'react-dom'
import DialoguePopup from '../basicComp/DialoguePopup'
import { connect } from 'react-redux'

const SectionTitle = ({text,widgetDisplay,cancel,add,del}) => {
    let widget=''
    if(widgetDisplay){
        widget = (<span style={{color:'#00b0ff'}} onClick={cancel}>取消</span>)
    }else{
        widget = (
            <span>
                <i className="icon qingicon icon-add" onClick={add}></i>
                <i className="icon qingicon icon-delete" onClick={del}></i>
            </span>
        )
    }
    return (
        <div className="section-title">
            <span>{text}</span>
            {widget}
        </div>
    )
}
export default SectionTitle

// const mapStateToProps = (state) => {
//     const findElement = state.branch.dataRepo.filter((el,index)=>{return el.id == state.branch.id})
//     const conditions = findElement[0] && findElement[0].conditions || []
//     let widgetDisplay = (state.branch.conditionMode =='delete') && (conditions.length != 0) 
//     return {widgetDisplay}
// }
// const mapDispatchToProps = (dispatch) => {
//     const cancel =()=>{
//         dispatch({type:'closeConditionDeleteMode'})
//     }
//     const add = () => {
//         cancel()
//         dispatch({type:'addCondition'})
//         // 滑到底
//         const element = jQuery('.propertySection .selected-item-section .selected-item-body')
//         const h = element[0].scrollHeight - element.height()
//         element.scrollTop(h);
//     }
//     const del = () => {
//         dispatch({type:'conditionDeleteMode'})
//     }
//     return {add,cancel,del}
// }
// const SectionTitleContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(SectionTitle)

