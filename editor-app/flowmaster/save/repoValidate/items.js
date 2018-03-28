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
    return fm.save.sfStatusStrategy(shape,()=>{
        debugger
        if(!repo.businessStatus.value){
            fm.spotlight(shape)
            if(!shape.properties["oryx-name"]){
                window.showAlert(`<span style="color:orange">连线</span>业务状态未设置`)
            }else{
                window.showAlert(`连线<span style="color:orange">"${shape.properties["oryx-name"]}"</span>业务状态未设置`)
            }
            return false
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
        window.showAlert('"' + shape.properties['oryx-name'] + '"的审批人员设置不能为空') //审批节点
        fm.spotlight(shape)
        return false
    } else {
        return true
    }   
}
