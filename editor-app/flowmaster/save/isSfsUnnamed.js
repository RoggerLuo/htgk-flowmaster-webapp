export default ($scope) => {
    var json = fm.getJson()
    return json.childShapes.some((el, index) => {
        switch (el.stencil.id) {
            case 'SequenceFlow':
                if (!el.properties["name"]) {

                    const shape = fm.getShapeById(el.resourceId)
                    if (fm.manual.is.sfInTheMiddle(shape)) break

                    /* 定位的关键代码 */
                    fm.editor.setSelection([shape])
                    fm.editor.updateSelection()

                    const nextResourceId = el.outgoing && el.outgoing[0] && el.outgoing[0].resourceId || false
                    const nextShape = fm.getShapeById(nextResourceId)
                    window.showAlert(`连接到“${nextShape.properties["oryx-name"]}”节点的<span style="color:orange">连线</span>未命名`)
                    return true
                }
                break
        }
    })
}