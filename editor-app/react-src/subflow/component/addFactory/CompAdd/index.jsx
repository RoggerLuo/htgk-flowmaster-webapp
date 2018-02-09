import React from 'react'
import Group from './Group'

const dataProducer = (list) => {
    const data = []
    const currentPid = window.getQueryString("pid")

    window.processCategory.forEach(el=>{
        const dataFromList = list
            .filter(el2 => el2.status == 'Normal')
            .filter(el2 => el2.id != currentPid)
            .filter(el2 => el2.categoryName == el.name)
            .map(el2 => (
                {
                    versionId:el2.versionId,
                    text:el2.name,
                    value:el2.id,
                    checked:false
                }
            ))
        data.push({groupTitle:el.name,data:dataFromList})
    })
    data.forEach(el=>{
        if(el.groupTitle == 'defaultCategory') el.groupTitle = "默认分类"
    })

    //暂时兼容null
    data.forEach(el=>{
        if(el.groupTitle == "默认分类"){
            const nullList = list
                .filter(el2=>el2.categoryName === null)
                .filter(el2 => el2.status == 'Normal')
                .filter(el2 => el2.id != currentPid)
                .map(el2 => (
                    {
                        versionId:el2.versionId,
                        text:el2.name,
                        value:el2.id,
                        checked:false
                    }
                ))            
            el.data = [...el.data,...nullList]
        }
    })
    return data
}

const AddComp = ({ currentRepo, put, add }) => {
    if(!currentRepo) return null
    const data = dataProducer(global.processList)    
    return(
        <div className="add-subflow" style={{width:'520px'}}>
            {data.map((el,ind)=><Group key={ind} index={ind} data={el}/>)}
            <div style={{height:'12px',width:'1px'}}></div>
            <div style={{height:'50px'}}></div>
        </div>
    )
}

export default rdx.connect('subflow',rdx.i18nPut(AddComp))
