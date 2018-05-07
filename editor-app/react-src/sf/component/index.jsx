import React from 'react'

const Sf = ({ selected, selectedOption, options }) => {
    const Dropdown = fm.common.Dropdown
    return(
        <div className="react-approve" >
            <div style={{height:'15px',width:'100%'}}></div>
            <div style={{fontWeight:'600'}}>业务状态</div>
            <div style={{height:'2px',width:'100%'}}></div>
            <Dropdown width={'200px'} margin={'0 0'} data={options||[]} choosedOption={selectedOption} choosed={selected} />
        </div>
    )
}

const Container = ({ currentRepo }) => {
    if(!currentRepo) return null
    // ..
    const options = window.processStatus //来自全局变量
        .map(el=>({ text: el.name, value: el.id }))
        .filter(el=>(['1003','1004','1005','1006','1007'].indexOf(el.value) == -1) )
    const selected = (item) => rdx.put('sf','replace',['businessStatus'],item,'object')
    const selectedOption = getSelectedOption(currentRepo,options)

    const props = { selected, selectedOption, options }
    return (<Sf {...props}/>)
}

function getSelectedOption(currentRepo,options){
    let selectedOption = currentRepo.businessStatus
    if(options.length == 0) selectedOption = { text:'暂无可选项',value:false }    
    if(!selectedOption.value){ // 如果还没有选择
        const shape = fm.currentSelectedShape
        if( //如果 连接的是结束节点 
            fm.getOutgoing(shape) && 
            (fm.getTitle(fm.getOutgoing(shape)) == 'End event' )
        ){
            selectedOption = { text: "审批通过", value:'1002' }
        }else{
            selectedOption = { text: "审批中", value:'1001' }
        }
    }
    return selectedOption
}

export default rdx.connect('sf',rdx.i18nPut(Container))

