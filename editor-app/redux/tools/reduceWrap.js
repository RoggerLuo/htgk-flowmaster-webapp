import { toJS, fromJS, List, Map } from 'immutable'
import findCurrentRepoInd from './findCurrentRepoInd'
const initialState = { repo: [], id: '' }

export default function(stencilTitle, cb) {
    return function(state = initialState, action) {
        //if切换组件
        if (action.type == 'switchElement') {
            return Object.assign({}, state, { id: action.nextId, stencilTitle: action.nextStencilTitle })
        }

        //if not this reduce
        const ifNotInit = action.type.indexOf('init') == -1
        if (state.stencilTitle) {
            const titleIsWrong = (state.stencilTitle != stencilTitle) && (stencilTitle != 'all')
            if (titleIsWrong && ifNotInit) return state
        }

        //currentInd
        const ind = findCurrentRepoInd(state)
        return cb(state, action, ind)
    }
}
