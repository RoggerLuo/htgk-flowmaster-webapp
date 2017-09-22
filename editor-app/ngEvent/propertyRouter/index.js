'use strict'
import autoNaming from './autoNaming'
import { tplSrc, tplMap } from './config'
function handleCanvas($scope, selectedShape) {
    if (selectedShape) return false
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html'
    return true
}
function handleBranchSequence($scope, selectedShape) {
    const incoming = selectedShape.incoming[0]
    if (!incoming) return false
    if (incoming._stencil._jsonStencil.title == 'Exclusive gateway') {
        if (selectedShape.properties['defaultflow'] == 'true') {
            $scope.propertyTpl = './editor-app/property-tpl/sequenceFlow.html'
            return true
        } else {
            $scope.propertyTpl = './editor-app/property-tpl/branchSequenceFlow.html'
            return true
        }
    }else{
        return false
    }
}
function handleOthers($scope, selectedShape) {
    autoNaming(selectedShape, $scope)
    const title = selectedShape._stencil._jsonStencil.title
    $scope.propertyTpl = tplSrc + tplMap[title]
}
export default function($scope, event) {
    const selectedShape = event.elements.first()
    if (handleCanvas($scope, selectedShape)) return
    if (handleBranchSequence($scope, selectedShape)) return
    handleOthers($scope, selectedShape)
}