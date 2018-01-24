import React from 'react'
import Dropdown from '../../../basicComp/Dropdown'
import { connect } from 'react-redux'
import PartRight from '../Form/PartRight'
import PartLeft from '../Form/PartLeft'

const Group = ({ leftData, currentRepo, dispatch }) => {
    
    const mainRight = currentRepo.mainRight || {}

    const selectedOption = mainRight[leftData.name] || { text: '请选择', value: false }
    
    let optionsData = window.formPropertiesTotal || []
    optionsData = optionsData.filter(el=> (el.subform_type == leftData.type) || (!el.value) )

    const select = (item, optionInd) => {
        dispatch({ type: 'subflow/mainRight', fieldId: leftData.name, item })
    }

    return (    
        <div style={{display:'flex',justifyContent: 'space-between', height: '41px'}}>
            <PartLeft title={leftData.title}/>
            <PartRight selectedOption={selectedOption} optionsData={optionsData} select={select}></PartRight>
        </div>
    )
}
export default global.connect2redux('subflow', Group)