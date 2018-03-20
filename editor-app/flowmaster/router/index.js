import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { tplSrc, routeMap } from './conf'
import specialSf from './specialSf'


const Blank = () => <div></div>
export default function($scope, event) {
    const shape = event.elements.first()
    if (!shape) {
        renderDom(Blank)
        $scope.propertyTpl = tplSrc + 'canvas.html'
        return 
    }

    const title = fm.getTitle(shape)
    if(title === 'End event'){
        renderDom(Blank)
        $scope.propertyTpl = tplSrc + 'endnode.html'
        return 
    }

    if(title === 'Start event'){
        renderDom(Blank)
        $scope.propertyTpl = tplSrc + 'startnode.html'
        return 
    }


    if (handleExclusive($scope, shape)) return

    if (title == 'Sequence flow') {
        specialSf($scope, shape)
        return
    }
    fm.nameManager.autoNaming(shape, $scope)
    
    handleCommon(title,$scope)
}

function handleCommon(title,$scope) {
    $scope.propertyTpl = tplSrc + 'node-name.html'
    renderDom(routeMap[title]())
}



function renderDom(R){
    render(
        <Provider store={rdx.store}>
            <R/>
        </Provider>
        , 
        document.getElementById('tpl-placeholder')
    )
}

function handleExclusive($scope, shape) {
    if (fm.multi.is.gateway(shape)) {
        $scope.propertyTpl = tplSrc + 'commonNode.html' //没有设置项的普通节点
        return true
    }
    if (fm.manual.is.gateway(shape)) {
        $scope.propertyTpl = tplSrc + 'commonNode.html' //没有设置项的普通节点
        return true
    }
    return false //否则为正常的分支节点
}

