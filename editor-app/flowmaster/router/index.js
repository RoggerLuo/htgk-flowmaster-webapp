import { Blank, tplSrc, routeMap } from './conf'
import specialSf from './specialSf'
import render from './render'

export default function($scope, shape) {
    render(Blank)
    if (!shape) {
        $scope.propertyTpl = tplSrc + 'canvas.html'
        return 
    }
    const title = fm.getTitle(shape)
    if(title === 'End event'){
        $scope.propertyTpl = tplSrc + 'endnode.html'
    }
    if(title === 'Start event'){
        $scope.propertyTpl = tplSrc + 'startnode.html'
    }
    if (title == 'Sequence flow') {
        specialSf($scope, shape)
    }

    handleGateway(shape,$scope)
    handleCommon(title,$scope)
    // 待优化 这个为什么出现在这里
    fm.nameManager.autoNaming(shape, $scope)

}

function handleCommon(title,$scope) {
    if(routeMap[title]){
        $scope.propertyTpl = tplSrc + 'node-name.html'
        render(routeMap[title]())        

    }
}

function handleGateway(shape,$scope){
    if(fm.getTitle(shape) === 'Exclusive gateway'){
        $scope.propertyTpl = tplSrc + 'node-name.html'
        if (!fm.multi.is.gateway(shape) && !fm.manual.is.gateway(shape)) {
            render(fm.branchNode)
        }
    }
}