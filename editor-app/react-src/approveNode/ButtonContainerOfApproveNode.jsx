/*

    因为每个组件 通过popup拿到选择的数据以后，对数据的处理都不同，（插入各自不同的数据仓库）
    所以 每一个组件都要写一份不同的 处理的逻辑
    [确定按钮的事件、confirm事件]
    这个逻辑放在 buttonContainer

    popup的确定按钮、confirm事件 在各自组件的 buttonContainer里面
    前两个用confirm
    最后一个调用了vue的对话框组件，用action3单独穿入

*/
import React,{createClass} from 'react'
import BoardbuttonContainer from '../containers/BoardbuttonContainer'
import {connect} from 'react-redux'
import { toJS, fromJS, List, Map } from 'immutable'

const ButtonContainer = ({state,dispatch,children}) => { //parallel 个性化版本  button
    const isDupli = (item)=>{
        let data = fromJS(state)
        let repoIndex = data.get('approve').get('approveListRepo').findKey((el, index, iter) => el.get('id') == data.get('approve').get('id')) //如果这里找不到会怎么样
        if (!repoIndex && (repoIndex != 0) ) { 
        }else{
            let flag = state.approve.approveListRepo[repoIndex].data.some((el, index) => {
                if (el.text == item.text) {
                    window.showAlert('已经存在"' + item.text + '"的选项')
                    return true
                }
            })
            return flag
        }
    }
    const confirm = (item) => { 
        if(isDupli(item)){
            return ;
        }
        dispatch({
            type:'pushApproveList',
            item
        })   
        window.activeSave() 
    }

    const action3 = ()=>{
        const chooseCallback = (e) => {
            window.removeEventListener("message",chooseCallback, false)
            e.data.value.forEach((el)=>{
                let item = {
                    text:el.name,
                    value:el.id,
                    cate:'EMPLOYEE'//el.type
                }
                if(isDupli(item)){
                    return ;
                }
                dispatch({type:'pushApproveList',item}) //点击popup的确定按钮时返回 popup选择的item
            })
            window.activeSave() 
        }
        window.addEventListener('message',chooseCallback,false)
        let message = {type:"openSelectUserPanel",value:"",params:{pickerType:'onlyPeople',title:'选择人员',orgId:window.getQueryString("rootOrgId")}}
        window.parent.postMessage(message,'*')
    }
    
    return ( 
        <BoardbuttonContainer xClass={{marginTop:'5px',right:'12px'}} popupConfirm={confirm} action3={action3}>
            {children}
        </BoardbuttonContainer>
    )
}

const mapStateToProps = (state) => {
    return {state}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonContainer)

