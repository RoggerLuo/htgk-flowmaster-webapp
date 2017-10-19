'use strict'
import handleMultiBranch,{multiBranchNamingUsingGateway} from './multiBranch'
import autoNaming from './autoNaming'
import { tplSrc, tplMap } from './config'
function handleExclusive($scope, selectedShape) {
    if (selectedShape.incoming && selectedShape.incoming[0] &&
        selectedShape.incoming[0].incoming && selectedShape.incoming[0].incoming[0] &&
        (selectedShape.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task')
    ) {
        $scope.propertyTpl = './editor-app/property-tpl/commonNode.html'
        return true
    }
    return false
}
function handleCanvas($scope, selectedShape) {
    if (selectedShape) return false
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html'
    window.windowCanvas.getChildNodes().filter((el) => el._stencil._jsonStencil.title == "Multi user task")
    .forEach((el) => {
        const selectedShape = el.outgoing[0] && el.outgoing[0].outgoing[0]||false
        selectedShape && multiBranchNamingUsingGateway(selectedShape)
    })
    return true
}
function handleBranchSequence($scope, selectedShape) {
    const incoming = selectedShape.incoming[0]
    if (!incoming) return false
    /* 如果是分支节点 */
    if (incoming._stencil._jsonStencil.title == 'Exclusive gateway') {
        if (selectedShape.properties['defaultflow'] == 'true') {
            $scope.propertyTpl = './editor-app/property-tpl/sequenceFlow.html'
            return true
        } else {
            /* 如果是会签分支，则显示为普通的 */
            if (incoming && (incoming._stencil._jsonStencil.title == "Exclusive gateway")) {
                if (
                    incoming.incoming[0].incoming[0] &&
                    (incoming.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task')
                ){
                    $scope.propertyTpl = './editor-app/property-tpl/sequenceFlow.html'
                    return true
                }
            }
            $scope.propertyTpl = './editor-app/property-tpl/branchSequenceFlow.html'
            return true
        }
    } else {
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
    handleMultiBranch($scope, selectedShape)
    if (handleExclusive($scope, selectedShape)) return
    if (handleBranchSequence($scope, selectedShape)) return
    handleOthers($scope, selectedShape)
}