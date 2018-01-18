export default function(el) {
    const shape = fm.getShapeById(el.resourceId)
    const nextShape = fm.getOutgoingX2(shape)
    if(nextShape){
        if (fm.getTitle(nextShape) == 'Subflow') {
            window.showAlert('不支持设置2个连续的子流程节点')
            fm.undo()
            return
        }
    }

    const previousShape = fm.getIncomingX2(shape)
    if(previousShape){
        switch (fm.getTitle(previousShape)) {
            case 'Circulation task':
                window.showAlert('子流程前不能连接传阅节点')
                fm.undo()
                break
            case 'Inclusive gateway':
                window.showAlert('子流程前不能连接并行汇聚节点')
                fm.undo()
                break
            case 'Subflow':
                window.showAlert('不支持设置2个连续的子流程节点')
                fm.undo()
                break
        }
        if(fm.multi.is.gateway(previousShape)){
            window.showAlert('子流程前不能连接会签节点')
            fm.undo()
        }
    }
}