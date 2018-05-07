import React from 'react'
import Sf from './p'

const Container = ({ currentRepo }) => {
    if(!currentRepo) return null
    const options = window.processStatus //来自全局变量
        .map(el=>({ text: el.name, value: el.id }))
        .filter(el=>(['1003','1004','1005','1006','1007'].indexOf(el.value) == -1) )
    const selected = (item) => rdx.put('sf','replace',['businessStatus'],item,'object')
    const selectedOption = getSelectedOption(currentRepo,options)
    const props = { selected, selectedOption, options }
    return (<Sf {...props}/>)
}

function getSelectedOption(currentRepo,options){
    let selectedOption
    if(currentSelectedSf_connectedTo_EndEvent()){
        selectedOption = { text: "审批通过", value:'1002' }
    }else{
        selectedOption = { text: "审批中", value:'1001' }
    }
    if(currentRepo.businessStatus.value){
        selectedOption = currentRepo.businessStatus
    }
    if(!selectedOption.text) throw 'option should have a text prop'
    if(!selectedOption.value) throw 'option should have a value prop'
    return selectedOption
}

function currentSelectedSf_connectedTo_EndEvent(){ //如果 连接的是结束节点 
    const shape = fm.currentSelectedShape
    return fm.getOutgoing(shape) && (fm.getTitle(fm.getOutgoing(shape)) == 'End event')
}

export default rdx.connect('sf',rdx.i18nPut(Container))

