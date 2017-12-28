export default function(selectedShape) {
    let name = selectedShape._stencil._jsonStencil.title
    
    switch(name){
        case 'User task':
            rdx.put('usertask', 'touch') 
            break
        case 'Sequence flow':
            if (fm.branch.is(selectedShape)){
                rdx.put('branch', 'touch')  
                break 
            } 
            rdx.put('sf', 'touch')
            break
        case 'Subflow':
            reduxStore.dispatch({ type: 'subflow/newNodeInit' })
            break
    }


    if (name == 'Circulation task') {
        window.reduxStore.dispatch({type: 'circulation/newNodeInit',})
        return
    }
    if (name == 'Multi user task') {
        window.reduxStore.dispatch({
            type: 'parallel/newNodeInit',
            init() {
                window.quickAddItem('ExclusiveGateway')
            }
        })
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
}


