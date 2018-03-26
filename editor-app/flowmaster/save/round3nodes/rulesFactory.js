import branch_not_init from './branch_not_init'
import sf_not_init from './sf_not_init'

/* 返回true说明验证不通过 */
const factory = {
    'Sequence flow'(shape){
        return branch_not_init() && sf_not_init()
    },
   
}

export default factory



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