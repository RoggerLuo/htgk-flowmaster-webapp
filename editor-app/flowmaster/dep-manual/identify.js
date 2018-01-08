global.isManualGateway = function(selectedShape){
    if (selectedShape && (selectedShape._stencil._jsonStencil.title == "Exclusive gateway")) {
        if (selectedShape.incoming[0] && 
            selectedShape.incoming[0].incoming[0] &&
            (selectedShape.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Manual task')
        ){
            return true
        } 
    }     
    return false
}
global.isManualSequenceflow = function(selectedShape){
    if (selectedShape && (selectedShape._stencil._jsonStencil.title == "Sequence flow")) {
        if (!selectedShape.incoming[0]) return false
        const theShape = selectedShape.incoming[0]
        if(isManualGateway(theShape)) return true
    }
    return false
}
