'use strict';

window.globalEvent =  window.globalEvent || {}
window.globalEvent.checkEmpty =  window.globalEvent.checkEmpty || {}

window.globalEvent.checkEmpty = ($scope) => {
    let returnValue = false
    var json = $scope.editor.getJSON();
    return json.childShapes.some((el,index)=>{

        if(el.outgoing.length == 0){
            if(el.stencil.id != 'EndNoneEvent' && el.stencil.id != 'EndErrorEvent'){
                window.showAlert('请连接上所有的节点')
                return true
            }
        }

        switch(el.stencil.id){
            case 'EndNoneEvent':
                // el.incoming.length

            break
            case 'StartNoneEvent':
                if(el.outgoing.length == 0){
                    window.showAlert('请连接上开始节点')
                    returnValue = true
                    return true
                }
            break
            case 'ExclusiveGateway':
                if(el.outgoing.length <2){
                    window.showAlert('使用分支节点需要两个以上的分支')
                    return true
                }
            break
            case 'UserTask':
                if(!el.properties.usertaskassignment){
                    window.showAlert('审批节点内容不能为空')
                    return true
                }

                if(el.properties.usertaskassignment && el.properties.usertaskassignment.assignment && (el.properties.usertaskassignment.assignment.candidateOwners.length == 0)){
                    window.showAlert('审批节点内容不能为空')
                    return true
                }

            break

            case 'MultiUserTask':
                if(!el.properties.multiinstance_parties){
                    window.showAlert('会签节点内容不能为空')
                    return true
                }

                if(el.properties.multiinstance_parties.length == 0){
                    window.showAlert('会签节点内容不能为空')
                    return true
                }

                if((el.properties.multiinstance_parties.length == 1)&&(el.properties.multiinstance_parties[0] == 0)){
                    window.showAlert('会签节点内容不能为空')
                    return true
                }

            break
        }
    })
}

