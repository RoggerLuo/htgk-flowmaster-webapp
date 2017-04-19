import React,{createClass} from 'react'
import BoardbuttonContainer from '../containers/BoardbuttonContainer'
import {connect} from 'react-redux'
// import save from './save'

const ButtonContainer = ({dispatch,children}) => { //parallel 个性化版本  button
    const confirm = (item) => { 
        dispatch({
            type:'pushEndpoint',
            item
        })   
        // save()
        window.activeSave() 
    }

    const action3 = ()=>{
        const chooseCallback = (e) => {
            window.removeEventListener("message",chooseCallback, false)
            e.data.value.forEach((el)=>{
                let item = {
                    text:el.name,
                    value:el.id,
                    cate:el.type
                }                            
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

