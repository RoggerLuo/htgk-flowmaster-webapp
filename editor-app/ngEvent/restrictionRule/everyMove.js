import {multiCompleteCheck} from './multi'
import {manualCompleteCheck} from './manual'
import CirculationTask from './CirculationTask'
fm.restrictionRule_everyMove = function($scope){    
    // if(fm.isParallelCorrectlyLinked()) fm.undo()
    // if(fm.versionModel) fm.undo()
        
    window.getRawJson().childShapes.some((el, index) => {
        if (global.globalLockForMultiWarning) return
        switch(el.stencil.id){
            case 'ManualTask':
                manualCompleteCheck(el)
                break
            case 'MultiUserTask':
                multiCompleteCheck(el)
                break
            case 'CirculationTask':
                CirculationTask(el)
                break
        }
    })

}
