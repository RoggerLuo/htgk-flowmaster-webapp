const isInGates = (shape) => {
    // const json = fm.getJson()

    function isUnderParallelGate(shape) {
        const incomings = shape.incoming || []
        let returnValue = false
        incomings.some(incoming => {
            //中间隔了个sequence flow 
            if (fm.getTitle(incoming) == 'Parallel gateway') {
                returnValue = true
                return true
            }
            if (fm.getTitle(incoming) == 'Inclusive gateway') {
                returnValue = false
                return true
            }
            returnValue = isUnderParallelGate(incoming)
        })
        return returnValue
    }
    return isUnderParallelGate(shape)
    //先检查是否有inclusive
    // json.childShapes.forEach((el, index) => {
    //     if (el.stencil.id == 'ParallelGateway') parallel += 1
    //     if (el.stencil.id == 'InclusiveGateway') inclusive += 1
    // })
    // if (parallel != inclusive) {
    //     window.showAlert('并行分支和并行汇聚需要成对出现')
    //     return false
    // }
    // return true
}
export default isInGates