import { toJS, fromJS, List, Map } from 'immutable'
import reduceWrap from './tools/reduceWrap'
const uniqAdd = (data, item) => {
    data = data.slice() //克隆immutable数据
    if (data.some(el => el.value == item.value)) return data
    data.push(item)
    return data
}

/*


    {   
        id:当前id,
        repo:[
        
            {
                id: '123',
                subProcess: {}, 
                data:[
                    {}
                ],
                mainForm:{},
                leftFields,
                mainRight:{},

            },
        
        ]
    }



*/
const newCreate = (id, data) => fromJS({ id, data, isWaiting: true, subProcess: {} })

export default reduceWrap('Subflow', {}, (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'subflow/init':
            return data.updateIn(['repo'], 'initial', (el) => {
                return el.push(fromJS(action.data))
            }).toJS()

        case 'subflow/newNodeInit':
            if (ind == 'not exist') return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate(state.id, []))).toJS()                  
            return state

        case 'subflow/add':
            if (ind == 'not exist') return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate(state.id, [action.item]))).toJS()                
            return data.updateIn(['repo', ind], 'initial', (el) => el.set('subProcess', action.subProcess) ).toJS()

        case 'subflow/addRole':
            if (ind == 'not exist') return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate(state.id,[action.item]))).toJS()                
            const poolData = state.repo[ind].data
            return data
                .updateIn(['repo', ind], 'initial', (el) => el.set('data', fromJS(uniqAdd(poolData, action.item))) ).toJS()

        case 'subflow/clear':
            return data.updateIn(['repo', ind, 'data'], [], (el) => fromJS([])).toJS()

        case 'subflow/deleteRole':
            return data.updateIn(['repo', ind], 'initial', (el) => {
                return el.set('data', el.get('data').delete(action.index))
            }).toJS()
        case 'subflow/isWaiting':
            return data.updateIn(['repo', ind, 'isWaiting'], 'true', (el) => action.isWaiting).toJS()
        case 'subflow/leftFields':
            return data.updateIn(['repo', ind, 'leftFields'], '', (el) => action.leftFields).toJS()
        case 'subflow/mainRight':
            return data.updateIn(['repo', ind, 'mainRight',action.fieldId], {}, (el) => action.item).toJS()


            //deprecated .updateIn(['repo', ind, 'cate'], false, (el) => action.item.cate)
            /*case 'approve/previousNodeSpecifiedChange':
                if (ind == 'not exist') {
                    const newCreate = fromJS({ id: state.id, data: [],previousNodeSpecified:true})
                    return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
                }
                return data.updateIn(['repo', ind, 'previousNodeSpecified'], false, (el) => !el).toJS()
            case 'approve/enableSingleSelectChange':
                return data.updateIn(['repo', ind, 'enableSingleSelect'], false, (el) => !el).toJS()

                
            */
            // case 'custom/oninput':
            //     if (ind == 'not exist') {
            //         const newCreate = fromJS({ id: state.id, url: '' })
            //         return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
            //     }
            //     return data.updateIn(['repo', ind, 'url'], '', (el) => action.url).toJS()


        default:
            return state
    }
})