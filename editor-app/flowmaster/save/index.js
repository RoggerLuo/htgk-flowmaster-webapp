import integrity from './integrity'
import round1nodes from './round1nodes'
import round2repo from './round2repo'
import round3nodes from './round3nodes'

import roundFinal from './roundFinal'
import originalSave from './originalSave'

export default function($scope, $http) {
    return function(callback) {
        rdx.store.dispatch({ type: 'saveDeactive' }) //写全称不会active

        if ( 
            !(integrity() && round1nodes() && round2repo() && round3nodes())  //这个的顺序很重要
        ) return rdx.save()
            

        roundFinal($scope)


        if (!fm.parallelGate.isReadyForSave()) return rdx.save()
        rdx.dispatch({ type: 'callSpin' }) /* 等待动画 */
        originalSave($scope, $http, callback) /* orginal save */
    }
}


