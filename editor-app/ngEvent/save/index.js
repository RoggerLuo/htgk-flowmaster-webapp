'use strict'
import isNodesValid from './isNodesValid'
import checkEmpty from './checkEmpty'
import originalSave from './originalSave'
import isParallelGateOk from './isParallelGateOk'
import isConnectBroken from './isConnectBroken'
import isSfsUnnamed from './isSfsUnnamed'

export default function($scope, $http) {
    return function(callback) {
        rdx.dispatch({ type: 'saveDeactive' })

        if(isSfsUnnamed($scope)) return rdx.save()
        

        //业务流程 校验放在 sf校验之后
        if (!isNodesValid($scope)) return rdx.save()


        /* 为空的限制条件 */
        if (checkEmpty($scope)) return rdx.save()
        if (!isParallelGateOk($scope)) return rdx.save()
        if (isConnectBroken($scope)) return rdx.save()


        /*
            给manual节点的 分支，加上classify
        */
        const canvas = $scope.editor.getCanvas()
        var json = window.getRawJson() //$scope.editor.getJSON()        
        json.childShapes.some((el, index) => {
            if (el.stencil.id == "ExclusiveGateway") {

                let currentElement = canvas.getChildShapeByResourceId(el.resourceId)
                if (global.isManualGateway(currentElement)) {
                    currentElement.setProperty('classify', 'manual')
                }
            }
        })

        /* 等待动画 */
        rdx.dispatch({ type: 'callSpin' })
        /* orginal save */
        originalSave($scope, $http, callback)
    }
}


