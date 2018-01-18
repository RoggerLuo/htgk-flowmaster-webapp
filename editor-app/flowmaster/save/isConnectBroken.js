export default ($scope) => {
    const isConnectBroken = window.getRawJson().childShapes.some((el, index) => {

        if (el.stencil.id == 'EndNoneEvent' || el.stencil.id == 'EndErrorEvent') return false
        if (el.outgoing.length != 0) return false


        if (el.stencil.id == 'SequenceFlow') {
            let sequenceflow = window.windowCanvas.getChildShapeByResourceId(el.resourceId)
            const name = sequenceflow.properties["oryx-name"] || ''
            if (name != '') window.showAlert('连线"' + name + '"未连接上其他节点')
            else window.showAlert('有至少一条连线未连接上其他节点')
        }

        let nodeName = el.properties.name && '"' + el.properties.name + '"' || ''
        window.showAlert('节点' + nodeName + '未连接上其他节点')
        return true
    })
    return isConnectBroken
}