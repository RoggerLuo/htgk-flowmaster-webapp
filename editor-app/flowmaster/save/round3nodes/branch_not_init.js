/* 返回true说明验证不通过 */
export default function(shape) { 
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
    const notDefaultflow = (shape.properties.defaultflow == 'false' || !shape.properties.defaultflow)
    if ( notDefaultflow && !shape.properties.conditionsequenceflow) {
        window.showAlert('保存失败，节点"' + fm.getIncoming(shape).properties['oryx-name'] + '"的分支条件和规则不能为空')
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