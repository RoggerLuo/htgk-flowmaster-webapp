var myEvent = {
    
}
function updateNextElement(selectedShape){
    if (selectedShape._stencil._jsonStencil.title != 'Sequence flow') {
        return false;
    }
    if (selectedShape.incoming[0] && selectedShape.incoming[0]._stencil._jsonStencil.title){
        switch(selectedShape.outgoing[0]._stencil._jsonStencil.title){
            case 'User task':
                window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (审批节点)';
                break;
            case 'Exclusive gateway':
                window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (分支节点)';
                break;
            case '':
            break;
        }
    }
}

function limitedCondition(option) {
    /* sequnce flow 的限制 */
    if (option.connectedShape && (option.connectedShape._stencil._jsonStencil.title == 'Exclusive gateway')) {
    }
    /* 审批节点的限制 */
    if (option.connectedShape && (option.connectedShape._stencil._jsonStencil.title == 'User task')) {
        var branchCounter = 0;
        option.connectedShape.outgoing.forEach(function(el) {
            // if (el._stencil._jsonStencil.title == 'Sequence flow'){
            branchCounter += 1;
            // }
        });
        if (branchCounter >= 1) {
            alert('审批节点不能有分支');
            return false;
        }
    }
    return true;
}


