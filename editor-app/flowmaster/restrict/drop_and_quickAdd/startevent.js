export default function(selectedShape) {
    let branchCounter = 0
    selectedShape.outgoing.forEach(function(el) {
        branchCounter += 1
    })
    if (branchCounter >= 1) {
        window.showAlert('开始节点不能有其他分支')
        return false
    }
    return true
}