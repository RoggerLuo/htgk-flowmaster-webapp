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
    if (name == 'User task') {
        window.reduxStore.dispatch({
            type: 'approve/newNodeInit',
            init() {
                // window.setPropertyAdvance({ key: 'classify', value: 'manual' }, selectedShape)
                // window.quickAddItem('ExclusiveGateway')
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
    if (name == 'Circulation task') {
        window.reduxStore.dispatch({
            type: 'circulation/newNodeInit',
            init() {
                // window.setPropertyAdvance({ key: 'classify', value: 'Circulation' }, selectedShape)
            }
        })
        return
    }
    if (name == 'Subflow') {
        reduxStore.dispatch({type: 'subflow/newNodeInit'})
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