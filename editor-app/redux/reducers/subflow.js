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
                id: ,
                subProcess: , 
                data:,
            },
        
        ]
    }



*/
export default reduceWrap('Subflow', {}, (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'subflow/newNodeInit':
            if (ind == 'not exist') {
                const newCreate = fromJS({ id: state.id ,data:[]})
                return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
            }
            return state

        // case 'custom/oninput':
        //     if (ind == 'not exist') {
        //         const newCreate = fromJS({ id: state.id, url: '' })
        //         return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
        //     }
        //     return data.updateIn(['repo', ind, 'url'], '', (el) => action.url).toJS()

        case 'subflow/add': 
            if (ind == 'not exist') {
                const basic = { id: state.id, data: [action.item]} // cate: action.item.cate 
                const newCreate = fromJS(basic)
                return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
            }
            return data.updateIn(['repo', ind], 'initial', (el) => {
                return el.set('subProcess', action.subProcess)
            }).toJS()
            //deprecated .updateIn(['repo', ind, 'cate'], false, (el) => action.item.cate)
            /*case 'approve/previousNodeSpecifiedChange':
                if (ind == 'not exist') {
                    const newCreate = fromJS({ id: state.id, data: [],previousNodeSpecified:true})
                    return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
                }
                return data.updateIn(['repo', ind, 'previousNodeSpecified'], false, (el) => !el).toJS()
            case 'approve/enableSingleSelectChange':
                return data.updateIn(['repo', ind, 'enableSingleSelect'], false, (el) => !el).toJS()

            case 'approve/init':
                return data.updateIn(['repo'], 'initial', (el) => {
                    return el.push(fromJS(action.data))
                }).toJS()
                
            case 'approve/addRole': 
                if (ind == 'not exist') {
                    const basic = { id: state.id, data: [action.item]} // cate: action.item.cate 
                    const newCreate = fromJS(basic)
                    return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
                }
                const poolData = state.repo[ind].data
                return data
                    //deprecated .updateIn(['repo', ind, 'cate'], false, (el) => action.item.cate)
                    .updateIn(['repo', ind], 'initial', (el) => {
                        return el.set('data', fromJS(uniqAdd(poolData, action.item)))
                    }).toJS()
            case 'approve/deleteRole':
                return data.updateIn(['repo', ind], 'initial', (el) => {
                    return el.set('data', el.get('data').delete(action.index))
                }).toJS()
            case 'approve/clear':
                return data.updateIn(['repo', ind, 'data'], [], (el) => fromJS([])).toJS()*/

        default:
            return state
    }
})