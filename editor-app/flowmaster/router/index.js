import { handleCommon } from './commonShape'
import { Blank, tplSrc } from './constant'
import handleSf from './sf'
import render from './render'
import handleGateway from './gateway'

export default function($scope, shape) {
    render(Blank) //先还原
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
        handleSf($scope, shape)
    }

    handleGateway(shape,$scope)

    handleCommon(title,$scope)
}
