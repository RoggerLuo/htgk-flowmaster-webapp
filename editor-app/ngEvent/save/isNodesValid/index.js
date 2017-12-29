'use strict'
import sf from './sf'
import subflow from './subflow'
import usertaskPattern from './usertaskPattern'
import service from './service'
import saveHandlerEndPoint from './endPoint'
import saveHandlerBranch from './branch'
import saveHandlerBranchNode from './branchNode'
import saveHandlerParallel from './parallel'

export default function($scope) {
    const canvas = $scope.editor.getCanvas() /* 把redux转换成oryx数据, 顺序很重要 */
    const isThereProblem = true


    if (!subflow(canvas)) return false
    if (!sf(canvas)) return false
    if (!saveHandlerBranch(canvas)) return false


    usertaskPattern(canvas, 'usertask')
    usertaskPattern(canvas, 'manual')
    service(canvas)
    saveHandlerParallel(canvas)
    saveHandlerEndPoint(canvas)
    saveHandlerBranchNode(canvas)
    
    return isThereProblem
}