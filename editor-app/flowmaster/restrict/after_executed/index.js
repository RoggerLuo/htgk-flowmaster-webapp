import './CirculationTask'
import subflow from './subflow'

export default function(){ //$scope            
    fm.getJson().childShapes.some((el, index) => {
        
        if (global.globalLockForMultiWarning) return

        const shape = fm.getNodeById(el.resourceId)
        if(!shape) return //有可能被undo了
        switch(el.stencil.id){
            case 'ManualTask':
                fm.manual.singleConnectCheck(shape)
                fm.manual.completeCheck(shape)
                break
            case 'MultiUserTask':
                fm.multi.completeCheck(shape)
                if(!fm.multi.selectCheck.multi(shape)) fm.undo()
                break
            case 'CirculationTask':
                fm.circulation.isSuccessive(shape)
                if(!fm.circulation.isSingleBranch(shape)) fm.undo()
                break
            case 'ServiceTask':
                subflow(el)
                break
        }
    })
}
