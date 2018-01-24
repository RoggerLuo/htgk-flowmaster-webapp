'use strict'
import { titleToCN } from "./conf"

global.isRepeated = (name) => { /* 节点名称是否重复 */
    return fm.getJson().childShapes.some((el, index) => el.properties.name == name)
}
global.giveName = (cate) => {
    /* 如果“审批”有3个，那就是“审批3”，如果重复，则加1，加到不重复为止 */
    let num = 1
    let name = titleToCN[cate] + num
    while (isRepeated(name)) {
        num += 1
        name = titleToCN[cate] + num
    }
    return name
}

function giveNameToShape(shape) {
    if (shape.properties["oryx-name"] != '') return //如果没有名字
    if (fm.getTitle(shape) == 'Sequence flow') return
    if (fm.branch.is(shape)) return
    if (fm.multi.is.sf(shape)) return
    if (fm.manual.is.sf(shape)) return
    
    shape.setProperty('oryx-name', giveName(shape._stencil._jsonStencil.title))
}

function autoNaming(selectedShape, $scope) {
    giveNameToShape(selectedShape)
    rdx.save()
}

export default autoNaming