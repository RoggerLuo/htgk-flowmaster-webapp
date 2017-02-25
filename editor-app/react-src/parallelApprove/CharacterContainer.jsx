import React,{createClass} from 'react'
import {connect} from 'react-redux'
import Character from '../presentations/Character/Character'

/* 
    主要是把click的逻辑 组装好了， 还有拿出了text
*/
/*
    这样看来，一般的循环children结构，都可以这么干，
    只传入el和index， 再自己组装 方法 和 属性
*/

const CharacterContainer = ({el,index,dispatch}) => { 
    const characterIndex = index
    const groupIndex = el.groupIndex //来自group
    const text = el.text
    
    const click = () => {  //删除，得知道是第几组，第几个character
        // 这个逻辑对应reduce的结构和方法
        dispatch({type:'deleteCharacter',groupIndex,characterIndex})
    }
    return (<Character text={text} click={click}/>)
}

const mapStateToProps = (state) => {
    return {state}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterContainer)


