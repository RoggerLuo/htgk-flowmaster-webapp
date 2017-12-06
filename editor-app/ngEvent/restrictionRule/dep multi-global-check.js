global.multiCompleteCheck = function() {
    window.getRawJson().childShapes.some((el, index) => {
        if (global.globalLockForMultiWarning) return
        if (el.stencil.id == 'MultiUserTask') {
            const MultiUserTask = window.windowCanvas.getChildShapeByResourceId(el.resourceId)
            if (!MultiUserTask.outgoing[0]) {
                window.showAlert('会签节点不能单独存在，请连接上分支节点')
                return
            }
            if (!MultiUserTask.outgoing[0].outgoing[0]) {
                window.showAlert('会签节点不能单独存在，请连接上分支节点')
                return
            }
            if (MultiUserTask.outgoing[0].outgoing[0]._stencil._jsonStencil.title != "Exclusive gateway") {
                window.showAlert('会签节点只能连接分支节点')
                return
            }
        }
    })
}