function iterChildren(el, arr) {
    //取一个节点
    const outgoings = el.outgoing
    outgoings.forEach(child => { //对这个节点所有的child 也就是连出去的线，比如说连了两根线，进行一些处理
        if (fm.getTitle(child) == 'Inclusive gateway') {
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
        if (fm.getTitle(incomingOfShape) == 'Parallel gateway') { 
            arr.push(shape.outgoing[0])
        }else{
            //如果上上一个节点不是parallel那么就继续迭代自身【一次向上移动一级，不要跳两级】
            findNearestShapeOfParaGate(incomingOfShape,arr)
        }
    })
}

const isCorrectlyLinked = () => {
    const json = fm.getJson()
    const collections = [] //在两个并行中 incoming大于两个的元素
    const sourceShape = [] //最后的'源shape'
    // 先iter一次
    json.childShapes.forEach((el, index) => {
        if (el.stencil.id == 'ParallelGateway') {
            el = fm.getShapeById(el.resourceId)
            iterChildren(el, collections)
        }
    })
    
    // 再从选出的shape里求它们的source
    collections.forEach((el)=>findNearestShapeOfParaGate(el,sourceShape))

    // 从collections中往上溯源，离最近的parallel的last shape如果不是同一个，那就有问题
    if(sourceShape.length > 1){
        if(sourceShape.some(el=>{
            if(sourceShape[0].resourceId != el.resourceId){
                window.showAlert('并行分支不同支流之间不能有连结')
                return true
            }
        })){
            return false
        }
    }
    return true
}
export default isCorrectlyLinked
