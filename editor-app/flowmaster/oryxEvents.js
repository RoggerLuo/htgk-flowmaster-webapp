import selectEvent from './selectEvent'
import afterLoad from './afterLoad'
import stencilUtils from './stencilUtils'
import './madClick'
global.fm = global.fm || {}

/* 三种重要的oryx触发时机 */
fm.oryxEvent = function($scope, $http) {
    
    stencilUtils($scope)

    const { EVENT_SELECTION_CHANGED, EVENT_EXECUTE_COMMANDS, EVENT_LOADED } = ORYX.CONFIG
    //一、选择改变之后 触发
    $scope.editor.registerOnEvent(EVENT_SELECTION_CHANGED, (event) =>  selectEvent(event, $scope))
    $scope.editor.registerOnEvent(EVENT_LOADED, (event) => afterLoad($scope))
    $scope.editor.registerOnEvent(EVENT_EXECUTE_COMMANDS, (event) =>  rdx.save())

}


//二、在 任何操作 完成之后触发 after事件
import './shapeUpdateEvents'


//三、在 新的节点发生connect 的时候触发
import './restrict'
