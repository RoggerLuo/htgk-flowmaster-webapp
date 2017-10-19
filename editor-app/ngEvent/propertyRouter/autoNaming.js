'use strict'
import { titleToCN } from "./config"

const giveName = (cate) => {
    /* 如果“审批”有3个，那就是“审批3”，如果重复，则加1，加到不重复为止 */
    let num = 1
    let name = titleToCN[cate] + num
    while (isRepeated(name)) {
        num += 1
        name = titleToCN[cate] + num
    }
    return name
}
global.giveName = giveName
function autoNaming(selectedShape, $scope) {
    /* 
        selectedShape来自event
        updatePropertyInModel依赖scope上定义的函数
        全局依赖activeSave，好乱，要整理成一个依赖集合
    */
    if (selectedShape.properties["oryx-name"] == '') {
        if (selectedShape._stencil._jsonStencil.title != "Sequence flow") {
            $scope.updatePropertyInModel({ key: 'oryx-name', value: giveName(selectedShape._stencil._jsonStencil.title) })
            window.activeSave()
        }
    }
}

export default autoNaming