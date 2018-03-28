export default (repo, shape) => {
    //   通过 return true
    return repo.data.some((group) => {
        if (group.length === 0) {
            window.showAlert('"' + shape.properties['oryx-name'] + '"的审批人员设置不能为空') //审批节点
            fm.spotlight(shape)
            return false
        } else {
            return true
        }   
    })
}
