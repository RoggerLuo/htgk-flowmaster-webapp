import propertyRouter from './propertyRouter'
// import nameMultiBranch from './multiusertask/nameMultiBranch'

fm.before_selection_change = ($scope, event) => {//event在这里转成currShape，不用传来传去了
    fm.titleRename && fm.titleRename()
    propertyRouter($scope, event)
    fm.multi.branch.naming($scope, event)
} 
fm.after_selection_change = ($scope,event) => {}

fm.after_cmd_executed = ($scope, event) => { //
    const shape = $scope.selectedShape
    if(!fm.parallelGate.isCorrectlyLinked()) fm.undo()
    if(fm.versionModel) fm.undo()
    fm.restrict.after_executed()
    // fm.restrictionRule_everyMove() //$scope

    // fm.restrict(shape)
} 
