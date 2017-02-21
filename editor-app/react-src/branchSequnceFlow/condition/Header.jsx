import React,{createClass} from 'react';

const Header = ({index,display,add,del,close,cancel,isDots,toggleMenu}) => {
    let dots = ''
    if(isDots){
        dots = (<span className="the3dots" onClick={toggleMenu}>•••</span>)

    }else{
        dots = (<span style={{color:'#00b0ff',marginRight:'8px'}} onClick={cancel}>取消</span>)

    }

    return (
        <div className="container-header">
            <span className="container-title">条件{index+1}</span> 
            {dots}
            <div className="rule-control" style={{display:display}}>
                <div className="options">
                    <div className="option" onClick={add}>添加规则</div>
                    <div className="option" onClick={del}>删除规则</div>
                </div>
            </div>
            <div onClick={close} style={{display:display}} className="big-cover" ></div>
        </div>
    )
}

export default Header