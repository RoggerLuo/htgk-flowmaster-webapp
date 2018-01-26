import newNodeInit from './newNodeInit'
import UIcolor from './UIcolor'
import onExclusiveGateAndBranchSF from './onExclusiveGateAndBranchSF'
import informRedux_the_ElementSwitchEvent from './informRedux_the_ElementSwitchEvent'
import updateNextShapeOfSF from './updateNextShapeOfSF'
// import multiOnSelect from '../multiusertask/onSelect'
import propMark from './propMark'

// window.beforeShapeUpdate($scope,event) //调用updateProperty会使用到selectedShape

// function madnessProof(selectedShape) {
//     if (!selectedShape) return true
//     // 防止不知道为什么多次抽搐
//     var svgId = (selectedShape && selectedShape.resourceId || '不存在')
//     if (window.preSvgId === svgId) return true
//     window.preSvgId = svgId
//     return false
// }

fm.isCurrentShapeInGates = false
fm.isIncomingShapeUsertask = false
export default function(event,$scope){
    // const now = Date.parse(new Date())
    // if((now - fm.lastShapeUpdateTime) < 100) return 
    // fm.lastShapeUpdateTime = now
    if(fm.madClick()) return



    rdx.put('usertask','touch')
    rdx.put('circulation','touch')
    rct.saveBtnInit()

    UIcolor(event, $scope)

    const selectedShape = event.elements.first()
    if(!selectedShape) return
        
    fm.currentSelectedShape = selectedShape
    
    // if (madnessProof(selectedShape)) return


    /*
        需求补充：
        1、并行流程内的连线不支持设置状态，统一读取并行开始节点前那条连线的状态
        2、子流程前面不支持连接并行汇聚、传阅节点。
        3、传阅/审批节点的上节点是传阅节点、子流程、并行汇聚时
        隐藏【允许上节点指定本节点审批人设置】，审批节点隐藏【退回上节点审批人设置】
    */
    const is = fm.parallelGate.isShapeIn(selectedShape)
    selectedShape.setProperty('isInGates', !!is)
    fm.isCurrentShapeInGates = is
    if(is) {
        const preSf = selectedShape.incoming[0]
        if(preSf){
            const predNode = preSf.incoming[0]
            if(predNode){
                if(fm.getTitle(predNode) == 'User task'){
                    fm.isIncomingShapeUsertask = true
                }else{
                    fm.isIncomingShapeUsertask = false
                }                
            }
        }
    } 





    // window.currentSelectedShape = selectedShape
    propMark(selectedShape)
    informRedux_the_ElementSwitchEvent(selectedShape)    
    newNodeInit(selectedShape) //其实就是一堆select事件的杂烩
    onExclusiveGateAndBranchSF(selectedShape)
    updateNextShapeOfSF(selectedShape)
}
