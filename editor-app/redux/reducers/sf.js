import { toJS, fromJS, List, Map } from 'immutable'
import { reduceWrap, transformer } from '../tools'

const newNode = id => fromJS({ id, businessStatus: { text: '请选择', value: false }})

export default reduceWrap('Sequence flow', (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'sf':
            if (ind == 'not exist') return data.updateIn(['repo'], '', (a) => a.push(newNode(state.id))).toJS()                
            return transformer(data, ind, action.args)

        case 'sf/init':
            return data.updateIn(['repo'], List(), (a) => a.push(action.data)).toJS()

        default:
            return state
    }
})