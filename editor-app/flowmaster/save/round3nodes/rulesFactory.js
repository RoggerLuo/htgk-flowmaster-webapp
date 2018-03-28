import branch_not_init from './branch_not_init'
import sf_not_init from './sf_not_init'

/* 所以，循环里面，返回false 才通过 */
const factory = {
    'Sequence flow'(shape){
        if(branch_not_init(shape)){
            return true //不通过
        }
        if(sf_not_init(shape)){
            return true
        }
        return false  
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