
export default (data) => {
    if(
        fm.previousShape.is('Start event')||
        fm.previousShape.is('Subflow')||
        fm.previousShape.is('Parallel gateway')||
        fm.previousShape.is('Inclusive gateway')||
        fm.previousShape.is('Circulation task')
    ){
        data = data.filter(el => el.title != '允许退回上一节点审批人')
    }
    return data
}

