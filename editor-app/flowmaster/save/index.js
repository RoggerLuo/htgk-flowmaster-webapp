import './utils'
import integrityValidate from './integrityValidate'
import round1nodes from './round1nodes'
import inRepoValidate from './inRepoValidate'
import notInRepoValidate from './notInRepoValidate'
import roundFinal from './roundFinal'
import originalSave from './originalSave'

export default function($scope, $http) {
    return function(callback) {

        const integrity = integrityValidate()
        console.log('integrity',integrity)
        if(!integrity) return 

        const round1 = round1nodes()
        console.log('round1',round1)
        if(!round1) return 

        const inRepo = inRepoValidate()
        console.log('inRepo',inRepo)
        if(!inRepo) return 

        const notInRepo = notInRepoValidate()
        console.log('notInRepo',notInRepo)
        if(!notInRepo) return 

        roundFinal($scope)
        if (!fm.parallelGate.isReadyForSave()) return rdx.save()
        rdx.dispatch({ type: 'callSpin' }) /* 等待动画 */
        originalSave($scope, $http, callback) /* orginal save */
        rdx.store.dispatch({ type: 'saveDeactive' }) //写全称不会active
    }
}