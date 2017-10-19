'use strict'
import './VUEcover'
import './deleteNode'
import './updateBranchText'
import './tool-oryx-identify-nodes'

/* both ng and react */
global.activeSave = () => {
    global.reduxStore.dispatch({ type: 'saveActive' })
}

/* reactTools */
global.isRepeated = (name) => { /* 节点名称是否重复 */
    return window.getRawJson().childShapes.some((el, index) => {
        return el.properties.name == name
    })
}

/* ngEvent */
window.lastSelectedShape = false
window.canvasFlag = false
window.lastSelectedItem = false
window.pidName = 'pidName'
window.getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//app.js
//stencilcontroller.js
global.beforeShapeUpdate = () => {
    if (saveButton.flag) { //必须在页面tpl加载之后才加载
        saveButton.render()
        saveButton.flag = false
    }
    global.inputBlurred && global.inputBlurred()
}
