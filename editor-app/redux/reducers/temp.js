import { toJS, fromJS, List, Map } from 'immutable'
import reduceWrap from './tools/reduceWrap'
import transformer from './tools/transformer'

export default reduceWrap('all', {}, (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'temp':
            if (ind == 'not exist') return data.updateIn(['repo'], '', (a) => a.push(fromJS({id:state.id})))
            return transformer(data, ind, action.args)
        default:
            return state
    }
})