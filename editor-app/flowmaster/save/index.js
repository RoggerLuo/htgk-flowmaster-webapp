import integrity from './integrity'
import round1nodes from './round1nodes'
import repoValidate from './repoValidate'
import round3nodes from './round3nodes'
import roundFinal from './roundFinal'
import originalSave from './originalSave'

export default function($scope, $http) {
    return function(callback) {
        if ( //这个的顺序很重要
            integrity() &&
            round1nodes() &&
            repoValidate() &&
            round3nodes()
        ) {
            roundFinal($scope)
            if (!fm.parallelGate.isReadyForSave()) return rdx.save()
            rdx.dispatch({ type: 'callSpin' }) /* 等待动画 */
            originalSave($scope, $http, callback) /* orginal save */
            rdx.store.dispatch({ type: 'saveDeactive' }) //写全称不会active
        }
    }
}