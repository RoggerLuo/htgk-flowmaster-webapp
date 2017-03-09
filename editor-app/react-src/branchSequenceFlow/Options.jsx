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

const Options =   ({conditions,radio,put}) => {
    if(radio == 'text'){
        return (
            <div>
                <div contentEditable
                    style={{padding:'5px',outline:'none',border:'1px solid #ccc',width:'100%',height:'100px'}} 
                    onKeyUp={onkeyup}
                ></div>
                <div className="section-title">{put('branch.remark.title')}</div>
                <div className="section-content" style={{}}>
                    <p>{put('branch.remark.content3')}</p>
                    <p>{put('branch.remark.content4')}</p>
                    <p>{put('branch.remark.content5')}</p>
                    <p>{put('branch.remark.content6')}</p>
                    <p>{put('branch.remark.content7')}</p>
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
                    <div className="section-title">{put('branch.remark.title')}</div>
                    <div className="section-content">
                        {put('branch.remark.content1')}<br/>
                        {put('branch.remark.content2')}
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

import connectPut from 'react-put'
const putOptions = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(putOptions)(Options)


const OptionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)

export default OptionsContainer

