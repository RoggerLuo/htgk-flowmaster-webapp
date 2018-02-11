export default function(multiShape) {
    if (!multiShape.outgoing[0]) {
        window.showAlert('会签节点不能单独存在，请连接上分支节点')
        fm.undo()
        return
    }
    if (!multiShape.outgoing[0].outgoing[0]) {
        window.showAlert('会签节点不能单独存在，请连接上分支节点')
        fm.undo()
        return
    }
    if (multiShape.outgoing[0].outgoing[0]._stencil._jsonStencil.title != "Exclusive gateway") {
        window.showAlert('会签节点只能连接分支节点')
        fm.undo()
        return
    }
}