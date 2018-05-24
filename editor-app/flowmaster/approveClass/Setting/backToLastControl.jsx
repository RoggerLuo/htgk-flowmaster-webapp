function backToLastNotAvailable(shape) {
    return fm.previousShape.is('Start event',shape) ||
    fm.previousShape.is('Subflow',shape) ||
    fm.previousShape.is('Parallel gateway',shape) ||
    fm.previousShape.is('Inclusive gateway',shape) ||
    fm.previousShape.is('Circulation task',shape) ||
    start_with_x(shape) ||
    circ_with_X(shape)    
}

// 强插一条
fm.backToLastNotAvailable = backToLastNotAvailable

export default (data) => {
    if(backToLastNotAvailable(fm.currentSelectedShape)){
        data = data.filter(el => el.title != '允许退回上一节点审批人')
    }
    return data
}
function circ_with_X(_shape){
    let flag = false
    const looper1 = (sf) => {
        const shape = fm.getIncoming(sf)
        if(fm.getTitle(shape) === 'Circulation task'){
            flag = true
        }
    }
    const looper2 = (sf) => {
        const shape = fm.getIncoming(sf)
        if(fm.getTitle(shape) === 'Exclusive gateway'){
            shape.incoming.forEach(looper1)  
        }
    }
    _shape.incoming.forEach(looper2) //fm.currentSelectedShape
    return flag
}
function start_with_x(_shape){
    let flag = false
    const looper1 = fm.incomingLooper('Start event',(shape)=>{
        flag = true
    })
    const looper2 = fm.incomingLooper('Exclusive gateway',(shape)=>{
        shape.incoming.forEach(looper1)  
    })
    _shape.incoming.forEach(looper2) //fm.currentSelectedShape
    return flag
}