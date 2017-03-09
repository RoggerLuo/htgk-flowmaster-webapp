import React,{createClass} from 'react';

const Header = ({index,display,add,del,close,cancel,isDots,toggleMenu,put}) => {
    let dots = ''
    if(isDots){
        dots = (<span className="the3dots" onClick={toggleMenu}>•••</span>)

    }else{
        dots = (<span style={{color:'#00B1FD',marginRight:'8px'}} onClick={cancel}>{put('global.cancel')}</span>)

    }

    return (
        <div className="container-header">
            <span className="container-title">{put('branch.condition')}{index+1}</span> 
            {dots}
            <div className="rule-control" style={{display:display}}>
                <div className="options">
                    <div className="option" onClick={add}>{put('branch.menu.add')}</div>
                    <div className="option" onClick={del}>{put('branch.menu.del')}</div>
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