'use strict'
import './globalEvents'
import save from './save'
import './checkEmpty'
import propertyRouter from './propertyRouter'
import UIcolor from './UIcolor'
import { needReturn, onSwitchElement, onFirstSelectShape, updateNextShapeOfSF, onExclusiveGateAndBranchSF } from './onSelectEvents'
import onLoaded from './onLoaded'

window.afterShapeUpdate = propertyRouter

window.myEvent = function($scope, $http) {
    $scope.lastSelectedUserTaskId = false
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html'

    window.windowCanvas = $scope.editor.getCanvas() //拿到canvas
    window.saveModel = save($scope, $http)

    window.getJson = () => JSON.stringify($scope.editor.getJSON())
    window.getRawJson = () => $scope.editor.getJSON()

    /* 当selection的时候 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
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
    })

    /* 每次改变都激活保存 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function(event) {
        window.activeSave()
    })
    /* 画布加载完成以后的事件 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, function(event) {
        onLoaded()
    })
}

