import React from 'react'
import configMan from './configMan'
import ViewComp from './ViewComp'

function ConfigComp({ xClass, onConfirm, children, put, existCate, groupInd, buttonMode, isEmpty}){ //hidePrevious
    
    if(['form','historicTask','fromDb','callBack'].indexOf(existCate) != -1){
        if(!isEmpty) return null
    }
    const config = () => configMan({onConfirm, existCate, groupInd, buttonMode})  //hidePrevious    
    const param = { xClass, put, config} //data,
    return (<ViewComp param={param}>{children}</ViewComp>)
}

export default rdx.i18nPut(ConfigComp)
