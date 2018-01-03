export default ($scope) => {
    var json = window.getRawJson()

    return json.childShapes.some((el, index) => {
        switch (el.stencil.id) {
            case 'SequenceFlow':
                if (!el.properties["name"]) {
                    const resourceId = el.outgoing && el.outgoing[0] && el.outgoing[0].resourceId || false
                    const nextElement = windowCanvas.getChildShapeByResourceId(resourceId)
                    window.showAlert(`连接“${nextElement.properties["oryx-name"]}”节点的<span style="color:orange">连线</span>未命名`)
                    return true
                }
                break
        }
    })
}