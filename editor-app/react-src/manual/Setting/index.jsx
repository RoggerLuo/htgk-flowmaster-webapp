import React from 'react'
import { connect } from 'react-redux'
import Pre from './Pre'
const ManualSetting = ({ put, currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const oncheckFactory = key => () => rdx.put('manual','replace',[key],!currentRepo[key])
    const data = [
        {
            title:'允许退回发起人',
            oncheck:oncheckFactory('backToStarter'),
            checked:currentRepo.backToStarter||false,
            defaultValue:'退回发起人',
            inputValue:currentRepo.backToStarterText,
            onchange(e){
                dispatch({type:'approve/change',key:'backToStarterText',value:e.target.value||'退回发起人'})
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
                dispatch({type:'approve/change',key:'backToLastText',value:e.target.value||'退回上一节点审批人'})
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
                dispatch({type:'approve/change',key:'allowForceEndText',value:e.target.value||'强制结束流程'})
                activeSave()             
            }
        }
    ]
    return(
        <div>
            {data.map((el,index)=>{
                return (<Pre {...el} index={index} key={index} />) 
            })}
        </div>)
}

export default global.connect2redux('manual',ManualSetting)

