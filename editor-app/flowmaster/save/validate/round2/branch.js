export default function(shape) {
    
    /* 返回true说明验证不通过 */

    /* 如果是 会签分支 */
    if (fm.multi.is.gateway(shape)) return false
    /* 如果是 人工分支 */
    if (fm.manual.is.gateway(shape)) return false

    /*  update 空值不能提交 */
    shape.outgoing.forEach((shape2) => {
        if (!shape2.properties.defaultflow && !shape2.properties.conditionsequenceflow) {
            window.showAlert('保存失败，节点"' + fm.getTitle(fm.getIncoming(shape2)) + '"的分支条件和规则不能为空')
            fm.spotlight(shape2)
        }
    })
    return true

}
