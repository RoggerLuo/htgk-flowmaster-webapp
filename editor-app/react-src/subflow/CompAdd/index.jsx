import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import Group from './Group'
import { connect } from 'react-redux'

const AddComp = ({ currentRepo, put, add }) => {
    if(!currentRepo) return null
    const data = []
    global.processList.forEach((el)=>{
        if(!el.categoryName){
            el.categoryName = 'defaultCategory' //"默认分类" //  
        }else{
            if(el.categoryName == 'defaultCategory') return
            const isGroupExist = data.some(ele => ele.groupTitle==el.categoryName)
            if(!isGroupExist){
                data.push({groupTitle:el.categoryName})                
            }            
        }
    })
    data.reverse()
    data.unshift({groupTitle:'defaultCategory'})
    data.forEach(el=>{
        el.data = window.processList
            .filter(ele => ele.categoryName == el.groupTitle)
            .map(ele=>({
                versionId:ele.versionId,
                text:ele.name,
                value:ele.id,
                checked:false
            }))
    })
    data.forEach(el=>{
        if(el.groupTitle == 'defaultCategory') el.groupTitle = "默认分类"
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

export default rdx.connect('subflow',ConnectedApp)
