import propertyRouter from '../flowmaster/propertyRouter'
import nameMultiBranch from './multiusertask/nameMultiBranch'

fm.afterShapeUpdate = ($scope, event) => {
    propertyRouter($scope, event)
    nameMultiBranch($scope, event)
} 

fm.afterShapeUpdateTimeout = ($scope, event) => {
    // debugger
    if(!fm.parallelGate.isCorrectlyLinked()) fm.undo()
    if(fm.versionModel) fm.undo()
    fm.restrictionRule_everyMove($scope)
} 
