import propertyRouter from './propertyRouter'
// import nameMultiBranch from './multiusertask/nameMultiBranch'

fm.afterShapeUpdate = ($scope, event) => {

    //event在这里转成currShape，不用传来传去了


    propertyRouter($scope, event)
    fm.multi.branch.naming($scope, event)
} 

fm.afterShapeUpdateTimeout = ($scope, event) => { //
    const shape = $scope.selectedShape
    if(!fm.parallelGate.isCorrectlyLinked()) fm.undo()
    if(fm.versionModel) fm.undo()
    fm.restrictionRule_everyMove() //$scope

    fm.restrict(shape)
} 
