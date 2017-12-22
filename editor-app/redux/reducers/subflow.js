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
                isWaiting: , 
                isOne:true,
                mainForm:{},
                leftFields,
                mainRight:{
                    fieldsId:itemObj
                },
                subRights:{
                    leftFormId:{
                        rightFormId:'',
                        map:{
                            {fieldId:itemObj},
                            {fieldId:itemObj}
                        }
                    }

                }

            },
        
        ]
    }



*/
const newCreate = (id, data) => fromJS({ id, data, isOne: true, isWaiting: true, subProcess: {} })

export default reduceWrap('Subflow', {}, (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'subflow':
            // 传入初始模型
            // 传入data
            // 没了
            if (ind == 'not exist') return data.updateIn(['repo'], fromJS({}), (el) => el.push(newCreate(state.id, []))).toJS()

            const f = (op, path, item, type) => {
                if (!(path instanceof Array)) throw new  Error('Whoops! 输入的path不是数组，脑子秀逗了吧')
                if (type) { // 传入type的话，就自动校验, 针对数据结构复杂的情况
                    switch (type) {
                        case 'array':
                            if (!(item instanceof Array)) {
                                throw new  Error(`传入reduce数据类型错误，应该是${type}，却不是${type}`)
                            }
                            break

                        case 'string':
                        case 'object':
                        case 'boolean':
                            if (typeof(item) != type) {
                                throw new  Error(`传入reduce数据类型错误，应该是${type}，却不是${type}`)
                            }
                            break
                    }
                }
                item = fromJS(item)
                const replaceFunction = (op) => {
                    switch (op) {
                        case 'replace':
                            return (el) => item
                        case 'add':
                            return (el) => {
                                if (!List.isList(el)) throw new  Error('不是数组 不能使用add operation')
                                el.push(item)
                            }
                        case 'delete':
                            return (el) => el.push(item)
                        default:
                            throw new  Error('你传的是什么鬼operation参数？？')
                    }
                }
                const dataPath = ['repo']
                dataPath.push(...path)
                return data.updateIn(dataPath, '', replaceFunction(op)).toJS() //fromJS(initialValue)
            }

            return action.f(f)
            // 
            // {
            //     type: "subflow",
            //     f(cb) {
            //         cb(replace,['subProcess','prokey'],item,'string')
            //     }
            // }




        case 'subflow/init':
            return data.updateIn(['repo'], 'initial', (el) => {
                return el.push(fromJS(action.data))
            }).toJS()

        case 'subflow/newNodeInit':
            if (ind == 'not exist') return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate(state.id, []))).toJS()
            return state

        case 'subflow/add':
            if (ind == 'not exist') return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate(state.id, [action.item]))).toJS()
            return data.updateIn(['repo', ind], 'initial', (el) => el.set('subProcess', action.subProcess)).toJS()

        case 'subflow/addRole':
            if (ind == 'not exist') return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate(state.id, [action.item]))).toJS()
            const poolData = state.repo[ind].data
            return data
                .updateIn(['repo', ind], 'initial', (el) => el.set('data', fromJS(uniqAdd(poolData, action.item)))).toJS()

        case 'subflow/clear':
            return data.updateIn(['repo', ind], fromJS({}), (el) => {
                return fromJS(newCreate(state.id, []))
            }).toJS()

        case 'subflow/deleteRole':
            return data.updateIn(['repo', ind], 'initial', (el) => {
                return el.set('data', el.get('data').delete(action.index))
            }).toJS()

        case 'subflow/isWaiting':
            return data.updateIn(['repo', ind, 'isWaiting'], 'true', (el) => action.isWaiting).toJS()
        case 'subflow/isOne':
            return data.updateIn(['repo', ind, 'isOne'], 'true', (el) => action.isOne).toJS()

        case 'subflow/leftFields':
            return data.updateIn(['repo', ind, 'leftFields'], '', (el) => action.leftFields).toJS()

        case 'subflow/mainRight':
            return data.updateIn(['repo', ind, 'mainRight', action.fieldId], fromJS({}), (el) => action.item).toJS()

        case 'subflow/subRights/rightFormId':
            //如果没有就新建
            //如果有就更新
            return data.updateIn(['repo', ind, 'subRights', action.leftFormId], fromJS({ rightFormId: false, map: {} }), (el) => {
                // debugger
                // if(!el) return {rightFormId:action.rightFormId,map:{}}
                return el.set('rightFormId', action.rightFormId)
            }).toJS()

        case 'subflow/subRights/rightFormId/fieldId':
            //如果没有就新建
            //如果有就更新
            return data.updateIn(['repo', ind, 'subRights', action.leftFormId, 'map'], fromJS({}), (el) => {
                // return action.item
                // debugger
                // if(!el) return {rightFormId:action.rightFormId,map:{}}
                return el.set(action.fieldId, action.item)
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