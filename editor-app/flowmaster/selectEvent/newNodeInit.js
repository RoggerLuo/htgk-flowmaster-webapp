export default function(shape) {
    let name = fm.getTitle(shape)
    
    switch(name){
        case 'User task':
            rdx.put('usertask', 'touch') 
            break
        
        case 'Sequence flow':
            if (!fm.multi.is.sf(shape)){                
                if (fm.branch.is(shape)){
                    rdx.put('branch', 'touch')  
                }else{
                    rdx.put('sf', 'touch')                                    
                }
            }
            break

        case 'Subflow':
            reduxStore.dispatch({ type: 'subflow/newNodeInit' })
            break
    }


    if (name == 'Circulation task') rdx.dispatch({type: 'circulation/newNodeInit'})

    if (name == 'Multi user task') {
        rdx.dispatch({
            type: 'parallel/newNodeInit',
            init() {
                window.quickAddItem('ExclusiveGateway')
            }
        })
    }

    if (name == 'Manual task') {
        rdx.dispatch({
            type: 'manual/newNodeInit',
            init() {
                // window.setPropertyAdvance({ key: 'classify', value: 'manual' }, shape)
                window.quickAddItem('ExclusiveGateway')
            }
        })
    }
}


