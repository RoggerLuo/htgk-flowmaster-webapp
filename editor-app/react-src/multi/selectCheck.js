export function multiSelectCheck(selectedShape) {
    let outgoingIsExclusivegate = true
    let branchCounter = 0
    selectedShape.outgoing.forEach(function(el) {
        branchCounter += 1
    })
    if (branchCounter >= 2) { //为什么是1呢，因为这一次的还没有添加上去，如果之前就是1了，那么就来不及
        window.showAlert('会签节点不能有分支')
        return false
    }
    return outgoingIsExclusivegate
}

export function gatewaySelectCheck(shape) {
    // if (
    //     selectedShape.incoming[0] &&
    //     selectedShape.incoming[0].incoming[0] &&
    //     (selectedShape.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task')
    // ) {
    if(fm.multi.is.gateway(shape)){
        let branchCounter = 0
        shape.outgoing.forEach((el) => {
            branchCounter += 1
        })
        if (branchCounter >= 2) {
            window.showAlert('会签分支最多只能有两个分支')
            return false
        }
    }
    return true
}
