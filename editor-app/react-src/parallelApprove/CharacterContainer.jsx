import React,{createClass} from 'react';
import Character from './presentation/Character/Character'
import './style'

/* 
    主要是把click的逻辑 组装好了， 还有拿出了text
*/
/*
    这样看来，一般的循环children结构，都可以这么干，
    只传入el和index， 再自己组装 方法 和 属性
*/

const CharacterContainer = ({el,index}) => {
    const characterIndex = index
    const groupIndex = el.groupIndex
    const text = el.text
    const click = () => {  //删除，得知道是第几组，第几个character
        // 对应reduce的方法
        dispatch({type:'deleteCharacter',groupIndex,characterIndex})
    }
    return (<Character text={text} click={click}/>)
}
export default CharacterContainer