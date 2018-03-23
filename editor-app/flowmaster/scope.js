import selectEvent from './selectEvent'
import afterLoad from './initialize/afterLoad'
import utils from './utils'

global.fm = global.fm || {}

/* 三种重要的oryx触发时机 */
fm.scopeEvent = function($scope, $http) {
    utils($scope)
    
    const { EVENT_SELECTION_CHANGED, EVENT_EXECUTE_COMMANDS, EVENT_LOADED } = ORYX.CONFIG
    $scope.editor.registerOnEvent(EVENT_SELECTION_CHANGED, (event) =>  {
        const shape = event.elements.first()
        const a = shape && shape.resourceId || 'a'
        const b = fm.currentSelectedShape && fm.currentSelectedShape.resourceId || 'b'
        if(a === b) return
        selectEvent(event, $scope)
    })
    $scope.editor.registerOnEvent(EVENT_LOADED, (event) => afterLoad($scope))
    $scope.editor.registerOnEvent(EVENT_EXECUTE_COMMANDS, (event) =>  rdx.save())

}

