'use strict'


/* both ng and react */
global.activeSave = () => {
    global.reduxStore.dispatch({ type: 'saveActive' })
}



/* reactTools */
/* 节点名称是否重复 */
global.isRepeated = (name) => { 
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
import { fetchModelWrap } from './initialize'
global.fetchModelWrap = fetchModelWrap
//stencilcontroller.js
global.beforeShapeUpdate = () => {
    if (saveButton.flag) { //必须在页面tpl加载之后才加载
        saveButton.render()
        saveButton.flag = false
    }
    global.inputBlurred && global.inputBlurred()
}




/* UI 交互 */
/* 和vue部分的阴影遮罩一致 */
const shadowCallback = (e) => {
    window.removeEventListener("message", shadowCallback, false)
}
window.callShadow = () => {
    window.addEventListener('message', shadowCallback, false)
    let message = { type: "openShadow" }
    window.parent.postMessage(message, '*')
}
/* 和vue部分的阴影遮罩一致 */
const hideShadowCallback = (e) => {
    window.removeEventListener("message", hideShadowCallback, false)
}
window.hideShadow = () => {
    window.addEventListener('message', hideShadowCallback, false)
    let message = { type: "closeShadow" }
    window.parent.postMessage(message, '*')
}
const checkIfModified = (e) => {
    if (e.data.type == 'checkIfModified') {
        const isActive = window.reduxStore.getState().common.active //true就是修改了，false就是没修改
        const message = { type: "checkIfModified", value: isActive }
        window.parent.postMessage(message, '*')
    }
    // window.removeEventListener("message",checkIfModified, false)
}
window.addEventListener('message', checkIfModified, false)
