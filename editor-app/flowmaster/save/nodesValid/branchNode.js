export default function(canvas){
    canvas.children.forEach((el) => {
        if (el._stencil._jsonStencil.title == 'Sequence flow') {
            el.setProperty('defaultflow', "false")
        }
    })
    rdx.getState().branchNode.repo.forEach((el) => {
        let currentElement = canvas.getChildShapeByResourceId(el.choosed.value)
        if (el.resourceId && !currentElement) {
            return;
        }
        currentElement.setProperty('defaultflow', "true")
        currentElement.setProperty('conditionsequenceflow', '')
        currentElement.setProperty('reduxData', '')
    })
}
