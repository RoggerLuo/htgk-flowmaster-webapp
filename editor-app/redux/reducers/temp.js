import { toJS, fromJS, List, Map } from 'immutable'
import reduceWrap from './tools/reduceWrap'
import transformer from './tools/transformer'
export default reduceWrap('all', {}, (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'temp':
            if (ind == 'not exist') {
                const blankNode = fromJS({id:state.id})
                const add_node_to_repo = (repo) => repo.push(blankNode)
                data = data.updateIn(['repo'], '', add_node_to_repo)
            }
            const func = transformer(data, ind)
            return action.f(func)

        default:
            return state
    }
})