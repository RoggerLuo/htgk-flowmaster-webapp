import React,{createClass} from 'react';

/* 字典
    startRuleDeleteStatus    跟ruleMode有关
    cancelRuleDeleteStatus  跟ruleMode有关
    isDots  跟ruleMode有关

    display 来自ConditionContainer.state.menuDisplay
    toggleMenu 来自ConditionContainer.state.menuDisplay
    close 来自ConditionContainer.state.menuDisplay

    index
    addRule

    ------------
    put 从插件中来


*/
const Header = ({index,display,addRule,startRuleDeleteStatus,close,cancelRuleDeleteStatus,isDots,toggleMenu,put}) => {
    let dots = ''
    if(isDots){
        dots = (<span className="the3dots" onClick={toggleMenu}>•••</span>)

    }else{
        dots = (<span style={{cursor:'pointer',color:'#00B1FD',marginRight:'8px'}} onClick={cancelRuleDeleteStatus}>
            {put('global.cancel')}
        </span>)
    }

    return (
        <div className="container-header">
            <span className="container-title">{put('branch.condition')}{index+1}</span> 
            {dots}
            <div className="rule-control" style={{display:display}}>
                <div className="options">
                    <div className="option" onClick={addRule}>{put('branch.menu.add')}</div>
                    <div className="option" onClick={startRuleDeleteStatus}>{put('branch.menu.del')}</div>
                </div>
            </div>
            <div onClick={close} style={{display:display}} className="big-cover" ></div>
        </div>
    )
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Header)

export default ConnectedApp
