import {fromJS,List, Map} from 'immutable';

const initial = {
    repo:[
        {
            data:[ //循环出现的
                []
            ],
            id:'initial'
        },
    ],
    mode:'normal',
    id:'initial'
}

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    // debugger
    const currentIndex = data.get('repo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
    switch (action.type) {
        
        case 'parallelDataInit':
            return data.updateIn(['repo'], 'initial', (el) => {
                return el.push(fromJS(action.data))
            }).toJS()

        case 'parallelInit':
            if (!currentIndex && (currentIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, data:[[]]})
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
            if (!currentIndex && (currentIndex != 0) ) { //如果 不存在
                const newCreate = fromJS({ id: state.id, data: [[]] })
                return data.updateIn(['repo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            return data.updateIn(['repo',currentIndex],'initial',(el)=>{
                return el.set('data',el.get('data').push([]))
            }).toJS()

        case 'deleteGroup':
            return data.updateIn(['repo',currentIndex,'data'],'initial',(el)=>{
                return el.delete(action.groupIndex)
            }).toJS()

        case 'addCharacter':
            const flag = state.repo[currentIndex].data.some((el, index) => {
                if (el.text == action.item.text) {
                    alert('已经存在"' + action.item.text + '"的选项')
                    return true
                }
            })
            if (flag) {
                return state 
            }
            return data.updateIn(['repo',currentIndex,'data',action.index],'initial',(el)=>{
                return el.push(action.item)
            }).toJS()

        case 'deleteCharacter':
            return data.updateIn(['repo',currentIndex,'data',action.groupIndex],'initial',(el)=>{
                return el.delete(action.characterIndex)
            }).toJS()

        default:
            return state
    }
}

export default Reducer
