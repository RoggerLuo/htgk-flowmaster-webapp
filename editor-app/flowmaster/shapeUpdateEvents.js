import propertyRouter from './propertyRouter'

fm.before_selection_change = ($scope, event) => {//event在这里转成currShape，不用传来传去了
    if(fm.madClick()) return
    fm.titleRename && fm.titleRename()
    propertyRouter($scope, event)
    fm.multi.branch.naming($scope, event)
    fm.multi.branch.refreshName()
} 
fm.after_selection_change = ($scope,event) => {}

fm.after_cmd_executed = ($scope, event) => { 
    if(fm.madClick()) return
    const shape = $scope.selectedShape
    if(!fm.parallelGate.isCorrectlyLinked()) fm.undo()
    
    if(fm.isSpecificVersionEditMode) fm.undo()
    fm.restrict.after_executed()
} 
