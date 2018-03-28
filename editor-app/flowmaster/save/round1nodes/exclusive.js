export default function(shape) {

    /* 返回true说明验证不通过 */

    // 分支数量限制
    if (shape.outgoing.length < 2) {
        window.showAlert('使用分支节点需要两个以上的分支')
        fm.spotlight(shape)
        return false
    }   


    // classify标志
    if (fm.manual.is.gateway(shape)) {
        shape.setProperty('classify', 'manual')
    }
    return true

}
