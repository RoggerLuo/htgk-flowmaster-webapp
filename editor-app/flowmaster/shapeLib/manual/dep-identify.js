global.fm = global.fm || {}
fm.manual = {}
fm.manual.is = {}
fm.manual.is.gateway = function(shape){
    if (shape && (fm.getTitle(shape) == "Exclusive gateway")) {
        if (shape.incoming[0] && 
            shape.incoming[0].incoming[0] &&
            (fm.getTitle(shape.incoming[0].incoming[0]) == 'Manual task')
        ){
            return true
        } 
    }     
    return false
}
fm.manual.is.sf = function(shape){
    if (shape && (fm.getTitle(shape) == "Sequence flow")) {
        if (!shape.incoming[0]) return false
        const incomingShape = shape.incoming[0]
        if(fm.manual.is.gateway(incomingShape)) return true
    }
    return false
}
fm.manual.is.sfInTheMiddle = function(shape){
    if (shape && (fm.getTitle(shape) == "Sequence flow")) {
        if(fm.getTitle(shape.incoming[0]) == 'Manual task'){
            return true
        }
    }
    return false
}

global.isManualGateway = fm.manual.is.gateway