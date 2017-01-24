import {toJS,fromJS,List, Map} from 'immutable';
// return state.set('visibilityStatus','hidden')

/*
    data.conditionGroups.map((el,index)=>{
        
        <SoftContainer props el />
    })
*/
let initial = {
    mode:'',
    conditionGroups:[
        [
            {entry1:'条件一字段一1',entry2:'条件一字段2',entry3:'条件一字段33',input:'inputtest'},
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
        entry2:[{text:'条件一字段2',onClick:function(){}},{text:'条件一字段22',onClick:function(){}},{text:'条件一字段23',onClick:function(){}}],
        entry3:[{text:'条件一字段31',onClick:function(){}},{text:'条件一字段32',onClick:function(){}},{text:'条件一字段33',onClick:function(){}}],
        input:'inputtest'
    }
}
// initial = fromJS(initial)

const Reducer = (state = initial, action) => {
    switch (action.type) {
        case 'branchUpdate':
            const data = fromJS(state)
            return data.updateIn(['conditionGroups',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                return el.set(action.entryIndex,action.value)
            }).toJS()
        default:
            return state
    }
}

export default Reducer
