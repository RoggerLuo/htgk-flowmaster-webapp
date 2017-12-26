global.isMultiGateway = function(selectedShape){
    if (selectedShape && (selectedShape._stencil._jsonStencil.title == "Exclusive gateway")) {
        if ( selectedShape.incoming[0] && selectedShape.incoming[0].incoming[0] &&
            (selectedShape.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task')
        ){
            return true
        } 
    }     
    return false
}

global.isMultiSequenceflow = function(selectedShape){
    if (selectedShape && (selectedShape._stencil._jsonStencil.title == "Sequence flow")) {
        if (!selectedShape.incoming[0]) return false
        const theShape = selectedShape.incoming[0]
        if(isMultiGateway(theShape)) return true
    }
    return false
}
