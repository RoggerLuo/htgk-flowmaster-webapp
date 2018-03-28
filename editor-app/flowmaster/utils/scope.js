import assembleSetProperty from './setProperty'
global.fm = global.fm || {}

export default function($scope) {
    fm.getCanvas = () => $scope.editor.getCanvas()
    fm.getNodes = () => $scope.editor.getCanvas().getChildNodes() //getNodes 不能拿到sf 注意
    fm.getJson = () => $scope.editor.getJSON()
    fm.getShapeById = (id) => {
        if(typeof(id) != 'string'){
            throw Error('getShapeById的参数类型错误，搞毛，穿resourceId啊')
        }
        return $scope.editor.getCanvas().getChildShapeByResourceId(id)
    }
    fm.getNodeById = fm.getShapeById

    fm.setProperty_and_updateView = assembleSetProperty($scope) //多了自动更新试图的功能,普通的setProperty无法自动更新
    window.setPropertyAdvance = fm.setProperty_and_updateView

    //deprecate
    fm.canvas = () => fm.getCanvas()
    global.windowCanvas = fm.getCanvas()
    window.getJson = () => JSON.stringify(fm.getJson())
    window.getRawJson = () => fm.getJson()
}
