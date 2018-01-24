import React,{createClass} from 'react'
import getButtonList from './getButtonList'
import ViewComp from './ViewComp'

function ConfigComp({ xClass, confirm, children, put, existCate, groupInd, buttonMode,hidePrevious }){

    const config = () => getButtonList({confirm, existCate, groupInd, buttonMode,hidePrevious}) 
    
    const param = { xClass, put, config} //data,
    return (
        <ViewComp param={param}>
            {children}
        </ViewComp>
    )
}
export default rdx.i18nPut(ConfigComp)
