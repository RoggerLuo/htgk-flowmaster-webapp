export default function(sf){
    if (fm.multi.is.sf(sf)) return true
    if (fm.next.is("Exclusive gateway", sf)) return true
    if (fm.next.is("Circulation task", sf)) return true
    if (fm.parallelGate.isShapeIn(sf)) return true
    return false
}

