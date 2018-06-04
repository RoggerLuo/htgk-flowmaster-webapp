import ifNotInRepo from './ifNotInRepo'
export default function(shape){
    if(fm.branchSf.is(shape)){
        return ifNotInRepo('branch',shape,()=>{ //如果不在repo中，又是branchSf，肯定验证不通过
            fm.branchSf.emptyWarning(shape)
            return false
        })
    }
    return ifNotInRepo('sf',shape,()=>{
        return fm.sf.statusStrategy(shape,(describe)=>{ //如果不在repo中，肯定没有业务状态，不通过
            autoDefaultBusStatus(shape)            
            return true
        })
    })
}

function autoDefaultBusStatus(shape){
    // 自动给予默认值
    let selectedOption
    if(connectedToEndEvent()){
        selectedOption = { text: "审批通过", value:'1002' }
    }else{
        selectedOption = { text: "审批中", value:'1001' }
    }
    
    rdx.dispatch({ type: 'sf/all/defaultForSave', id: shape.resourceId, businessStatus: selectedOption })
    
    // rdx.put('sf','replace',['businessStatus'],selectedOption,'object')
    function connectedToEndEvent(){
        return fm.getOutgoing(shape) && (fm.getTitle(fm.getOutgoing(shape)) == 'End event')
    }   
}

// describe(shape)
// return false
