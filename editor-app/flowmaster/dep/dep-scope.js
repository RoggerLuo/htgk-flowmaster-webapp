import onSelect from './onSelect'
import afterLoad from './initialize/afterLoad'
import utils from './utils'

global.fm = global.fm || {}

/* 三种重要的oryx触发时机 */
fm.scopeEvent = function($scope) {
    utils($scope)
        
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, (event) => {
        const shape = event.elements.first()
        if(duplicated(shape)) return
        onSelect(shape, $scope)
    })

    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, (event) => afterLoad($scope))
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, (event) =>  rdx.save())
    
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_DRAGDOCKER_DOCKED, (event) => {
        if(fm.getTitle(event.target) === "Exclusive gateway"){
            window.showAlert(`请从${event.target.properties['oryx-name']}点直接拖拽出连线，分支节点不支持手动连接连线`)
            fm.undoFlag = true
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
