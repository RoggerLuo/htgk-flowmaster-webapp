'use strict'
import sf from './sf'
import subflow from './subflow'
import usertaskPattern from './usertaskPattern'
import service from './service'
// import saveHandlerEndPoint from './endPoint'
import branch from './branch'
import branchNode from './branchNode'
import multi from './multi'

export default function($scope) {
    const canvas = $scope.editor.getCanvas() /* 把redux转换成oryx数据, 顺序很重要 */
    const isThereProblem = true

    branchNode(canvas) //branchNode要在sf之前，因为要先设置defaultflow
    if (!subflow(canvas)) return false
    if (!branch(canvas)) return false
    if (!sf(canvas)) return false


    usertaskPattern(canvas, 'usertask')
    usertaskPattern(canvas, 'manual')
    service(canvas)
    multi()
    // saveHandlerEndPoint(canvas)

    return isThereProblem
}