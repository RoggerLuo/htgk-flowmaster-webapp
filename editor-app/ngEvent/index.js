import './globalEvents'
import './restrictionRule'
import './multiusertask'
import './manual'
import './namePropertyCtrl'


//app controller
import initialize from './initialize'
fm.initialize = initialize

//stencil controller
import scopeEvent from './scopeEvent'
import selectEvent from './selectEvent'
import afterLoad from './afterLoad'
fm.stencilController = function($scope, $http) {
    const { EVENT_SELECTION_CHANGED, EVENT_EXECUTE_COMMANDS, EVENT_LOADED } = ORYX.CONFIG
    scopeEvent($scope, $http)
    $scope.editor.registerOnEvent(EVENT_SELECTION_CHANGED, (event) =>  selectEvent(event, $scope))
    $scope.editor.registerOnEvent(EVENT_LOADED, (event) => afterLoad($scope))
    $scope.editor.registerOnEvent(EVENT_EXECUTE_COMMANDS, (event) =>  rdx.save())
}
import './afterShapeUpdate'


