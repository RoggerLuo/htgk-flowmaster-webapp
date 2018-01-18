global.fm = global.fm || {}

fm.getTitle = shape => shape._stencil._jsonStencil.title
fm.getUrlQueryParam = (name) => { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

fm.getIncoming = (shape) => {
    const incomings = shape.incoming
    if(incomings){
        const incoming = incomings[0]
        if(incoming) return incoming
    }
    return false    
}
fm.getIncomingX2 = (shape) => {
    return fm.getIncoming(fm.getIncoming(shape))
}
fm.getIncomingX3 = (shape) => {
    return fm.getIncomingX2(fm.getIncoming(shape))   
}
fm.getOutgoing = (shape) => {
    const outgoings = shape.outgoing
    if(outgoings){
        const outgoing = outgoings[0]
        if(outgoing) return outgoing
    }
    return false        
}
fm.getOutgoingX2 = (shape) => {
    return fm.getOutgoing(fm.getOutgoing(shape))
}
fm.getOutgoingX3 = (shape) => {
    return fm.getOutgoingX2(fm.getOutgoing(shape))       
}


fm.previousShape={}
fm.previousShape.is={}
fm.previousShape.is = (title,shape) => {
    shape = shape?shape:fm.currentSelectedShape
    if(!shape) return false
    if(!shape.incoming) return false
    const previousShapeSf = shape.incoming[0]
    if(previousShapeSf){
        const previousShape = previousShapeSf.incoming[0]
        if(title == 'multi'){
            if(previousShape && fm.multi.is.gateway(previousShape)){
                return true
            }
        }else{
            if(previousShape && fm.getTitle(previousShape) == title){
                return true
            }            
        }
    }
    return false   
}


//dep
window.getQueryString = fm.getUrlQueryParam
