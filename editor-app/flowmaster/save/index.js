import './utils'
import integrityValidate from './integrityValidate'
import preliminaryValidate from './preliminaryValidate'
import inRepoValidate from './inRepoValidate'
import notInRepoValidate from './notInRepoValidate'
import roundFinal from './roundFinal'
import originalSave from './originalSave'

export default function($scope, $http) {
    return function(callback) {
        //顺序很重要
        const integrity = integrityValidate()
        console.log('integrity',integrity)
        if(!integrity) return 
        
        const preliminary = preliminaryValidate() //round1
        console.log('preliminary',preliminary)
        if(!preliminary) return 
        
        const inRepo = inRepoValidate() //round2
        console.log('inRepo',inRepo)
        if(!inRepo) return 
        
        const notInRepo = notInRepoValidate() //round3
        console.log('notInRepo',notInRepo)
        if(!notInRepo) return 

        roundFinal($scope)
        if (!fm.parallelGate.isReadyForSave()) return rdx.save()
        rdx.dispatch({ type: 'callSpin' }) /* 等待动画 */
        originalSave($scope, $http, callback) /* orginal save */
        rdx.store.dispatch({ type: 'saveDeactive' }) //写全称不会active
    }
}