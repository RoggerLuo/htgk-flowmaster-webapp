
export default function(shape) { /* 返回true说明验证不通过 */
    if(is_exclusive_gate(shape)){
        if(is_without_click(shape)){
            return true
        }else{
            return false                    
        }
    }else{
        return false
    }
}


function is_without_click(shape){
    if (!shape.properties.defaultflow && !shape.properties.conditionsequenceflow) {
        window.showAlert('保存失败，节点"' + fm.getTitle(fm.getIncoming(shape)) + '"的分支条件和规则不能为空')
        fm.spotlight(shape)
        return true
    }else{
        return false
    }
}

function is_exclusive_gate(shape){
    const incomingShape = fm.getIncoming(shape)
    if (fm.multi.is.gateway(incomingShape)) return false
    if (fm.manual.is.gateway(incomingShape)) return false
    return true
}