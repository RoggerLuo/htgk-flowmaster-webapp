import multi from './multi'
import branchSf from './branchSf'
// 所有的通过 return true
export default [
    {
        name: 'circulation',
        method: circulation
    },
    {
        name: 'usertask',
        method: usertaskPattern
    },
    {
        name: 'manual',
        method: usertaskPattern
    },
    {
        name: 'multi',
        method: multi
    },
    {
        name: 'branch',
        method: branchSf
    },
    {
        name: 'sf',
        method: sf
    }
]

function sf(repo,shape){
    return fm.sf.statusStrategy(shape,(describe)=>{
        if(!repo.businessStatus.value){
            describe(shape)
            return false
        }else{
            return true
        }
    })
}

function circulation(repo,shape){
    if (repo.data.length === 0) {
        window.showAlert('"' + shape.properties['oryx-name'] + '"的传阅人员设置不能为空') //审批节点
        fm.spotlight(shape)
        return false
    } else {
        return true
    }
}

function usertaskPattern(repo, shape){
    
    if(repo.hasProcessTimeOut) {
        if(!repo.processTime || !repo.rangeTalkTime) {
            window.showAlert('流程超时预警不能为空')
            return false
        }
    }

    if (repo.data.length === 0) {
        fm.save.rolesEmptyWarning(shape)
        return false
    } else {
        return true
    }   
}
