import React,{createClass} from 'react';
import { render } from 'react-dom'

import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ConditionContainer from './condition/Container'
import './style'
import {regFactor,moveCursorToEnd} from './regAlgorithm'

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

const options = ["#性别","#职级",'#test']
const regBlue = regFactor(options,'#00b0ff')

const onkeyup = (event) => {
    console.log('up' +Date.parse(new Date()))
    const obj = event.target
    

    if(regBlue.regular.test(obj.innerHTML)){
        obj.innerHTML = obj.innerHTML.replace(regBlue.regular,regBlue.replace)
        moveCursorToEnd(obj)
    }
    
    /* 这个是为了不让光标进入span里面，自动加空格 */
    const patt2 = /(&nbsp;)(<\/span>)/gi
    if(patt2.test(obj.innerHTML)){
        obj.innerHTML = obj.innerHTML.replace(patt2,"$2&nbsp;")
        moveCursorToEnd(obj)
    }

}
const Options =   ({conditions,radio}) => {
    if(radio == 'text'){
        return (
            <div>
                <div contentEditable
                    style={{padding:'5px',outline:'none',border:'1px solid #ccc',width:'100%',height:'100px'}} 
                    onKeyUp={onkeyup}
                ></div>
                <div className="section-title">说明：</div>
                <div className="section-content" style={{}}>
                    <p>1、$字段名称来标识表单字段，若无法找到对应系统会显示红色；</p>
                    <p>2、#人员属性来标识发起人的参数，支持参数有：性别、职级等，以个人资料中的信息字段为准，若无法找到对应系统会显示红色；</p>
                    <p>3、%date来标识当前日期</p>
                    <p>{"4、支持基础的计算公式，如：∑、+、-、*、/、>、>=、==、<、<=、AND、OR等；"}</p>
                    <p>5、请使用英文的字符，文字除外。</p>
                </div>
            </div>
        )
    }else{
        if(conditions.length == 0){
            return (<div></div>)
        }else{
            
            return (
                <div>
                    {conditions.map((el,index)=>{
                        return (<ConditionContainer index={index} key={index}/>)
                    })}
                    <div className="section-title">说明：</div>
                    <div className="section-content">
                        条件与条件间是“或”的关系<br/>
                        规则与规则间是“与”的关系
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const elementFound = state.branch.dataRepo.filter((el,index)=>{
        return el.id == state.branch.id
    })
    const conditions = elementFound[0] && elementFound[0].conditions || []
    return {conditions,radio:state.branch.radio}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const OptionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Options)
export default OptionsContainer

