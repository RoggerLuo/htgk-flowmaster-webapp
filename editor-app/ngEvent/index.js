'use strict'
import './globalEvents'
import save from './save'
import {selectEvent,loadedEvent} from './oryxEvent'
window.myEvent = function($scope, $http) {
    $scope.lastSelectedUserTaskId = false
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html'

    window.windowCanvas = $scope.editor.getCanvas() //拿到canvas
    window.saveModel = save($scope, $http)

    window.getJson = () => JSON.stringify($scope.editor.getJSON())
    window.getRawJson = () => $scope.editor.getJSON()

    /* 当selection的时候 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        selectEvent(event,$scope)
    })
    /* 画布加载完成以后的事件 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, function(event) {
        loadedEvent()
    })
    /* 每次改变都激活保存 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function(event) {
        window.activeSave()
    })
}

import { fetchModelWrap } from './initialize'
global.fetchModelWrap = fetchModelWrap

import propertyRouter from './propertyRouter'
window.afterShapeUpdate = propertyRouter
