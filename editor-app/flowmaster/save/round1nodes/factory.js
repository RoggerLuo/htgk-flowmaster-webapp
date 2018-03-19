import sf_name from './sf_name'
import sf_in_parallel from './sf_in_parallel'
import exclusive from './exclusive'

/* 返回true说明验证不通过 */
const factory = {
    'Sequence flow'(shape){
        sf_in_parallel(shape)
        return sf_name(shape)  
    },
    'Exclusive gateway'(shape){
        return exclusive(shape) //&& branch(shape)
    },
    'User task'(shape){
        return false
    },
    'Manual task'(shape){
        return false  
    },
    'Multi user task'(shape){
        const multi_parties = shape.properties.multiinstance_parties
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
    },
    'Circulation task'(shape){
        // const rolesjson = shape.properties.objData
        // const zero = rolesjson && rolesjson.length == 0
        // if (!rolesjson || zero) {
        //     window.showAlert('"' + shape.properties['oryx-name'] + '"的传阅人员设置不能为空') //传阅节点
        //     fm.spotlight(shape)
        //     return true
        // }else{
        //     return false 
        // }
    },
    'Start event'(shape){
       
    },
    'Parallel gateway'(shape){
        shape.setProperty('classify', 'ParallelGateway')
        return false
    }
}

export default factory