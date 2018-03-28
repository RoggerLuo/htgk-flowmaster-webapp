import sf from './sf'
import isInRepo from './isInRepo'

const factory = {
    'Sequence flow'(shape){
        return sf(shape)
    },
    'Manual task'(shape){
        return isInRepo('manual',shape,()=>{
            rolesEmptyWarning(shape)
            return false
        })
    }
}
export default factory


function rolesEmptyWarning(shape){
    const name = shape.properties["oryx-name"]
    window.showAlert(`节点<span style="color:orange">${name}</span>审批人设置不能为空`)
    fm.spotlight(shape)
}



/*'Multi user task'(shape){
    
    const multi_parties = shape.properties.multiinstance_parties
    debugger
    if (
        (!multi_parties) ||
        (multi_parties.length == 0) ||
        ((multi_parties.length == 1) && (multi_parties[0] == 0))
    ) {
        window.showAlert('"' + shape.properties['oryx-name'] + '"内容不能为空')
        fm.spotlight(shape)
        return true
    }else{
        return false    
    }
},*/