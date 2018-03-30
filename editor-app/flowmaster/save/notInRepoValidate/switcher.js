import sf from './sf'
import ifNotInRepo from './ifNotInRepo'

const factory = {
    'Sequence flow'(shape){
        return sf(shape)
    },
    'Manual task'(shape){
        return ifNotInRepo('manual',shape,()=>{
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

