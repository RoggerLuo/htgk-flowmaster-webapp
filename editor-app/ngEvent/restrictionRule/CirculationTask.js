export default function (el) {
    const nextResourceId = el.outgoing && el.outgoing[0] && el.outgoing[0].resourceId || false
    if(!nextResourceId) return 

    const nextElement = windowCanvas.getChildShapeByResourceId(nextResourceId)
    const nextNextElement = nextElement.outgoing && nextElement.outgoing[0] ||false
    if(!nextNextElement) return
    if(nextNextElement._stencil._jsonStencil.title == 'Circulation task') {
        window.showAlert('不支持设置2个连续的传阅节点')
        fm.undo()
    }
}