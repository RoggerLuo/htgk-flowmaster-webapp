'use strict'
export default function(selectedShape){
    let name = selectedShape._stencil._jsonStencil.title
    if( name != 'Exclusive gateway') return 

    let branchObj = selectedShape.outgoing.map((el)=>{
        if(el.outgoing[0]){
            return {
                branchResourceId:el.resourceId,
                name: el.outgoing[0].properties['oryx-name']||"未命名分支"
            }                    
        }else{
            return false
        }
    }).filter((el)=>!!el)

    //这里的select是为了后面的黑魔法做准备的，如果 text为“请选择”则读取value来获取exclusiveGate
    branchObj.unshift({branchResourceId:selectedShape.resourceId,name:'请选择'}) 
    
    const reduxObj = {
        resourceId:selectedShape.resourceId,
        data:branchObj,
    }
    
    if(reduxObj.data.length){
        /* 要放在switchElement后面，不然会顺序会出问题，元素id还没更新 */
        rdx.dispatch({ type: 'branchNodeOptionDataUpdate',data:reduxObj})
    }
    
    /* 判断:如果当前选择项的sequenceflow不存在则改成请选择 */
    let theRepo = rdx.getState().branchNode.repo.filter((el)=>el.resourceId == selectedShape.resourceId)
    theRepo = theRepo[0] || false
    if(theRepo){
        if(theRepo.choosed.value){
            let sequenceflow = window.windowCanvas.getChildShapeByResourceId(theRepo.choosed.value)
            if(sequenceflow === undefined){
                /* 为什么控制台没有输出这个redux action事件，调试了好久...这 */
                rdx.dispatch({ type: 'branchNodeDropdownChoose',item:{text:'请选择',value:'请选择'}})
            }
        }
    }
}
