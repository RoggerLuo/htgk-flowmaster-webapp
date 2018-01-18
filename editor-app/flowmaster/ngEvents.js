import save from './save'
import initialize from './initialize'
import './deleteEvent'
import './namePropertyCtrl'

global.fm = global.fm || {}

/* ng app.js 初始化的时候 */
fm.initialize = initialize

fm.ngEvent = ($scope,$http) => {
   
   fm.saveModel = save($scope, $http)

   fm.getCanvas = () => $scope.editor.getCanvas()
   fm.getNodes = () => $scope.editor.getCanvas().getChildNodes()
   fm.getJson = () => $scope.editor.getJSON()
   
   fm.getShapeById = (id) => $scope.editor.getCanvas().getChildShapeByResourceId(id)
   fm.getNodeById = fm.getShapeById


   $scope.propertyTpl = './editor-app/property-tpl/canvas.html'
   
   
   // will be deprecated
   $scope.lastSelectedUserTaskId = false //?????
   fm.canvas = () => fm.getCanvas()
   global.windowCanvas = fm.getCanvas()
   window.getJson = () => JSON.stringify(fm.getJson())
   window.getRawJson = () => fm.getJson()
}
