import React,{createClass} from 'react'
// import Button from '../containers/Button'
import Button from '../DropdownButton'

// import save from './save'
import {connect} from 'react-redux'
import { toJS, fromJS, List, Map } from 'immutable'

const ButtonContainer = ({state,dispatch,children,index,xClass}) => { //parallel 个性化版本  button
    const isDupli = (item)=>{
        let data = fromJS(state.parallel)
        const currentIndex = data.get('repo').findKey((el) => el.get('id') == state.parallel.id) //如果这里找不到会怎么样
        const flag = state.parallel.repo[currentIndex].data[index].some((el, index) => {
            if (el.text == item.text) {
                window.showAlert('已经存在"' + item.text + '"的选项')
                return true
            }
        })
        return flag        
    }
    const add = (item) => {
        if(isDupli(item)){
            return ;
        }
        dispatch({type:'addCharacter',item,index}) //点击popup的确定按钮时返回 popup选择的item
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

                dispatch({type:'addCharacter',item,index}) //点击popup的确定按钮时返回 popup选择的item
            })
            window.activeSave() 
        }
        window.addEventListener('message',chooseCallback,false)
        let message = {type:"openSelectUserPanel",value:"",params:{pickerType:'onlyPeople',title:'选择人员',orgId:window.getQueryString("rootOrgId")}}
        window.parent.postMessage(message,'*')
    }
    
    return ( 
        <Button xClass={xClass} popupConfirm={add} action3={action3}>
            {children}
        </Button>
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

