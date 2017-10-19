'use strict'
/* 如果选中的是multi的分支节点 */
export function multiBranchNamingUsingGateway(selectedShape){ //这个selectedShape是"Exclusive gateway"
    if(global.isMultiGateway(selectedShape)) {
        //总共就两根线，都判断一次好了
        const sf = selectedShape.outgoing[0] || false
        if(!sf) return true
        if(!sf.properties.conditionsequenceflow) autoJudge(sf,selectedShape) //如果第一根线没有设置过

        const sf2 = selectedShape.outgoing[1] || false //接着判断第二根线
        if(!sf2) return true
        if(!sf2.properties.conditionsequenceflow) autoJudge(sf2,selectedShape)
        return true
    }
}
export default function($scope, selectedShape) { //selectedShape不是那条线本身，而是前面和后面的
    /* 如果选中的是那根线 */
    if(selectedShape && (selectedShape._stencil._jsonStencil.title == "Sequence flow")){
        if(!selectedShape.incoming[0]) return
        const theShape = selectedShape.incoming[0]
        multiBranchNamingUsingGateway(theShape)
        return 
    }
    /* 如果是采用手动连线的方式, 则选中的节点是会签分支节点 */
    multiBranchNamingUsingGateway(selectedShape)
    /* 如果是采用拖动的方式, 则选中的节点是连线后的节点 */
    if (selectedShape.incoming[0]) {
        const incoming1 = selectedShape.incoming[0]
        if (incoming1.incoming[0] && incoming1.incoming[0]._stencil._jsonStencil.title == 'Exclusive gateway') {
            const incoming2 = incoming1.incoming[0]
            if ( incoming2.incoming[0] &&  incoming2.incoming[0].incoming[0] &&
                incoming2.incoming[0].incoming[0]._stencil._jsonStencil.title == 'Multi user task') {

                const sf = selectedShape.incoming[0]
                if(sf.properties.conditionsequenceflow) return true
                const branchNode = sf.incoming && sf.incoming[0] || false
                autoJudge(sf,branchNode)             
                return true  
            }
        }
    }
    return true
}
function autoJudge(sf,branchNode){
    if(branchNode){
        const hasSf2 = branchNode.outgoing.some(el=>{
            if(el!=sf){
                const sf2 = el
                if(sf2.properties.conditionsequenceflow == "${CBPass}"){
                    window.setPropertyAdvance({ key: 'oryx-name', value: '  - 不通过 -' }, sf)
                    window.setPropertyAdvance({ key: "conditionsequenceflow", value:"${!CBPass}" }, sf)
                }else{
                    window.setPropertyAdvance({ key: 'oryx-name', value: '  通过' }, sf)
                    window.setPropertyAdvance({ key: "conditionsequenceflow", value:"${CBPass}" }, sf)
                }
                return true
            }
        })
        if(!hasSf2){
            window.setPropertyAdvance({ key: 'oryx-name', value: '  通过'}, sf)
            window.setPropertyAdvance({ key: "conditionsequenceflow", value:"${CBPass}"}, sf)                    
        }
    }
}
