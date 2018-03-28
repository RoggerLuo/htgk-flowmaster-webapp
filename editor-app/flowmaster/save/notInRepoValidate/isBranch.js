
export default function(shape){
    const incomingShape = fm.getIncoming(shape)
    if (fm.multi.is.gateway(incomingShape)) return false
    if (fm.manual.is.gateway(incomingShape)) return false
    return fm.getTitle(incomingShape) === 'Exclusive gateway'
}