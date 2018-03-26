import start from './start'

export default function(){ //$scope            
    fm.getJson().childShapes.some((el, index) => {
        
        if (global.globalLockForMultiWarning) return

        const shape = fm.getNodeById(el.resourceId)
        if(!shape) return //有可能被undo了

        switch(el.stencil.id){
            case 'StartNoneEvent':
                start(shape)
                break
            case 'ManualTask':
                fm.manual.singleConnectCheck(shape)
                fm.manual.completeCheck(shape)
                break
            case 'MultiUserTask':
                fm.multi.connectRules(shape)
                break
            case 'CirculationTask':
                fm.circulation.isSuccessive(shape)
                if(!fm.circulation.isSingleBranch(shape)) fm.undo()
                break
            case 'ServiceTask':
                fm.subflow.connectRules(el)
                break
        }
    })
}
