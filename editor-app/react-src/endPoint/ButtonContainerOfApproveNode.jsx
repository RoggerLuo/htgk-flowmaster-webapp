import React,{createClass} from 'react'
import BoardbuttonContainer from '../containers/BoardbuttonContainer'
import {connect} from 'react-redux'
// import save from './save'
import { toJS, fromJS, List, Map } from 'immutable'


const ButtonContainer = ({state,dispatch,children}) => { //parallel 个性化版本  button
    const isDupli = (item)=>{
        let data = fromJS(state)
        let repoIndex = data.get('endpoint').get('approveListRepo').findKey((el) => el.get('id') == data.get('endpoint').get('id')) //如果这里找不到会怎么样
        if (!repoIndex && (repoIndex != 0) ) { 
            return false
        }else{
            let flag = state.endpoint.approveListRepo[repoIndex].data.some((el, index) => {
                if (el.text == item.text) {
                    window.showAlert('已经存在"' + item.text + '"的选项')
                    return true
                }
            })
            return flag
        }
    }
    const confirm = (item) => { 
        if(isDupli(item)){return ;}
        dispatch({
            type:'pushEndpoint',
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
                if(isDupli(item)){return ;}
                
                dispatch({type:'pushEndpoint',item}) //点击popup的确定按钮时返回 popup选择的item
            })
            // save()
            window.activeSave() 
        }
        window.addEventListener('message',chooseCallback,false)
        let message = {type:"openSelectUserPanel",value:"",params:{pickerType:'people',title:'选择人员'}}
        window.parent.postMessage(message,'*')
    }

    return ( 
        <BoardbuttonContainer popupConfirm={confirm} action3={action3}>
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

