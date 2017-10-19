'use strict'
global.limitingRuleOfAdding = function(option) {
    const selectedShape = option.connectedShape
    /* 如果是会签分支 */
    if (selectedShape && (selectedShape._stencil._jsonStencil.title == "Exclusive gateway")) {
        if (
            selectedShape.incoming[0].incoming[0] &&
            (selectedShape.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task')
        ){
            let branchCounter = 0
            selectedShape.outgoing.forEach((el) => {
                branchCounter += 1
            })
            if (branchCounter >= 2) {
                window.showAlert('会签分支最多只能有两个分支')
                return false
            }
        } 
    }
    /* sequnce flow 的限制 */
    if (option.connectedShape && (option.connectedShape._stencil._jsonStencil.title == 'Exclusive gateway')) {
        // window.showAlert('Exclusive gateway节点');
    }
    /* 开始节点的限制 */
    if (option.connectedShape && (option.connectedShape._stencil._jsonStencil.title == 'Start event')) {
        var branchCounter = 0;
        option.connectedShape.outgoing.forEach(function(el) {
            branchCounter += 1;
        });
        if (branchCounter >= 1) {
            window.showAlert('开始节点不能有其他分支');
            return false;
        }
    }

    /* 审批节点的限制 */
    if (option.connectedShape && (option.connectedShape._stencil._jsonStencil.title == 'User task')) {
        var branchCounter = 0;
        option.connectedShape.outgoing.forEach(function(el) {
            branchCounter += 1;
        })
        if (branchCounter >= 1) {
            window.showAlert('审批节点不能有其他分支')
            return false;
        }
    }
    if (option.connectedShape && (option.connectedShape._stencil._jsonStencil.title == 'Multi user task')) {
        var branchCounter = 0;
        option.connectedShape.outgoing.forEach(function(el) {
            // if (el._stencil._jsonStencil.title == 'Sequence flow'){
            branchCounter += 1;
            // }
        })
        if (branchCounter >= 1) {
            window.showAlert('会签节点不能有分支')
            return false;
        }
    }
    return true
}