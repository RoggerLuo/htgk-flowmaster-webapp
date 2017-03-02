import React,{createClass} from 'react';
import { render } from 'react-dom'

import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ConditionContainer from './condition/Container'
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

const onkeyup = (event) => {
    console.log('up' +Date.parse(new Date()))
    const obj = event.target
    // obj.innerHTML = obj.innerHTML.replace(/[^>](#任意)|(#审批)|(#可)/gi,"<font color=red>$1$2$3</font>")
    // var patt1 = /[^>](#任意)|(#审批)|(#可)/gi //new RegExp("W3School");
    // debugger
    // var result = patt1.test(obj.innerHTML);
    var len = obj.innerHTML.length; 
}
const Options =   ({conditions,radio}) => {
    if(radio == 'text'){
        return (
            <div>
                <div contentEditable
                    style={{padding:'5px',outline:'none',border:'1px solid #ccc',width:'100%',height:'100px'}} 
                    onKeyUp={onkeyup}
                ></div>
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

