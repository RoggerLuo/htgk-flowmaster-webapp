import newNodeInit from './newNodeInit'
import UIcolor from './UIcolor'
import onExclusiveGateAndBranchSF from './onExclusiveGateAndBranchSF'
import updateNextShapeOfSF from './updateNextShapeOfSF'
import propMark from './propMark'

fm.isCurrentShapeInGates = false
fm.isIncomingShapeUsertask = false

export default function(event,$scope){

    if(fm.madClick()) return

    // 更新之前的currentSelectedShape
    if(fm.getTitle(fm.currentSelectedShape) == 'Manual task'){
        rdx.put('manual','touch')
    }
    if(fm.getTitle(fm.currentSelectedShape) == 'User task'){
        rdx.put('usertask','touch')
    }
    if(fm.getTitle(fm.currentSelectedShape) == 'Circulation task'){
        rdx.put('circulation','touch')
    }

    
    rct.saveBtnInit()

    UIcolor(event, $scope)

    const shape = event.elements.first()
    if(!shape) return
        
    fm.currentSelectedShape = shape



    /*
        需求补充：
        1、并行流程内的连线不支持设置状态，统一读取并行开始节点前那条连线的状态
        2、子流程前面不支持连接并行汇聚、传阅节点。
        3、传阅/审批节点的上节点是传阅节点、子流程、并行汇聚时
        隐藏【允许上节点指定本节点审批人设置】，审批节点隐藏【退回上节点审批人设置】
    */
    const is = fm.parallelGate.isShapeIn(shape)
    shape.setProperty('isInGates', !!is)
    fm.isCurrentShapeInGates = is
    if(is) {
        const preSf = shape.incoming[0]
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




    propMark(shape)
    rdx.tools.switchShape(shape)
    newNodeInit(shape) //其实就是一堆select事件的杂烩
    onExclusiveGateAndBranchSF(shape)
    updateNextShapeOfSF(shape)


}
