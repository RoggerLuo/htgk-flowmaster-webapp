'use strict'
import isNodesValid from './isNodesValid'
import checkEmpty from './checkEmpty'
import originalSave from './originalSave'
import isConnectBroken from './isConnectBroken'
import isSfsUnnamed from './isSfsUnnamed'
import addClassify from './addClassify'
import forSfsInGates from './forSfsInGates'

export default function($scope, $http) {
    return function(callback) {
        rdx.dispatch({ type: 'saveDeactive' })

        if(isSfsUnnamed($scope)) return rdx.save()
    
        //业务流程 校验放在 sf校验之后
        if (!isNodesValid($scope)) return rdx.save() //这个的顺序很重要! 很重要

        //要放在 sf校验之后, 因为涉及连线命名
        forSfsInGates()

        /* 为空的限制条件 */
        if (checkEmpty($scope)) return rdx.save()
        if (!fm.parallelGate.isReadyForSave()) return rdx.save()
        if (isConnectBroken($scope)) return rdx.save()

        /* 最后，确定要保存，才做的事 */
        addClassify()

        /* 等待动画 */
        rdx.dispatch({ type: 'callSpin' })
        /* orginal save */
        originalSave($scope, $http, callback)
    }
}


