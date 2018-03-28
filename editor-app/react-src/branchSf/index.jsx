import Component from './Component'
import updateText from './updateText'
global.fm = global.fm || {}
fm.branchSf = {}
fm.branchSf.updateText = updateText
fm.branchSf.component = Component
fm.branchSf.emptyWarning = (sf) => {
    const nodeName = fm.getIncoming(sf).properties['oryx-name']
    window.showAlert(`保存失败，节点"<span style='color:orange;'>${nodeName}</span>"的分支条件和规则不能为空`)
    fm.setProperty_and_updateView({ key: 'oryx-name', value: '' }, sf)
    fm.spotlight(sf)
}
fm.branchSf.is = function(shape){
    const incomingShape = fm.getIncoming(shape)
    if (fm.multi.is.gateway(incomingShape)) return false
    if (fm.manual.is.gateway(incomingShape)) return false
    return fm.getTitle(incomingShape) === 'Exclusive gateway'
}