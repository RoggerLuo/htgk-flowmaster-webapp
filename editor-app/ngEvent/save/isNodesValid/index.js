'use strict'
import sf from './sf'
import subflow from './subflow'
import usertaskPattern from './usertaskPattern'
import service from './service'
import saveHandlerEndPoint from './endPoint'
import branch from './branch'
import branchNode from './branchNode'
import saveHandlerParallel from './parallel'

export default function($scope) {
    const canvas = $scope.editor.getCanvas() /* 把redux转换成oryx数据, 顺序很重要 */
    const isThereProblem = true


    if (!subflow(canvas)) return false
    if (!branch(canvas)) return false
    if (!sf(canvas)) return false


    usertaskPattern(canvas, 'usertask')
    usertaskPattern(canvas, 'manual')
    service(canvas)
    saveHandlerParallel(canvas)
    saveHandlerEndPoint(canvas)
    branchNode(canvas)

    return isThereProblem
}