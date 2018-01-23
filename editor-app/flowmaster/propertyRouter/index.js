'use strict' 
import { tplSrc, tplMap } from './conf'
import autoNaming from '../autoNaming'

function handleExclusive($scope, shape) {
    if(fm.multi.is.gateway(shape)){
        $scope.propertyTpl = tplSrc + 'commonNode.html' //没有设置项的普通节点
        return true        
    }    
    if(fm.manual.is.gateway(shape)){
        $scope.propertyTpl = tplSrc + 'commonNode.html' //没有设置项的普通节点
        return true        
    }
    return false //否则为正常的分支节点
}

function handleCanvas($scope, shape) {
    if (shape) return false
    $scope.propertyTpl = tplSrc + 'canvas.html'    
    // import globalRefreshBranchName from '../multi/globalRefreshBranchName'
    // globalRefreshBranchName() //为什么这里要出现这个？？？
    return true
}
function handleBranchSequence($scope, shape) {
    if(fm.manual.is.sfInTheMiddle(shape)){
        $scope.propertyTpl = tplSrc + 'sf-blank.html'
        return true
    }
    /* 如果是会签分支branch */
    if(fm.multi.is.sf(shape)){
        $scope.propertyTpl = tplSrc + 'multi-sf.html'
        return true   
    }
    /* 如果是人工分支branch */
    if(fm.manual.is.sf(shape)){
        $scope.propertyTpl = tplSrc + 'sequenceFlow.html'
        return true   
    }

    /* 如果是普通分支节点的branch */
    if(fm.branch.is.normal(shape)){
        if (shape.properties['defaultflow'] == 'true') {
            $scope.propertyTpl = tplSrc + 'sequenceFlow.html'
            return true
        } else {
            $scope.propertyTpl = tplSrc + 'branchSequenceFlow.html'
            return true
        }
    }
    return false
}


function handleOthers($scope, shape) {
    autoNaming(shape, $scope)
    const title = shape._stencil._jsonStencil.title
    $scope.propertyTpl = tplSrc + tplMap[title]
    // console.log(tplSrc + tplMap[title])
}

export default function($scope, event) {
    const shape = event.elements.first()
    if (handleCanvas($scope, shape)) return
    if (handleExclusive($scope, shape)) return
    if (handleBranchSequence($scope, shape)) return
    handleOthers($scope, shape)
}
