import { toJS, fromJS, List, Map } from 'immutable';

/*
    从后台获取数据的时候需要再写一个reduce event来更新数据
*/
const initial = {
    dropdown1:{text:'一',value:'1'},
    dropdown2:{text:'财务专员',value:'finance'},
    dropdown1Data:[
        {text:'一',value:'1'}, //默认赋值给dropdown1
        {text:'二',value:'2'},
        // {text:'三',value:'3'}
    ],
    dropdown2Data:[
        {text:'财务专员',value:'finance'},
        {text:'人事专员',value:'hr'},
        {text:'xx专员',value:'xx'}
    ]
    
}

const Reducer = (state = initial, action) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'updateRoleData':
            return Object.assign({}, state, {
                dropdown2Data:action.roleData
            })
        case 'dropdown1Choose':
            return data.updateIn(['dropdown1'],'initial',(el)=>{
                return action.item 
            }).toJS()
        case 'dropdown2Choose':
            return data.updateIn(['dropdown2'],'initial',(el)=>{
                return action.item 
            }).toJS()
        default:
            return state
    }
}

export default Reducer
