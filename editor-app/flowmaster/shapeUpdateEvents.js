import propertyRouter from './propertyRouter'

fm.lastShapeUpdateTime = 0 
fm.madClickCounter = 0
const threshold = 4
fm.madClick = () => {
    const now = Date.parse(new Date())
    if((now - fm.lastShapeUpdateTime) < 100){
        fm.madClickCounter += 1
        if(fm.madClickCounter <= threshold) {
            return false
        }else{
            return true
        }
    } else {
        fm.lastShapeUpdateTime = now
        fm.madClickCounter = 0
        return false
    } 
    return true

}


fm.before_selection_change = ($scope, event) => {//event在这里转成currShape，不用传来传去了
    if(fm.madClick()) return

    // const now = Date.parse(new Date())
    // if((now - fm.lastShapeUpdateTime) < 100) return 
    // fm.lastShapeUpdateTime = now

    fm.titleRename && fm.titleRename()
    propertyRouter($scope, event)
    fm.multi.branch.naming($scope, event)
    fm.multi.branch.refreshName()
} 
fm.after_selection_change = ($scope,event) => {}

fm.after_cmd_executed = ($scope, event) => { 
    if(fm.madClick()) return

    // const now = Date.parse(new Date())
    // if((now - fm.lastShapeUpdateTime) < 100) return 
    // fm.lastShapeUpdateTime = now

    const shape = $scope.selectedShape
    if(!fm.parallelGate.isCorrectlyLinked()) fm.undo()
    if(fm.versionModel) fm.undo()
    fm.restrict.after_executed()
} 
