import React,{createClass} from 'react';
import { connect } from 'react-redux'

const Radios = ({mode1,mode2}) => {
    return (
        <div className="radio-box">
            <label className="radio-lable">
                <input onClick={mode1} className="radio" name="condition" type="radio" value="" />
                手动选择 
            </label> 
            <label className="radio-lable">
                <input onClick={mode2} className="radio" name="condition" type="radio" value="" />
                编写公式 
            </label> 
        </div>)
}
const mapStateToProps = (state) => {
    return {state}
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
const RadiosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Radios)

export default RadiosContainer