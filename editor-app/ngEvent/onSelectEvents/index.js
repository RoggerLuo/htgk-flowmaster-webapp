'use strict';
import onExclusiveGateAndBranchSF from './onExclusiveGateAndBranchSF'
function needReturn(selectedShape) {
    if (!selectedShape) return true
    // 防止不知道为什么多次抽搐
    var svgId = (selectedShape && selectedShape.resourceId || '不存在')
    if (window.preSvgId === svgId) return true
    window.preSvgId = svgId
    return false
}

function onSwitchElement(selectedShape) {
    // var prevId = $scope.lastSelectedUserTaskId
    var nextId = selectedShape.resourceId
    var nextStencilTitle = selectedShape._stencil._jsonStencil.title
    global.reduxStore.dispatch({ type: 'switchElement', nextId, nextStencilTitle }) //prevId

}

function onFirstSelectShape(selectedShape) {
    if (selectedShape.incoming[0]) {
        let incomming = selectedShape.incoming[0]._stencil._jsonStencil.title
        if (incomming == 'Exclusive gateway') {
            global.reduxStore.dispatch({ type: 'initCondition' })
        }
    }
    let name = selectedShape._stencil._jsonStencil.title
    if (name == 'Multi user task') {
        window.reduxStore.dispatch({ type: 'parallel/optionInit' })
        // window.quickAddItem('ExclusiveGateway')
    }
}

function updateNextShapeOfSF(selectedShape) {
    if (selectedShape._stencil._jsonStencil.title != 'Sequence flow') return
    if (selectedShape.incoming[0]) { //&& selectedShape.incoming[0]._stencil._jsonStencil.title
        window.reduxStore.dispatch({
            type: 'nextElOfSF',
            name: selectedShape.outgoing[0] && selectedShape.outgoing[0].properties['oryx-name'] || "暂无"
        })
    }

}
export {
    needReturn,
    onSwitchElement,
    onFirstSelectShape,
    updateNextShapeOfSF,
    onExclusiveGateAndBranchSF
}