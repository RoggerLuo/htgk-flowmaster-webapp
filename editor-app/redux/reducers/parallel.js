import { fromJS, List, Map } from 'immutable';
import reduceWrap from './tools/reduceWrap'
// const initial = {
//     repo:[
//         // {
//         //     data:[ 
//         //         []
//         //     ],
//         //     id:'initial'
//         // },
//     ],
//     mode:'normal',
//     id:'initial'
// }
const uniqAdd = (data, item) => {
    data = data.slice() //克隆immutable数据
    if (data.some(el => el.value == item.value)) return data
    data.push(item)
    return data
}

export default reduceWrap('Multi user task', (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'parallel/init':
            return data.updateIn(['repo'], 'initial',
                (el) => el.push(fromJS(action.data))
            ).updateIn(['mode'], 'normal', (el) => 'normal').toJS()

        case 'parallel/optionInit':
            if (ind == 'not exist') {
                window.quickAddItem('ExclusiveGateway')
                const newCreate = fromJS({ id: state.id, data: [
                        []
                    ] })
                return data.updateIn(['repo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            return state

        case 'switchElement':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'modeChange':
            return Object.assign({}, state, {
                mode: action.value
            })
        case 'addGroup':
            if (ind == 'not exist') {
                const newCreate = fromJS({ id: state.id, data: [
                        []
                    ] })
                return data.updateIn(['repo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            return data.updateIn(['repo', ind], 'initial', (el) => {
                return el.set('data', el.get('data').push([]))
            }).toJS()

        case 'deleteGroup':
            return data.updateIn(['repo', ind, 'data'], 'initial', (el) => {
                return el.delete(action.groupIndex)
            }).toJS()

        case 'parallel/addChar':
            const poolData = state.repo[ind].data[action.index]
            return data.updateIn(['repo', ind, 'data', action.index], 'initial', (el) => {
                return fromJS(uniqAdd(poolData, action.item))
            }).toJS()

        case 'deleteCharacter':
            return data.updateIn(['repo', currentIndex, 'data', action.groupIndex], 'initial', (el) => {
                return el.delete(action.characterIndex)
            }).toJS()

        default:
            return state
    }
})
