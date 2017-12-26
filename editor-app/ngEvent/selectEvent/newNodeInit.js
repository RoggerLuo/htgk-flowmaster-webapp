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
            init() {}
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
        reduxStore.dispatch({ type: 'subflow/newNodeInit' })
        return
    }


    /* 如果是分支节点的sf */
    if (fm.branch.is(selectedShape)) {
        rdx.put('branch', 'touch')
        return
    }

    /* 如果是普通的sf */
    if (name == 'Sequence flow') {
        rdx.put('sf', 'touch')
        return
    }
}