import React from 'react'

export default function(reduceName){
    const UsertaskSetting = ({ currentRepo, dispatch }) => {
        if(!currentRepo) return null
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

