export default (data) => {
    if(
        fm.previousShape.is('Start event')||
        fm.previousShape.is('Subflow')||
        fm.previousShape.is('Parallel gateway')||
        fm.previousShape.is('Inclusive gateway')||
        fm.previousShape.is('Circulation task')||
        start_with_x() ||
        circ_with_X()
    ){
        data = data.filter(el => el.title != '允许退回上一节点审批人')
    }
    return data
}
function circ_with_X(){
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
    fm.currentSelectedShape.incoming.forEach(looper2)
    return flag
}
function start_with_x(){
    let flag = false
    const looper1 = fm.incomingLooper('Start event',(shape)=>{
        flag = true
    })
    const looper2 = fm.incomingLooper('Exclusive gateway',(shape)=>{
        shape.incoming.forEach(looper1)  
    })
    fm.currentSelectedShape.incoming.forEach(looper2)
    return flag
}