import newNodeInit from './newNodeInit'
import UIcolor from './UIcolor'
import onExclusiveGateAndBranchSF from './onExclusiveGateAndBranchSF'
import informRedux_the_ElementSwitchEvent from './informRedux_the_ElementSwitchEvent'
import updateNextShapeOfSF from './updateNextShapeOfSF'
// import multiOnSelect from '../multiusertask/onSelect'
import propMark from './propMark'

function madnessProof(selectedShape) {
    if (!selectedShape) return true
    // 防止不知道为什么多次抽搐
    var svgId = (selectedShape && selectedShape.resourceId || '不存在')
    if (window.preSvgId === svgId) return true
    window.preSvgId = svgId
    return false
}


export default function(event,$scope){
    UIcolor(event, $scope)

    const selectedShape = event.elements.first()
    if (madnessProof(selectedShape)) return



    const is = fm.parallelGate.isShapeIn(selectedShape)


    window.currentSelectedShape = selectedShape
    propMark(selectedShape)
    
    informRedux_the_ElementSwitchEvent(selectedShape)    
    newNodeInit(selectedShape) //其实就是一堆select事件的杂烩
    onExclusiveGateAndBranchSF(selectedShape)
    updateNextShapeOfSF(selectedShape)
}
