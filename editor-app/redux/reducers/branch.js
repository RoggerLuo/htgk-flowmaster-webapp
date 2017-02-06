import {toJS,fromJS,List, Map} from 'immutable';

let initial = {
    mode:'dropdown',
    conditionGroups:[
        [
            {entry1:'字段',entry2:'请选择',entry3:'=',input:''},
            {entry1:'条件一字段一1',entry2:'条件一字段2',entry3:'条件一字段33',input:'inputtest'},

        ],
        [
            {entry1:'条件一字段一1',entry2:'条件一字段2',entry3:'条件一字段33',input:'inputtest'},
            {entry1:'条件一字段一1',entry2:'条件一字段2',entry3:'条件一字段33',input:'inputtest'},
            {entry1:'条件一字段一1',entry2:'条件一字段2',entry3:'条件一字段33',input:'inputtest'},
            {entry1:'条件一字段一1',entry2:'条件一字段2',entry3:'条件一字段33',input:'inputtest'},
        ],
    ],
    prototype:{
        entry1:[{text:'发起人',onClick:function(){}},{text:'当前',onClick:function(){}}],
        entry2:[{text:'请假天数',onClick:function(){}},{text:'职级',onClick:function(){}},{text:'条件',onClick:function(){}}],
        entry3:[{text:'条件一字段31',onClick:function(){}},{text:'条件一字段32',onClick:function(){}},{text:'条件一字段33',onClick:function(){}}],
        input:'inputtest'
    }
}

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'deleteCondition':
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
