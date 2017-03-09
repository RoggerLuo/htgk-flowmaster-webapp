import React,{createClass} from 'react';
import { connect } from 'react-redux'

const Radios = ({mode1,mode2,radio,put}) => {
    let view = ''
    if(radio=="text"){
        view = (
            <div className="radio-box">
                <label className="radio-lable" onClick={mode1}>
                    <span className="radio-img"><img width="20" height="20" src="editor-app/react-src/branchSequenceFlow/unselected.png" /></span>
                    <span className="radio-text">{put('branch.radio.manual')}</span> 
                </label> 
                <label className="radio-lable" >
                    <span className="radio-img"><img width="20" height="20" src="editor-app/react-src/branchSequenceFlow/selected.png" /></span>
                    <span className="radio-text">{put('branch.radio.formula')}</span> 
                </label> 
            </div>
        )
    }else{
        view = (
            <div className="radio-box">
                <label className="radio-lable">
                    <span className="radio-img"><img width="20" height="20" src="editor-app/react-src/branchSequenceFlow/selected.png" /></span>
                    <span className="radio-text">{put('branch.radio.manual')}</span> 
                </label> 
                <label className="radio-lable" onClick={mode2}>
                    <span className="radio-img"><img width="20" height="20" src="editor-app/react-src/branchSequenceFlow/unselected.png" /></span>
                    <span className="radio-text">{put('branch.radio.formula')}</span> 
                </label>  
            </div>
        )
    }

    return view
}
const mapStateToProps = (state) => {
    return {radio:state.branch.radio}
}
const mapDispatchToProps = (dispatch) => {
    const mode1 =()=>{
        dispatch({type:'switchRadio',value:'dropdown'})
    }
    const mode2 =()=>{
        dispatch({type:'switchRadio',value:'text'})
    }
    return {mode1,mode2}
}


import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Radios)



const RadiosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)

export default RadiosContainer