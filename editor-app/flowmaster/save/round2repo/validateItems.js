import multi from './multi'

// 不通过要return true
export default [
    {
        name: 'circulation',
        method(repo, shape) {
            /* 不通过返回false */
            if (repo.data.length === 0) {
                window.showAlert('"' + shape.properties['oryx-name'] + '"的传阅人员设置不能为空') //审批节点
                fm.spotlight(shape)
                return true
            } else {
                return false
            }
        }
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
]

function usertaskPattern(repo, shape){
    // 不通过要return true
    if (repo.data.length === 0) {
        window.showAlert('"' + shape.properties['oryx-name'] + '"的审批人员设置不能为空') //审批节点
        fm.spotlight(shape)
        return true
    } else {
        return false
    }   
}