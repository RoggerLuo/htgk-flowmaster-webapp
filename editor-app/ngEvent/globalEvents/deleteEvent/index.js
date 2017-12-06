'use strict'
import multi from './multi'
import manual from './manual'
import fatherAndSon from './fatherAndSon'
import deleteSideLines from './deleteSideLines'

global.globalLockForMultiWarning = false

global.deleteNode = (selection, that) => {
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