
export default (shape,repo) => {
    if(fm.approve.hideCheck(repo)) return false     
    if(fm.last.is('Circulation task',fm.getIncoming(shape))) return false 
    if(fm.last.is('Inclusive gateway',fm.getIncoming(shape))) return false 
    if(fm.last.is('Subflow',fm.getIncoming(shape))) return false 

    if(fm.multi.is.gateway( fm.getIncomingX2(shape) )) return false

    return true
}
