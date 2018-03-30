import sfNameValidate from './sfNameValidate'
import sfInGates from './sfInGates'
import exclusive from './exclusive'

export default {
    /*
        使用分支节点，至少需要两个分支连线
        'classify', 'manual'
    */
    'Exclusive gateway' (shape) {
        return exclusive(shape)
    },

    /* 
        如果前一个节点是user task，自动命名为同意
    */
    'Sequence flow' (shape) {
        sfInGates(shape)
        return sfNameValidate(shape)
    },

    'User task' (shape) {
        return true
    },
    'Manual task' (shape) {
        return true
    },
    'Circulation task' (shape) {
        return true
    },
    'Start event' (shape) {
        return true

    },
    'Parallel gateway' (shape) {
        shape.setProperty('classify', 'ParallelGateway')
        return true
    }
}

