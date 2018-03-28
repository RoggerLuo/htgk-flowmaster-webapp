import isBranch from './isBranch'
import isSf,{ describ } from './isSf'
// import repoDispatcher from './repoDispatcher'
const factory = {
    'Sequence flow'(shape){
        if(isBranch(shape)){
            const isInBranch = rdx.getState().branch.repo.some(_shape=>shape.resourceId === _shape.resourceId)
            if(!isInBranch){
                window.showAlert('保存失败，节点"' + fm.getIncoming(shape).properties['oryx-name'] + '"的分支条件和规则不能为空')
                fm.spotlight(shape)
                return false
            }else{
                return true
            }
        }
        if(isSf(shape)){
            const isIn = rdx.getState().sf.repo.some(_shape=>shape.resourceId === _shape.resourceId)
            if(!isIn){
                describ(shape)
                return false
            }else{
                return true
            }
        }
        // 先判断哪一个都没关系，都很健壮
        // const isIn = rdx.getState().sf.repo.some(_shape=>shape.resourceId === _shape.resourceId)
        // if(!isIn){
        //     if(sfNotInit(shape)){
        //         return false
        //     }
        // }
        // const isInBranch = rdx.getState().branch.repo.some(_shape=>shape.resourceId === _shape.resourceId)
        // if(!isInBranch){
        //     debugger
        //     if(branchNotInit(shape)){
        //         return false 
        //     }
        // }
        return true  
    },
}

export default factory



/*'Multi user task'(shape){
    
    const multi_parties = shape.properties.multiinstance_parties
    debugger
    if (
        (!multi_parties) ||
        (multi_parties.length == 0) ||
        ((multi_parties.length == 1) && (multi_parties[0] == 0))
    ) {
        window.showAlert('"' + shape.properties['oryx-name'] + '"内容不能为空')
        fm.spotlight(shape)
        return true
    }else{
        return false    
    }
},*/