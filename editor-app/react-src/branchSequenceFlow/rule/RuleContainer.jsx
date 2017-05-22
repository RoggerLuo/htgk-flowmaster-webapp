import React,{createClass} from 'react';
import store from '../../../redux/configureStore.js'
import { connect } from 'react-redux'
import Rule from './RuleRepresentation'
/*
    这个container是为了个rule视图组件准备数据和逻辑的
    应该输出：
        dropdownData : 给3个dropdown传递的数据组合
        ruleMode: 是否显示规则的 删除按钮
        del: 点击删除当前 规则
        oninput: 为了输入的时候保存文字
*/

/* 参数字典
    key1 条件在 当前组件中 的序数
    key2 规则在 当前条件中 的序数
    ruleMode 当前显示状态(删除or正常)
    cancelDeleteRuleStatus 取消当前规则的删除状态
    
    ----来自redux的----
    conditions 当前组件的所有条件 组合成的数组
    template dropdownData的最初模版
*/

const RuleContainer = ({branch,key1,key2,ruleMode, conditions,dispatch,template,cancelRuleDeleteStatus}) =>{

    /* ruleMode 是传进来的 */
    const oninput = (event) => {
        dispatch({type:'ruleOnInput',key1,key2,content:event.target.value})
        activeSave()
        window.updateBranch()
    }

    const del = () => {
        if(conditions[key1].data.length<=1){
            window.showAlert('至少保留一组规则')
            cancelRuleDeleteStatus()
            return 
        }
        dispatch({type:'deleteRule',groupIndex:key1,ruleIndex:key2})
        activeSave()
        window.updateBranch()
    }
    
    /* 接下来的代码全是准备dropdowData */
    const ruleData = conditions && conditions[key1] && conditions[key1].data[key2] && conditions[key1].data[key2] || {}
    
    const dropdown = template

    // const environmentVariable =[{value:'date',text:'date'}]
    /*
        entry2template这个属性 
        在这个container里面 
        决定了dropdown.entry2.options的取值
    */
    ruleData.entry2template = ruleData.entry2template||'0'
    switch(ruleData.entry2template){
        case '0':
            dropdown.entry2.options = [{text:'请选择',value:'initial',index:'initial'}] //这个是二级联动
            break
        case '1':
            dropdown.entry2.options = branch.formProperties || [] //这个是二级联动
            break
        break;

        case '2':
            dropdown.entry2.options = branch.userProperties || [] //这个是二级联动
            break
        break;

        case '3':
            dropdown.entry2.options = branch.environmentVariable || [] //这个是二级联动
            break;
    }
    
    if(!ruleData.entry1){ //忘记有什么用了
        return null;
    }
    /* 
        默认值的设置逻辑有问题
     */
     dropdown.entry1.choosedText = ruleData.entry1.text
     dropdown.entry2.choosedText = ruleData.entry2.text
     dropdown.entry3.choosedText = ruleData.entry3.text

     // dropdown.entry1.choosedText = (ruleData.entry1.index != 'initial') && ruleData.entry1.text || dropdown.entry1.defaultText
     // dropdown.entry2.choosedText = (ruleData.entry2.index != 'initial') && ruleData.entry2.text || dropdown.entry2.defaultText
     // dropdown.entry3.choosedText = (ruleData.entry3.index != 'initial') && ruleData.entry3.text || dropdown.entry3.defaultText

    dropdown.input = ruleData.input

    dropdown.entry1.choose = (value) => {
        dispatch({value,type:'branchUpdate',groupIndex:key1,ruleIndex:key2,entryIndex:'entry1'})
        activeSave()
        window.updateBranch()
    }
    dropdown.entry2.choose = (value) => {
        activeSave()
        dispatch({value,type:'branchUpdate',groupIndex:key1,ruleIndex:key2,entryIndex:'entry2'})
        window.updateBranch()
    }
    dropdown.entry3.choose = (value) => {
        activeSave()
        dispatch({value,type:'branchUpdate',groupIndex:key1,ruleIndex:key2,entryIndex:'entry3'})
        window.updateBranch()
    }

    dropdown.entry1.usePut = true
    dropdown.entry2.usePut = false
    dropdown.entry3.usePut = false
    const dropdownData = dropdown
    return (<Rule {...{dropdownData,ruleMode,del,oninput}} />)
}

const mapStateToProps = (state) => {
    const elementFound = state.branch.dataRepo.filter((el,index)=>{
        return el.id == state.branch.id
    })
    const conditions = elementFound[0] && elementFound[0].conditions || []
    const template = state.branch.template
    return {conditions,template,branch:state.branch}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const RuleContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleContainer)

export default RuleContainer2
