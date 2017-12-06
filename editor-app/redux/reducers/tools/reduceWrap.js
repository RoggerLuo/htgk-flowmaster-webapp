import { toJS, fromJS, List, Map } from 'immutable'
const initial = {repo: [],id:''}
export default function(stencilTitle, initialState = initial, cb ){
    initialState = Object.assign({}, initial, initialState)
    return function(state = initialState, action) {
        //if切换组件
        if (action.type == 'switchElement') { 
            return Object.assign({}, state, { id: action.nextId, stencilTitle: action.nextStencilTitle })
        }
        //if not this reduce
        const ifNotInit = action.type.indexOf('init') == -1
        const titleIsWrong = (state.stencilTitle != stencilTitle) && (stencilTitle != 'all')
        if ( titleIsWrong && ifNotInit ) return state 
        //currentInd
        let ind = fromJS(state).get('repo').findKey((el, index, iter) => el.get('id') == state.id)
        if (!ind && (ind != 0)) ind = 'not exist'
        return cb(state, action, ind)
    }
}
