import React,{createClass} from 'react';

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

export default Radios