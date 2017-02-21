import {toJS,fromJS,List, Map} from 'immutable';

const newRule = () => {
    return {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
}

let initial = {
    id:'',

    conditionDeleteControl:{
        display:'none',
        border:'1px solid #dde4ef'
    },
    ruleMode:'normal',
    mode:'dropdown',
    dataRepo:[
        {
            id:'test',
            conditionGroups:[
                [
                    {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
                    {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
                ],
                [
                    {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
                    {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
                    {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
                ]
            ]
        }
    ],
    prototype:{
        entry1:[{text:'发起人',onClick:function(){}},{text:'当前',onClick:function(){}}],
        entry2:[{text:'请假天数',onClick:function(){}},{text:'职级',onClick:function(){}},{text:'条件',onClick:function(){}}],
        entry3:[{text:'=',onClick:function(){}},{text:'>',onClick:function(){}},{text:'<',onClick:function(){}}],
        input:''
    }
}

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'switchApproveData':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'conditionDeleteMode':
            return Object.assign({}, state, {
                conditionDeleteStyle: {display:'',border:'1px solid red'}
            })
        case 'closeConditionDeleteMode':
            return Object.assign({}, state, {
                conditionDeleteStyle: {display:'none',border:'1px solid #dde4ef'}
            })
        case 'addCondition':
            let repoIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            if (!repoIndex && (repoIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, conditionGroups: [[]] })
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            // debugger
            return data.updateIn(['dataRepo',repoIndex],'initial',(el)=>{
                return el.set('conditionGroups',el.get('conditionGroups').push([]))
            }).toJS()

        case 'addRule':
            let repoIndex2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndex2,'conditionGroups',action.index],'initial',(el)=>{
                return el.push([])
            }).toJS()

        case 'deleteCondition':
            let repoIndexDelete = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndexDelete,'conditionGroups'],'inital',(el)=>{
                return el.delete(action.conditionIndex)
            }).toJS()

        case 'deleteRule':
            let repoIndexDelete2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndexDelete2,'conditionGroups',action.groupIndex],'inital',(el)=>{
                return el.delete(action.ruleIndex)
            }).toJS()

        case 'modeChange':
            return Object.assign({}, state, {
                mode: action.value
            })
        case 'branchUpdate':
            let repoIndex3 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndex3,'conditionGroups',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                return el.set(action.entryIndex,action.value)
            }).toJS()
        default:
            return state
    }
}

export default Reducer
