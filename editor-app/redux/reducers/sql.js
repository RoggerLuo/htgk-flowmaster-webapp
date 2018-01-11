import { toJS, fromJS, List, Map } from 'immutable';
import { reduceWrap, transformer } from '../tools'

const newRule = () => {
    return {
        "columnName": '',
        "columnType": { text: '字符串', value: 'VARCHAR' },
        "expression": { value: '=', text: '=' },
        "variableType": { text: '人员变量', value: 'userVariable' },
        "variableName": { value: false, text: '请选择' }
    }
}
// 有多个 {id,data}
//    data里又有多个不同的 refs
let initial = {
    conditions: [newRule()],
    sql: "",
    checked: false,
    dataSource: { text: '请选择', value: false },
    /*
    {
        "dataSourceId": "75001",
        "sql": "select uuid from org_employees",
        "conditions": [{
                "columnName": {"mobile"},
                "columnType": {"VARCHAR"},
                "expression": {"="},
                "variableName": {"field_1507704881713"},
                "variableType": {"formVariable"}
            }
        ]
    }
    */
}
export default (state = initial, action) => {
// export default reduceWrap('all', {}, (state, action, ind) => {
    let data = fromJS(state)
    switch (action.type) {
        // case 'sql/init':
        //     if (ind == 'not exist') {
        //         const basic = { id: state.id, data: initial} // cate: action.item.cate 
        //         const newCreate = fromJS(basic)
        //         return data.updateIn(['repo'], 'initial', (el) => el.push(newCreate)).toJS()
        //     }
        //     return state
        case 'sql/renew':
            return initial

        case 'sql/reload':
            return action.savedSqlState
        case 'sql/saveDataSourceRef':
            return data.updateIn(['dataSourceRef'], '', (el) => action.dataSourceRef).toJS()

        case 'sql/chooseSource':
            return data.updateIn(['dataSource'], '', (el) => {
                return action.item
            }).toJS()

        case 'sql/expressionChoose':
            return data.updateIn(['conditions',action.index,'expression'], {}, (el) => {
                return action.item
            }).toJS()
        case 'sql/columnTypeChoose':
            return data.updateIn(['conditions',action.index,'columnType'], {}, (el) => {
                return action.item
            }).toJS()

        case 'sql/variableTypeChoose':
            return data.updateIn(['conditions',action.index,'variableType'], {}, (el) => {
                return action.item
            }).toJS()
        case 'sql/variableNameChoose':
            return data.updateIn(['conditions',action.index,'variableName'], {}, (el) => {
                return action.item
            }).toJS()


        case 'sql/addEntry':
            return data.updateIn(['conditions'], [], (el) => {
                return el.push(fromJS(newRule()))
            }).toJS()

            
        case 'sql/optionInputChange':
            return data.updateIn(['conditions',action.index,'columnName'], '', (el) => {
                return action.value
            }).toJS()

        case 'sql/textareaOnInput':
            return data.updateIn(['sql'], '', (el) => {
                return action.sql
            }).toJS()
        case 'sql/toggleCheck':
            return data.updateIn(['checked'], '', (el) => {
                return !el
            }).toJS()

            /*            if (ind == 'not exist') {
                            return data.updateIn(['repo'], 'initial', (el) => {
                                return el.push(fromJS({
                                    id:state.id,
                                    data:[newRule()]
                                }))
                            }).toJS()
                        }
                        return data.updateIn(['repo', ind, 'data'], 'initial', (el) => {
                                        return el.push(fromJS(newRule()))
                                    }).toJS()
            */
            /*        case 'sql/initCondition':
                        if (ind == 'not exist') {
                            return data.updateIn(['repo'], 'initial', (el) => {
                                return el.push(fromJS(newCreate(state)))
                            }).toJS()
                        }
                        return state
            */




            // case 'deleteRule':
            //     let repoIndexDelete2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id)
            //     return data.updateIn(['dataRepo', repoIndexDelete2, 'conditions', action.groupIndex, 'data'], 'initial', (el) => {
            //         return el.delete(action.ruleIndex)
            //     }).toJS()

            // case 'modeChange':
            //     return Object.assign({}, state, {
            //         mode: action.value
            //     })


            // /* 任何下拉框 被选择的时候 */
            // case 'bra22nchUpdate':
            //     const groupIndex = action.groupIndex
            //     const ruleInd = action.ruleIndex
            //     const lastCascaderInd = action.optionItem.index
            //         //获取当前‘规则’所在的数据路径
            //     const ruleDataPath = ['dataRepo', ind, 'conditions', groupIndex, 'data', ruleInd]
            //         /* 定义核心 mutate 逻辑 */
            //     const updateOption = el => el.set(action.entryIndex, action.optionItem) //改变当前dropdown的选中项
            //     //二级联动
            //     const cascade2 = el => el.set('entry2template', String(lastCascaderInd)) //改变entry2template的值
            //         .set('entry2', fromJS(defaultOption())) //设置默认值
            //         .set('entry3', fromJS(defaultOption()))
            //         .set('input',fromJS(newRule().input))
            //         .set('inputCtrlInfoData',fromJS({cate:'text'}))
            //     //三级联动
            //     const cascade3 = el => {
            //         const entry2tplInd = el.toJS().entry2template 
            //         if(entry2tplInd == 1){ //1表单组件
            //             return el.set('inputCtrlInfoData',action.optionItem) //ctrlTemplate代表了控件类型，决定第三个下拉和最后一个空间类型
            //                 .set('entry3', fromJS(defaultOption()))
            //                 .set('input',fromJS(newRule().input))
            //         }
            //         if(entry2tplInd == 2){ //2用户字段
            //             return el.set('inputCtrlInfoData',action.optionItem) //ctrlTemplate代表了控件类型，决定第三个下拉和最后一个空间类型
            //                 .set('entry3', fromJS(defaultOption()))
            //                 .set('input',fromJS(newRule().input))
            //         }
            //         return el
            //     }
            //     /* 执行逻辑 */
            //     data = data.updateIn(ruleDataPath, 'initial', updateOption)
            //     if (action.entryIndex == 'entry1') { //二级联动
            //         data = data.updateIn(ruleDataPath, 'initial', cascade2)
            //     }
            //     if (action.entryIndex == 'entry2') { //三级联动
            //         data = data.updateIn(ruleDataPath, 'initial', cascade3)
            //     }
            //     return data.toJS()

            // case 'clearSFData': /* 清空某个sequenceflow */
            //     let clearIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == action.id)
            //     return data.updateIn(['dataRepo', clearIndex, 'conditions'], 'initial', (el) => {
            //         return fromJS([{
            //             data: [
            //                 newRule()
            //             ],
            //             ruleMode: 'normal'
            //         }])
            //     }).toJS()

            //     /* 加载 表单字段 和 用户字段 时 */
            // case 'updateFormProperties':
            //     return data.updateIn(['formProperties'], 'initial', (el) => {
            //         return action.data
            //     }).toJS()

            // case 'updateUserProperties':
            //     return data.updateIn(['userProperties'], 'initial', (el) => {
            //             return action.data
            //         }).toJS()
            //         /* 加载 表单字段 和 用户字段 时 */

            //     /* 改变每个condition的rule删除模式 */
            // case 'allRuleModeEQdelete':
            //     let allRuleModeEQdeleteIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id)
            //     return data.updateIn(['dataRepo', allRuleModeEQdeleteIndex, 'conditions', action.index], 'initial', (el) => {
            //         return el.set('ruleMode', 'delete')
            //     }).toJS()
            // case 'allRuleModeEQnormal':
            //     let allRuleModeEQdeleteIndex2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id)
            //     return data.updateIn(['dataRepo', allRuleModeEQdeleteIndex2, 'conditions', action.index], 'initial', (el) => {
            //             return el.set('ruleMode', 'normal')
            //         }).toJS()
            //         /* 改变每个condition的rule删除模式 */


            // case 'radioTextChange':
            //     let repoIndexRadio2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id)

            //     return data.updateIn(['dataRepo', repoIndexRadio2], 'initial', (el) => {
            //         return el.set('text', action.text) //false or true
            //     }).toJS()
            // case 'radioChange':
            //     let repoIndexRadio = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id)
            //     return data.updateIn(['dataRepo', repoIndexRadio], 'initial', (el) => {
            //         return el.set('radio', action.radio)
            //     }).toJS()

            // case 'switchElement':
            //     return data.updateIn(['id'], 'initial', (el) => {
            //         return action.nextId
            //     }).toJS()

            // case 'sequenceDataInit':
            //     return data.updateIn(['dataRepo'], 'initial', (el) => {
            //         return el.push(fromJS(action.data))
            //     }).toJS()


            // case 'linkage':
            //     return data.updateIn(['template', 'entry2', 'options'], 'initial', (el) => {
            //         return action.options
            //     }).toJS()


            // case 'switchRadio':
            //     return Object.assign({}, state, {
            //         radio: action.value
            //     })

            // case 'switchApproveData':
            //     return data.updateIn(['id'], 'initial', (el) => {
            //         return action.nextId
            //     }).toJS()

            // case 'conditionDeleteMode':
            //     return Object.assign({}, state, {
            //         conditionMode: 'delete'
            //     })

            // case 'closeConditionDeleteMode':
            //     return Object.assign({}, state, {
            //         conditionMode: 'normal'
            //     })

            // case 'addCondition':
            //     let repoIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id)
            //     if (!repoIndex && (repoIndex != 0)) { //如果nextRepoIndex不存在
            //         return data.updateIn(['dataRepo'], 'initial', (el) => {
            //             return el.push(fromJS(newCreate(state)))
            //         }).toJS()
            //     }
            //     return data.updateIn(['dataRepo', repoIndex], 'initial', (el) => {
            //         return el.set('conditions', el.get('conditions').push(fromJS({
            //             data: [
            //                 newRule()
            //                 // {entry1:defaultOption(),entry2:defaultOption(),entry3:{index:'initial',value:"=="},input:''}
            //             ],
            //             ruleMode: 'normal'
            //         })))
            //     }).toJS()


        default:
            return state
    }
}