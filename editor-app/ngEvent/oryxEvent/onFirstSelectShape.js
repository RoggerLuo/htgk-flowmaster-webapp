'use strict'
export default function (selectedShape) {
    let name = selectedShape._stencil._jsonStencil.title
    if (name == 'Multi user task') {
        window.reduxStore.dispatch({ type: 'parallel/optionInit' })
        //放在reduce里面，这样就只会加载一次 window.quickAddItem('ExclusiveGateway') 
        return
    }
    if (name == 'Manual task') {
        window.reduxStore.dispatch({ type: 'Manual/optionInit' , selectedShape})
        return
    }
    //会签分支
    if(global.isMultiGateway(selectedShape)){
        //如果需要出于性能考虑,以后放到 optionInit里面，就不会重复set
        window.setPropertyAdvance({ key: 'classify', value: 'countersign' }, selectedShape)
        return
    }
    /* 如果是分支节点的sf */
    if (selectedShape.incoming[0]) {
        let incomming = selectedShape.incoming[0]._stencil._jsonStencil.title
        if (incomming == 'Exclusive gateway') {
            global.reduxStore.dispatch({ type: 'initCondition' })
        }
        return 
    }
}
