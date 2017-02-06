import {toJS,fromJS,List, Map} from 'immutable';

const newRule = () => {
    return {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
}

let initial = {
    conditionDeleteStyle:{
        display:'none',
        border:'1px solid #dde4ef'
    },
    mode:'dropdown',
    conditionGroups:[
        [
            {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
            {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
        ],
        [
            {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
            {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
            {entry1:'字段',entry2:'请选择',entry3:'=',input:''}

        ],
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
        case 'conditionDeleteMode':
            return Object.assign({}, state, {
                conditionDeleteStyle: {display:'',border:'1px solid red'}
            })
        case 'closeConditionDeleteMode':
            return Object.assign({}, state, {
                conditionDeleteStyle: {display:'none',border:'1px solid #dde4ef'}
            })


        case 'addCondition':
            return data.set('conditionGroups',data.get('conditionGroups').push(List())).toJS()
        case 'deleteCondition':
            return data.updateIn(['conditionGroups'],'inital',(el)=>{
                return el.delete(action.conditionIndex)
            }).toJS()

        case 'deleteRule':
            return data.updateIn(['conditionGroups',action.groupIndex],'inital',(el)=>{
                return el.delete(action.ruleIndex)
            }).toJS()
        case 'modeChange':
            return Object.assign({}, state, {
                mode: action.value
            })
        case 'branchUpdate':
            return data.updateIn(['conditionGroups',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                return el.set(action.entryIndex,action.value)
            }).toJS()
        default:
            return state
    }
}

export default Reducer
