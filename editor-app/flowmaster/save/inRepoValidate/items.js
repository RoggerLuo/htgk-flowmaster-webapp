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
        method:usertaskPattern
    },
    {
        name: 'manual',
        method:usertaskPattern
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
    /* 不通过返回true */
    if (repo.data.length === 0) {
        window.showAlert('"' + shape.properties['oryx-name'] + '"的传阅人员设置不能为空') //审批节点
        fm.spotlight(shape)
        return false
    } else {
        return true
    }
}

function usertaskPattern(repo, shape){
    // 不通过要return true
    if (repo.data.length === 0) {
        fm.save.rolesEmptyWarning(shape)
        return false
    } else {
        return true
    }   
}
