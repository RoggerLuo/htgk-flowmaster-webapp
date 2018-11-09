import React from 'react'
import Pre from './Pre'
import backToLastControl from './backToLastControl'
import ifInGates from './ifInGates'

export default function(reduceName){
    const UsertaskSetting = ({ currentRepo, dispatch }) => {
        if(!currentRepo) return null
        const oncheckFactory = key => {
            return () => {
                if(fm.isSpecificVersionEditMode) return
                rdx.put(reduceName,'replace',[key],!currentRepo[key])
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
                    if(fm.isSpecificVersionEditMode) return
                    rdx.put(reduceName,'replace',['backToStarterText'],e.target.value||'')
                }
            },
            {
                title:'允许退回上一节点审批人',
                oncheck:oncheckFactory('backToLast'),
                checked:currentRepo.backToLast||false,
                defaultValue:'退回上一节点审批人',
                inputValue:currentRepo.backToLastText,
                onchange(e){
                    if(fm.isSpecificVersionEditMode) return
                    rdx.put(reduceName,'replace',['backToLastText'],e.target.value||'')
                }
            },
            {
                title:'允许强制结束流程',
                oncheck:oncheckFactory('allowForceEnd'),
                checked:currentRepo.allowForceEnd||false,
                defaultValue:'强制结束流程',
                inputValue:currentRepo.allowForceEndText,
                onchange(e){
                    if(fm.isSpecificVersionEditMode) return
                    rdx.put(reduceName,'replace',['allowForceEndText'],e.target.value||'')
                }
            }
        ]
        data = ifInGates(data)
        data = backToLastControl(data)

        const timeoutOnChange = (e,field) => {
            function isInteger(obj) {
             return obj%1 === 0
            }

            let value = e.target.value
            if(!value) {
                rdx.put(reduceName,'replace',[field],'')            
                return
            }
            if(value.indexOf('.')!==-1) {
                window.showAlert('只能输入整数')
                return                
            }
            if(!isNaN(value) && isInteger(value)) {
                rdx.put(reduceName,'replace',[field],value)            
            }else{
                window.showAlert('只能输入整数')
            }
        }

        return(
            <div style={{fontSize:'13px',lineHeight:'1.5'}}>
                {data.map((el,index)=>{
                    return (<Pre {...el} index={index} key={index} />) 
                })}


                <div>
                    {'流程超时预警'}&nbsp;
                    <input type='checkbox' value={currentRepo.hasProcessTimeOut||''} checked={currentRepo.hasProcessTimeOut||''} onChange={e=>{rdx.put(reduceName,'replace',['hasProcessTimeOut'],!currentRepo.hasProcessTimeOut) } } />
                    <br/>
                </div>
                <div>
                    该节点的审批人员需要在 
                    &nbsp;
                    <input className="border-hover" onChange={e=>timeoutOnChange(e,'processTime')} value={currentRepo.processTime||''} style={{width:'30px',height:'25px',lineHeight:'25px',outline:'none',border: '1px solid #DDDDDD',fontSize:'12px',padding:'0 3px'}} />
                    &nbsp;小时内完成审批
                </div>

                <div>
                    流程超时后，每间隔
                    &nbsp;
                    <input className="border-hover" onChange={e=>timeoutOnChange(e,'rangeTalkTime')} value={currentRepo.rangeTalkTime||''} style={{width:'30px',height:'25px',lineHeight:'25px',outline:'none',border: '1px solid #DDDDDD',fontSize:'12px',padding:'0 3px'}} />
                    &nbsp;
                    小时向审批人员发送流程审批提醒消息
                </div>

            </div>
        )
    }

    return rdx.connect(reduceName,UsertaskSetting)
}

