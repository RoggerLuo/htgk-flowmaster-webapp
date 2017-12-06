'use strict'
export default function(selectedShape) {
    // selected shape是 会签分支节点
    if (
        selectedShape.incoming[0] &&
        selectedShape.incoming[0].incoming[0] &&
        (selectedShape.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task')
    ) {
        let branchCounter = 0
        selectedShape.outgoing.forEach((el) => {
            branchCounter += 1
        })
        if (branchCounter >= 2) {
            window.showAlert('会签分支最多只能有两个分支')
            return false
        }
    }
    return true
}