import validate_by_shapes from './validate_by_shapes'
import validate from './validate'
import originalSave from './originalSave'

export default function($scope, $http) {
    return function(callback) {
        rdx.store.dispatch({ type: 'saveDeactive' }) //写全称不会active
        
        if (!validate()) return rdx.save()

        //业务流程 校验放在 sf校验之后
        if (!validate_by_shapes($scope)) return rdx.save() //这个的顺序很重要! 很重要

        if (!fm.parallelGate.isReadyForSave()) return rdx.save()


        rdx.dispatch({ type: 'callSpin' }) /* 等待动画 */
        originalSave($scope, $http, callback) /* orginal save */

    }
}


