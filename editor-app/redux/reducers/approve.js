import { toJS, fromJS, List, Map } from 'immutable';

const initial = {
    approveListRepo: [
        // {id:'id',data:'obj'}
    ],
    id:''
}

const Reducer = (state = initial, action) => {
    let data = fromJS(state)

    switch (action.type) {
        case 'approveDataInit':
            return data.updateIn(['approveListRepo'], 'initial', (el) => {
                return el.push(fromJS(action.data))
            }).toJS()

        case 'switchElement':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'pushApproveList':
            let repoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            
            if (!repoIndex && (repoIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, data: [action.item] })
                return data.updateIn(['approveListRepo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }

            let flag = state.approveListRepo[repoIndex].data.some((el, index) => {
                if (el.text == action.item.text) {
                    // alert('已经存在"' + action.item.text + '"的选项')
                    return true
                }
            })
            if (flag) {
                return state 
            }

            return data.updateIn(['approveListRepo',repoIndex],'initial',(el)=>{
                return el.set('data',el.get('data').push(action.item))
            }).toJS()

        case 'removeApproveList':
            let repoI = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['approveListRepo',repoI],'initial',(el)=>{
                return el.set('data',el.get('data').delete(action.index))
            }).toJS()

        default:
            return state
    }
}

export default Reducer
