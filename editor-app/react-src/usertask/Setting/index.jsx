import React from 'react'
import { connect } from 'react-redux'
import Pre from './Pre'
const UsertaskSetting = ({ put, currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const oncheckFactory = key => {
        return () => {
            if(fm.versionModel) return
            rdx.put('usertask','replace',[key],!currentRepo[key])
        }
    }
    let data = [
        {
            title:'允许退回发起人',
            oncheck:oncheckFactory('backToStarter'),
            checked:currentRepo.backToStarter||false,
            defaultValue:'退回发起人',
            inputValue:currentRepo.backToStarterText,
            onchange(e){
                if(fm.versionModel) return
                dispatch({type:'usertask/change',key:'backToStarterText',value:e.target.value||'退回发起人'})
                activeSave()             
            }
        },
        {
            title:'允许退回上一节点审批人',
            oncheck:oncheckFactory('backToLast'),
            checked:currentRepo.backToLast||false,
            defaultValue:'退回上一节点审批人',
            inputValue:currentRepo.backToLastText,
            onchange(e){
                if(fm.versionModel) return
                dispatch({type:'usertask/change',key:'backToLastText',value:e.target.value||'退回上一节点审批人'})
                activeSave()             
            }
        },
        {
            title:'允许强制结束流程',
            oncheck:oncheckFactory('allowForceEnd'),
            checked:currentRepo.allowForceEnd||false,
            defaultValue:'强制结束流程',
            inputValue:currentRepo.allowForceEndText,
            onchange(e){
                if(fm.versionModel) return
                dispatch({type:'usertask/change',key:'allowForceEndText',value:e.target.value||'强制结束流程'})
                activeSave()             
            }
        }
    ]
    if(fm.isCurrentShapeInGates){
        data = [data[1]]
        if(!fm.isIncomingShapeUsertask){
            data = []
        }
    }
    return(
        <div>
            {data.map((el,index)=>{
                return (<Pre {...el} index={index} key={index} />) 
            })}
        </div>)
}

export default global.connect2redux('usertask',UsertaskSetting)

