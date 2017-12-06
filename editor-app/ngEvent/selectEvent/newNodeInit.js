export default function(selectedShape) {
    let name = selectedShape._stencil._jsonStencil.title

    if (name == 'Multi user task') {
        window.reduxStore.dispatch({
            type: 'parallel/newNodeInit',
            init() {
                window.quickAddItem('ExclusiveGateway')
            }
        })
        return
    }


    if (name == 'Manual task') {
        window.reduxStore.dispatch({
            type: 'manual/newNodeInit',
            init() {
                window.setPropertyAdvance({ key: 'classify', value: 'manual' }, selectedShape)
                window.quickAddItem('ExclusiveGateway')
            }
        })
        return
    }
    if (name == 'Service task') {
        window.reduxStore.dispatch({
            type: 'service/newNodeInit',
            init() {
                // window.setPropertyAdvance({ key: 'classify', value: 'Circulation' }, selectedShape)
            }
        })
        return
    }
    if (name == 'Subflow') {
        window.reduxStore.dispatch({
            type: 'subflow/newNodeInit',
        })
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