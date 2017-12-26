'use strict'
import sf from './sf'
import subflow from './subflow'
import custom from './custom'
import manual from './manual'
import service from './service'
import saveHandlerApprove from './approve'
import saveHandlerEndPoint from './endPoint'
import saveHandlerBranch from './branch'
import saveHandlerBranchNode from './branchNode'
import saveHandlerParallel from './parallel'
import checkEmpty from './checkEmpty'
import originalSave from './originalSave'
import checkParallelGate from './checkParallelGate'


export default function($scope, $http) {
    return function(callback) {
        window.reduxStore.dispatch({ type: 'saveDeactive' })


        /* 把redux转换成oryx数据, 顺序很重要 */
        const canvas = $scope.editor.getCanvas()
        if(!subflow(canvas)){
            activeSave()
            return
        }
        // custom(canvas)
        sf(canvas)
        manual(canvas)
        service(canvas)
        saveHandlerApprove(canvas)
        saveHandlerParallel(canvas)
        saveHandlerEndPoint(canvas)
        if (!saveHandlerBranch(canvas)) {
            activeSave()
            return
        }
        saveHandlerBranchNode(canvas)

        /* 为空的限制条件 */
        if (checkEmpty($scope)) {
            window.reduxStore.dispatch({ type: 'saveActive' })
            return
        }

        if (checkParallelGate($scope)) {
            window.reduxStore.dispatch({ type: 'saveActive' })
            // alert('empty')
            return
        }




        /*
            给manual节点的 分支，加上classify
        */
        var json =  window.getRawJson() //$scope.editor.getJSON()        
        json.childShapes.some((el,index)=>{
            if(el.stencil.id == "ExclusiveGateway"){

                let currentElement = canvas.getChildShapeByResourceId(el.resourceId)
                if(global.isManualGateway(currentElement)){
                    currentElement.setProperty('classify', 'manual')
                } 
            }
        })





        /* 等待动画 */
        window.reduxStore.dispatch({ type: 'callSpin' })
        // orginal save code
        originalSave($scope, $http,callback)
    }
}
