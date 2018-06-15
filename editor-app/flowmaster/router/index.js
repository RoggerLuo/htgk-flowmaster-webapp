import { handleCommon } from './commonShape'
import { Blank, tplSrc, tplSrcWithV } from './constant'
import handleSf from './sf'
import render from './render'
import handleGateway from './gateway'

export default function($scope, shape) {
    render(Blank) //先还原
    if (!shape) {
        $scope.propertyTpl = tplSrcWithV('canvas.html')
        return 
    }
    
    const title = fm.getTitle(shape)
    if(title === 'End event'){
        $scope.propertyTpl = tplSrcWithV('endnode.html')
    }
    if(title === 'Start event'){
        $scope.propertyTpl = tplSrcWithV('startnode.html')
    }
    if (title == 'Sequence flow') {
        handleSf($scope, shape)
    }

    handleGateway(shape,$scope)

    handleCommon(title,$scope)
}
