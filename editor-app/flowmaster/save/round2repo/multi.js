export default (repo, shape) => {
    //   不通过要return true
    return repo.data.some((group) => {
        if (group.length === 0) {
            window.showAlert('"' + shape.properties['oryx-name'] + '"的审批人员设置不能为空') //审批节点
            fm.spotlight(shape)
            return true
        } else {
            return false
        }   
    })
}
