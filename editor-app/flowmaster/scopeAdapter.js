import onSelect from './onSelect'
import afterLoad from './initialize/afterLoad'
import utils from './utils'

import save from './save'
import initialize from './initialize'
import './deleteEvent'
import './namePropertyCtrl'
import './nameManager'
//二、在 任何操作 完成之后触发 after事件

import './shapeUpdateEvents'


//三、在 新的节点发生connect 的时候触发
import './restrict'


global.fm = global.fm || {}
fm.initialize = initialize

/* 三种重要的oryx触发时机 */
fm.scopeAdapter = function($scope,$http) {
    utils($scope)
    fm.saveModel = save($scope, $http)
    
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html'    
    $scope.lastSelectedUserTaskId = false // 为了UI考虑的

    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, (event) => {
        const shape = event.elements.first()
        if(duplicated(shape)) return
        onSelect(shape, $scope)
    })

    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, (event) => afterLoad($scope))
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, (event) =>  rdx.save())
    
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED, (event) => {

        if(event.parent.incoming[0].resourceId === event.target.resourceId){
            if(fm.getTitle(event.target) === "Exclusive gateway"){
                window.showAlert(`请从${event.target.properties['oryx-name']}点直接拖拽出连线，分支节点不支持手动连接连线`)
                fm.undoFlag = true
            }
        }
    })

}

function duplicated(shape){
    // 阻止重复选择，提高性能，关键
    const a = shape && shape.resourceId || 'a'
    const b = fm.currentSelectedShape && fm.currentSelectedShape.resourceId || 'b'
    if(a === b){
        return true
    }else{
        return false
    }
}
