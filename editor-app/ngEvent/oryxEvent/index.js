'use strict'
import './limitingRuleOfAdding'
import onFirstSelectShape from './onFirstSelectShape'
import UIcolor from './UIcolor'
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

function updateNextShapeOfSF(selectedShape) {
    if (selectedShape._stencil._jsonStencil.title != 'Sequence flow') return
    if (selectedShape.incoming[0]) { //&& selectedShape.incoming[0]._stencil._jsonStencil.title
        window.reduxStore.dispatch({
            type: 'nextElOfSF',
            name: selectedShape.outgoing[0] && selectedShape.outgoing[0].properties['oryx-name'] || "暂无"
        })
    }

}
export function selectEvent(event,$scope){
    UIcolor(event, $scope)
    const selectedShape = event.elements.first()
    if (needReturn(selectedShape)) return

    //currentSelectedShape 这个是用在哪些业务逻辑？   
    window.currentSelectedShape = selectedShape

    //各种业务逻辑
    onSwitchElement(selectedShape)
    onFirstSelectShape(selectedShape)
    onExclusiveGateAndBranchSF(selectedShape)
    updateNextShapeOfSF(selectedShape)
}
export function loadedEvent(){
    /* 画布加载以后，把sequenceflow设置为true */
    window.reduxStore.getState().branchNode.repo.forEach((el) => {
        let currentElement = window.windowCanvas.getChildShapeByResourceId(el.choosed.value)
        window.setPropertyAdvance({ key: 'defaultflow', value: 'true' }, currentElement)
    })
    /* 保存事件deactive，自动保存一次 */
    const saveEvent = {
        type: KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED,
        model: '',
        modelId: window.getQueryString("pid"),
        eventType: 'update-model'
    }
    KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, saveEvent)
    window.reduxStore.dispatch({ type: 'saveDeactive' })
}
