export default function(){
    const approveArr = []
    const json = window.getRawJson()
    json.childShapes.forEach((el,index)=>{
        if(window.currentSelectedShape.resourceId == el.resourceId ) return
        if(el.stencil.id == 'UserTask') approveArr.push({text:el.properties.name,value:el.resourceId})
    })
    return approveArr
}
