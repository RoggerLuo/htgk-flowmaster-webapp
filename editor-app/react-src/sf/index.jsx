import React from 'react'
import Dropdown from '../basicComp/Dropdown'

const Sf = ({ put,currentRepo }) => {
    if(!currentRepo) return null

    const shape = fm.currentSelectedShape
    
    if (fm.multi.is.sf(shape)) return null

    if (fm.manual.is.sfInTheMiddle(shape)) return null
    if (fm.multi.is.sfInTheMiddle(shape)) return null
    if(fm.next.is("Exclusive gateway")) return null
    if(fm.next.is("Circulation task")) return null
    if(fm.isCurrentShapeInGates) return null    


    const options = window.processStatus.map(el=>{
        return {
            text:el.name,
            value:el.id
        }
    })
    const selected = (item) => rdx.put('sf','replace',['businessStatus'],item,'object')
    let selectedOption = currentRepo.businessStatus
    if(options.length == 0) selectedOption = {text:'暂无可选项',value:false}
    return(
        <div className="react-approve" >
            <div style={{height:'15px',width:'100%'}}></div>
            <div style={{fontWeight:'600'}}>业务状态</div>
            <div style={{height:'2px',width:'100%'}}></div>

            <Dropdown width={'200px'} margin={'0 0'} data={options||[]} choosedOption={selectedOption} choosed={selected} />
        </div>
    )
}
const SfContainer = rdx.connect('sf',rdx.i18nPut(Sf))
fm.statusSf = SfContainer
