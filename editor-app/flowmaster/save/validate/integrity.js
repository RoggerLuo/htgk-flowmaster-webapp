export default () => {
    // 完整性检查 round1
    return !fm.getNodes().some(shape => {
        // 如果这个节点没问题 就跳过
        if(incomingCheck(shape) && outgoingCheck(shape)){
            return false  
        }else{
            hint(shape)
            return true
        } 
    })
}

function hint(shape){
    // 如果有问题，就具体看看问题是什么
    if (fm.getTitle(shape) == 'Sequence flow') {
        const name = shape.properties["oryx-name"] || ''
        if (name != '') {
            window.showAlert('连线"' + name + '"未连接上其他节点')
        }else{
            window.showAlert('有至少一条连线未连接上其他节点')
        } 
    }else{
        let nodeName = shape.properties["oryx-name"] && ('"' + shape.properties["oryx-name"] + '"') || ''
        window.showAlert('节点' + nodeName + '未连接上其他节点')            
    }
}

function incomingCheck(shape){
    if(fm.getTitle(shape) == 'Start event') return true
    if (shape.incoming.length == 0) return false
    return true
}

function outgoingCheck(shape){
    if(fm.getTitle(shape) == 'End event') return true
    if (shape.outgoing.length == 0) return false
    return true
}
