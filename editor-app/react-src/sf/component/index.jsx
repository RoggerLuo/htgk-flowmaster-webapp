import React from 'react'
// import Dropdown from '../basicComp/Dropdown'
const Sf = ({ put, currentRepo }) => {
    if(!currentRepo) return null
    const shape = fm.currentSelectedShape
    // 1
    const options = window.processStatus.map(el=>({text:el.name,value:el.id}))
    // 2
    const selected = (item) => rdx.put('sf','replace',['businessStatus'],item,'object')
    // 3
    let selectedOption = currentRepo.businessStatus
    if(options.length == 0) selectedOption = { text:'暂无可选项',value:false }
    
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
export default rdx.connect('sf',rdx.i18nPut(Sf))
