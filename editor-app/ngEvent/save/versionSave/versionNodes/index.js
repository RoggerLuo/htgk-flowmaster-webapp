'use strict'
import usertaskPattern from './usertaskPattern'
import service from './service'
import saveHandlerParallel from './parallel'

export default function($scope) {
    const canvas = $scope.editor.getCanvas() /* 把redux转换成oryx数据, 顺序很重要 */
    usertaskPattern(canvas, 'usertask')
    usertaskPattern(canvas, 'manual')
    service(canvas)
    saveHandlerParallel(canvas)
}