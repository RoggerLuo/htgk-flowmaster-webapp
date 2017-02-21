import React,{createClass} from 'react';
import { render } from 'react-dom'
import DialoguePopup from '../basicComp/DialoguePopup'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ConditionGroup from './conditionGroup'
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

const Options =   ({conditionDeleteStyle,id,dataRepo,prototype,mode}) => {

    if(mode == 'text'){
        return (<div><textarea /></div>)
    }else{
        if(conditionGroups.length == 0){
            return ''
        }else{
            return conditionGroups.map((el,index)=>{
                return (
                    <ConditionGroup {...{conditionDeleteStyle,conditionGroups,prototype,mode,el,index,addRule}} key={index}  />
                )
            })
        }
    }

}

const mapStateToProps = (state) => {
    return state.branch
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default function(){
    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('branchSequenceFlowComponent')
    );
}