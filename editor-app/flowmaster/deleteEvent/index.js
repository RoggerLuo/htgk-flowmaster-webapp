'use strict'
import multi from './multi'
import manual from './manual'
import fatherAndSon from './fatherAndSon'
import deleteSideLines from './deleteSideLines'

global.globalLockForMultiWarning = false

global.deleteNode = (selection, that) => {
    const name = selection[0].properties['oryx-name']
    let index = -1
    fm.nameManager.repo.some((el,ind)=>{
        if(el.name == name){
            index = ind
            return true
        }
    })

    if (index > -1) {
        fm.nameManager.repo.splice(index, 1)
    }

    global.globalLockForMultiWarning = true
    const rt = main(selection,that)
    global.globalLockForMultiWarning = false
    return rt
}
function main(selection,that){
    const el = fatherAndSon(selection,that)
    if(multi(el) == 'stop') return 'stop'
    if(manual(el) == 'stop') return 'stop'
    deleteSideLines(el)
}