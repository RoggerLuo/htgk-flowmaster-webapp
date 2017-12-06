import {multiCompleteCheck} from './multi'
import {manualCompleteCheck} from './manual'
global.everyMove = function(){
    window.getRawJson().childShapes.some((el, index) => {
        if (global.globalLockForMultiWarning) return
        switch(el.stencil.id){
            case 'ManualTask':
                manualCompleteCheck(el)
                break
            case 'MultiUserTask':
                multiCompleteCheck(el)
                break
        }
    })
}
