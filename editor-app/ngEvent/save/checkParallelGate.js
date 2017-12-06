'use strict'
function iterChildren(el, arr) {
    const outgoings = el.outgoing
    outgoings.forEach(child => {
        if (child._stencil._jsonStencil.title == 'Inclusive gateway') {
            //do nothing
        } else {
            if (child.incoming.length > 1){
                if(!arr.some(elem=>elem.resourceId == child.resourceId)){ //去重
                    arr.push(child)                      
                }
            } 
            iterChildren(child, arr)
        }
    })
}
function findNearestShapeOfParaGate(shape,arr){
    const incomings = shape.incoming
    incomings.forEach(incomingOfShape=>{
        //中间隔了个sequence flow 
        if (incomingOfShape._stencil._jsonStencil.title == 'Parallel gateway') { 
            arr.push(shape.outgoing[0])
        }else{
            //如果上上一个节点不是parallel那么就继续迭代自身【一次向上移动一级，不要跳两级】
            findNearestShapeOfParaGate(incomingOfShape,arr)
        }
    })
}
export default ($scope) => { //checkEmpty
    let returnValue = false
    const json = window.getRawJson() //$scope.editor.getJSON()
    //先检查是否有parallel
    let parallel = 0
    let inclusive = 0
    const checkConnect = json.childShapes.forEach((el, index) => {
        if (el.stencil.id == 'ParallelGateway') {
            parallel += 1
        }
        if (el.stencil.id == 'InclusiveGateway') {
            inclusive += 1
        }
    })
    if (parallel != inclusive){
        window.showAlert('并行分支和并行汇聚需要成对出现')
        return true
    } 
    let collections = [] //在两个并行中 incoming大于两个的元素
    let sourceShape = [] //最后的'源shape'
    // 先iter一次
    json.childShapes.forEach((el, index) => {
        if (el.stencil.id == 'ParallelGateway') {
            el = window.windowCanvas.getChildShapeByResourceId(el.resourceId)
            iterChildren(el, collections)
        }
    })
    // 再从选出的shape里求它们的source
    collections.forEach((el)=>{
        findNearestShapeOfParaGate(el,sourceShape)
    })
    // 从collections中往上溯源，离最近的parallel的last shape如果不是同一个，那就有问题
    if(sourceShape.length > 1){
        sourceShape.some(el=>{
            if(sourceShape[0].resourceId != el.resourceId){
                window.showAlert('并行分支不同支流之间不能有连结')
                returnValue = true
                return true
            }
        })
    }

    return returnValue
}
