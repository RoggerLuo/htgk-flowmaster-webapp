import React,{createClass} from 'react';
import { render } from 'react-dom'
import './style'

const SectionTitle = ({text,mode,add,del,cancel,put}) => {
    let rightSide=''
    if(mode == 'icon'){
        rightSide = (
            <span>
                <i className="icon qingicon icon-add" onClick={add}></i>
                <i className="icon qingicon icon-delete" onClick={del}></i>
            </span>
        )
    }else{
        rightSide = (<span style={{color:'#00B1FD'}} onClick={cancel}>{put('global.cancel')}</span>)
    }
    return (
        <div className="section-title">
            <span>{text}</span>
            {rightSide}
        </div>
    )
}
import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(SectionTitle)

export default ConnectedApp
