import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import Group from './Group'
import { connect } from 'react-redux'

const AddComp = ({ currentRepo, put, add }) => {
    if(!currentRepo) return null
    const data = []
    window.processList.forEach((el)=>{
        if(!el.categoryName) el.categoryName = "defaultCategory"
        if(!data.some(ele=>ele.groupTitle==el.categoryName)){
            data.push({groupTitle:el.categoryName})
        }
    })
    data.forEach(el=>{
        el.data = window.processList
            .filter(ele=>ele.categoryName==el.groupTitle)
            .map(ele=>({
                versionId:ele.versionId,
                text:ele.name,
                value:ele.id,
                checked:false
            }))
    })
    return(
        <div className="add-subflow" style={{width:'520px'}}>
            {data.map((el,ind)=><Group key={ind} index={ind} data={el}/>)}
            <div style={{height:'12px',width:'1px'}}></div>

            <div>已选择</div>
            <SolidFrame>
                <div style={{height:'50px'}}>{currentRepo.subProcess&&currentRepo.subProcess.name||''}</div>
            </SolidFrame>
            <div style={{height:'50px'}}></div>
        </div>
    )
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(AddComp)

export default global.connect2redux('subflow',ConnectedApp)
