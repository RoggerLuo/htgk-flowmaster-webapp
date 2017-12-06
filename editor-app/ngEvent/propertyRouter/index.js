'use strict'
import { tplSrc, tplMap } from './conf'
import globalRefreshBranchName from '../multiusertask/globalRefreshBranchName'
function handleExclusive($scope, selectedShape) {
    if(window.isMultiGateway(selectedShape)){
        $scope.propertyTpl = tplSrc + 'commonNode.html' //没有设置项的普通节点
        return true        
    }
    if(window.isManualGateway(selectedShape)){
        $scope.propertyTpl = tplSrc + 'commonNode.html' //没有设置项的普通节点
        return true        
    }
    return false //否则为正常的分支节点
}
function handleCanvas($scope, selectedShape) {
    if (selectedShape) return false
    $scope.propertyTpl = tplSrc + 'canvas.html'
    globalRefreshBranchName()
    return true
}
function handleBranchSequence($scope, selectedShape) {
    /* 如果是会签分支连线 */
    if(global.isMultiSequenceflow(selectedShape)){
        $scope.propertyTpl = tplSrc + 'sequenceFlow.html'
        return true   
    }
    if(global.isManualSequenceflow(selectedShape)){
        $scope.propertyTpl = tplSrc + 'sequenceFlow.html'
        return true   
    }

    /* 如果是分支节点 */
    const incoming = selectedShape.incoming[0]
    if (!incoming) return false
    if (incoming._stencil._jsonStencil.title == 'Exclusive gateway') {
        if (selectedShape.properties['defaultflow'] == 'true') {
            $scope.propertyTpl = tplSrc + 'sequenceFlow.html'
            return true
        } else {
            $scope.propertyTpl = tplSrc + 'branchSequenceFlow.html'
            return true
        }
    }
    return false
}
import autoNaming from './autoNaming'
function handleOthers($scope, selectedShape) {
    autoNaming(selectedShape, $scope)
    const title = selectedShape._stencil._jsonStencil.title
    $scope.propertyTpl = tplSrc + tplMap[title]
    // console.log(tplSrc + tplMap[title])
}
export default function($scope, event) {
    const selectedShape = event.elements.first()
    if (handleCanvas($scope, selectedShape)) return
    if (handleExclusive($scope, selectedShape)) return
    if (handleBranchSequence($scope, selectedShape)) return
    handleOthers($scope, selectedShape)
}