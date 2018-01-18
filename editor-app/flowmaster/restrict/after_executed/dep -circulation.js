
export default function(shape) {
    var branchCounter = 0
    shape.outgoing.forEach((el) => {branchCounter += 1})
    if (branchCounter >= 1) {
        window.showAlert('传阅节点不能有其他分支')
        return false
    }
    return true
}

