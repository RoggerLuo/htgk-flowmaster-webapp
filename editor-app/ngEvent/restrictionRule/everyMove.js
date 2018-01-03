import {multiCompleteCheck} from './multi'
import {manualCompleteCheck} from './manual'

fm.everyMove = function($scope){    
    if(fm.validParallelGate()) fm.undo()
    if(fm.versionModel) fm.undo()
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
