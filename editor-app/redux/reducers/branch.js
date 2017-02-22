import {toJS,fromJS,List, Map} from 'immutable';

const newRule = () => {
    return {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
}

let initial = {
    id:'',
    radio:'dropdown',
    conditionMode:'normal',
    dataRepo:[
        {
            id:'test',
            conditions:[
                [
                    {entry1:0,entry2:1,entry3:2,input:''},
                    {entry1:0,entry2:1,entry3:2,input:''},
                ],
                [
                    {entry1:0,entry2:1,entry3:2,input:''},
                ]
            ]
        }
    ],
    template:{
        entry1:{
            options:[
                {
                    value:'',
                    text:'发起人'
                },
                {
                    value:'',
                    text:'当前'
                }
            ],
            click(){},
            defaultText:'字段'
        },
        entry2:{
            options:[
                {
                    value:'',
                    text:'请假天数'
                },
                {
                    value:'',
                    text:'职级'
                },
                {
                    value:'',
                    text:'条件'
                }
            ],
            click(){},
            defaultText:'请选择'
        },
        entry3:{
            options:[
                {
                    value:'',
                    text:'='
                },
                {
                    value:'',
                    text:'>'
                },
                {
                    value:'',
                    text:'<'
                }
            ],
            click(){},
            defaultText:'='
        }
    }
}
//     ]{
//         entry1:[{text:'发起人',onClick:function(){}},{text:'当前',onClick:function(){}}],
//         entry2:[{text:'请假天数',onClick:function(){}},{text:'职级',onClick:function(){}},{text:'条件',onClick:function(){}}],
//         entry3:[{text:'=',onClick:function(){}},{text:'>',onClick:function(){}},{text:'<',onClick:function(){}}],
//         input:''
//     }
// }

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'initCondition':
            let initIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            if (!initIndex && (initIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, conditions: [[{entry1:'initial',entry2:'initial',entry3:'initial',input:''}]] })
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            return state

        case 'switchRadio':
            return Object.assign({}, state, {
                radio:action.value
            })
        case 'switchApproveData':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'conditionDeleteMode':
            return Object.assign({}, state, {
                conditionMode:'delete'
            })
        case 'closeConditionDeleteMode':
            return Object.assign({}, state, {
                conditionMode:'normal'
            })
        case 'addCondition':
            let repoIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            if (!repoIndex && (repoIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, conditions: [[{entry1:'initial',entry2:'initial',entry3:'initial',input:''}]] })
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            return data.updateIn(['dataRepo',repoIndex],'initial',(el)=>{
                return el.set('conditions',el.get('conditions').push(fromJS([{entry1:'initial',entry2:'initial',entry3:'initial',input:''}])))
            }).toJS()

        case 'addRule':
            let repoIndex2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndex2,'conditions',action.index],'initial',(el)=>{
                return el.push( fromJS({entry1:'initial',entry2:'initial',entry3:'initial',input:''}) )
            }).toJS()

        case 'deleteCondition':
            let repoIndexDelete = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndexDelete,'conditions'],'inital',(el)=>{
                return el.delete(action.conditionIndex)
            }).toJS()

        case 'deleteRule':
            let repoIndexDelete2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndexDelete2,'conditions',action.groupIndex],'inital',(el)=>{
                return el.delete(action.ruleIndex)
            }).toJS()

        case 'modeChange':
            return Object.assign({}, state, {
                mode: action.value
            })
        case 'branchUpdate':
            let repoIndex3 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                return el.set(action.entryIndex,action.value)
            }).toJS()
        default:
            return state
    }
}

export default Reducer
