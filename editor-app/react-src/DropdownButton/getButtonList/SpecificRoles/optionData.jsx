export default function(){
    const list = []
    const json = fm.getJson()
    json.childShapes.forEach((el,index)=>{
        if(fm.currentSelectedShapeItem.resourceId == el.resourceId ) return

        if(el.stencil.id == 'UserTask') list.push({text:el.resourceId.substring(4,9)+el.properties.name,value:el.resourceId})
        if(el.stencil.id == 'CirculationTask') list.push({text:el.resourceId.substring(4,9)+el.properties.name,value:el.resourceId})
        if(el.stencil.id == 'ManualTask') list.push({text:el.resourceId.substring(4,9)+el.properties.name,value:el.resourceId})
    })
    return list
}
