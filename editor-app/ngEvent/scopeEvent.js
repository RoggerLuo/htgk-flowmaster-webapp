import save from './save'

export default function($scope,$http){
   
   fm.canvas = () => $scope.editor.getCanvas()
   fm.getNodes = () => $scope.editor.getCanvas().getChildNodes()
   fm.getShapeById = (id) => $scope.editor.getCanvas().getChildShapeByResourceId(id)
   fm.getJson = () => $scope.editor.getJSON()



   $scope.lastSelectedUserTaskId = false //?????
   $scope.propertyTpl = './editor-app/property-tpl/canvas.html'

   

   global.windowCanvas = $scope.editor.getCanvas() //拿到canvas
   fm.saveModel = save($scope, $http)

   window.getJson = () => JSON.stringify($scope.editor.getJSON())
   window.getRawJson = () => $scope.editor.getJSON()

}
