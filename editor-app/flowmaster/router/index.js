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

    handleGateway(shape)
    handleCommon(title,$scope)
}

function handleCommon(title,$scope) {
    if(routeMap[title]){
        $scope.propertyTpl = tplSrc + 'node-name.html'
        render(routeMap[title]())        

        // 待优化 这个为什么出现在这里
        fm.nameManager.autoNaming(shape, $scope)
    }
}

function handleGateway(shape){
    if (fm.multi.is.gateway(shape)) {
        $scope.propertyTpl = tplSrc + 'node-name.html' //没有设置项的普通节点
    }
    if (fm.manual.is.gateway(shape)) {
        $scope.propertyTpl = tplSrc + 'node-name.html' //没有设置项的普通节点
    }    
}