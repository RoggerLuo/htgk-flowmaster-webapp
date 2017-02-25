import React,{createClass} from 'react';
import { render } from 'react-dom'
import DialoguePopup from '../basicComp/DialoguePopup'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ConditionGroup from './conditionGroup'
import './style'

const Button=(props)=>{
    return(
        <div className="boardbutton">
            <div className="mybutton" >
                添加规则
            </div>
        </div>
    )
}

const dropdownMode = () => {
    store.dispatch({type:'modeChange',value:'dropdown'})
}
const textMode = () => {
    store.dispatch({type:'modeChange',value:'text'})
}

const addRule = (index) => {
    store.dispatch({type:'addRule',index})
}

// const showDelete =()=>{
//     store.dispatch({type:'conditionDeleteMode'})
// }
// const closeDelete =()=>{
//     store.dispatch({type:'closeConditionDeleteMode'})
// }
// const addCondition = () => {
//     closeDelete()
//     store.dispatch({type:'addCondition'})
//     // 滑到底
//     const element = jQuery('.propertySection .selected-item-section .selected-item-body')
//     const h = element[0].scrollHeight - element.height()
//     element.scrollTop(h);
// }
const Component =   ({conditionDeleteStyle,id,dataRepo,prototype,mode}) => {
    // const theRightItem = dataRepo.filter((el,index)=>{
    //     return el.id == id
    // })
    // const conditionGroups = theRightItem[0] && theRightItem[0].conditionGroups || []

    let content = ''
    if(mode == 'text'){
        content = (<div><textarea /></div>)
    }else{
        // debugger
        if(conditionGroups.length == 0){
            content = ''
        }else{
            content = conditionGroups.map((el,index)=>{
                return (
                    <ConditionGroup {...{conditionDeleteStyle,conditionGroups,prototype,mode,el,index,addRule}} key={index}  />
                )
            })
        }
    }
    // let titleComp=''
    // if((conditionDeleteStyle.display =='')&& (conditionGroups.length != 0)){

    //     titleComp = (<span style={{color:'#00B1FD'}} onClick={closeDelete}>取消</span>)
    // }else{
    //     titleComp = (<span>
    //         <i className="icon qingicon icon-add" onClick={addCondition}></i>
    //         <i className="icon qingicon icon-delete" onClick={showDelete}></i>
    //     </span>
    //     )
    // }
    return(
        <div className="react-approve" >
            <div className="section-title">
                <span>条件设置</span>
                {titleComp}
            </div>
            <div className="radio-box">
                <label className="radio-lable"><input onClick={dropdownMode} className="radio" name="condition" type="radio" value="" />手动选择 </label> 
                <label className="radio-lable"><input onClick={textMode} className="radio" name="condition" type="radio" value="" />编写公式 </label> 
            </div>
            <div className="section-content">满足以下条件则分支流向节点“{window.nextElementIs}”</div>

            {content}
            
            <div className="section-title">说明：</div>
            <div className="section-content">
                条件与条件间是“或”的关系<br/>
                规则与规则间是“与”的关系
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return state.branch
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default function(){
    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('branchSequenceFlowComponent')
    );
}