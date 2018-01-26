'use strict'
export default ($scope) => { //checkEmpty
    let returnValue = false
    var json = window.getRawJson() //$scope.editor.getJSON()
    return json.childShapes.some((el, index) => {
        switch (el.stencil.id) {
            case 'EndNoneEvent':
                // el.incoming.length

                break
            case 'StartNoneEvent':
                if (el.outgoing.length == 0) {
                    window.showAlert('请连接上开始节点')
                    returnValue = true
                    return true
                }
                break
            case 'ExclusiveGateway':
                if (el.outgoing.length < 2) {
                    window.showAlert('使用分支节点需要两个以上的分支')
                    return true
                }
                break
            case 'CirculationTask':
                const rolesjson = el.properties.objData
                if(rolesjson.length == 0){
                    window.showAlert('"' + el.properties.name + '"的审批人员设置不能为空') //传阅节点
                    return true
                }
                break
            case 'ManualTask':
            case 'UserTask':
                const ta = el.properties.usertaskassignment
                if (!ta) {
                    window.showAlert('"' + el.properties.name + '"的审批人员设置不能为空') //审批节点
                    return true
                }
                if (ta && ta.assignment && (ta.assignment.candidateOwners.length == 0)) {
                    window.showAlert('"' + el.properties.name + '"的审批人员设置不能为空') //审批节点
                    return true
                }
                break

            case 'MultiUserTask':
                if (!el.properties.multiinstance_parties) {
                    window.showAlert('"' + el.properties.name + '"内容不能为空') //审批节点
                    return true
                }

                if (el.properties.multiinstance_parties.length == 0) {
                    window.showAlert('"' + el.properties.name + '"内容不能为空') //审批节点
                    return true
                }

                if ((el.properties.multiinstance_parties.length == 1) && (el.properties.multiinstance_parties[0] == 0)) {
                    window.showAlert('"' + el.properties.name + '"内容不能为空') //会签节点
                    return true
                }
                break
        }
    })
}