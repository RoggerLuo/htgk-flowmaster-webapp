import {fromJS,List, Map} from 'immutable';

const initial = {
    groups:[
        {text:'上一级领导'},
    ],
    
}

//只有一个的
const example = {
    data:[ //循环出现的
        [], //会签组1
        [], //会签组2
        [   //会签组3
            {text:'',value:'',id:'等什么乱七八糟的'}, //循环出现character
            {text:'',value:'',id:'等什么乱七八糟的'},
            {text:'',value:'',id:'等什么乱七八糟的'}
        ]
    ],
    mode:'delete'
}
const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'modeChange':
            return ''
        case 'addGroup':
            return ''
        case 'deleteGroup':
            return ''
        case 'addCharacter':
            return ''
        case 'deleteCharacter':
            return data.updateIn(['data',aciton.groupIndex],'initial',(el)=>{
                return el.delete(aciton.characterIndex)
            }).toJS()

        case 'pushApproveList':
            let flag = state.approveList.some((el,index)=>{
                if(el.text == action.item.text){
                    alert('已经存在"'+action.item.text+'"的选项')
                    return true
                }
            })
            if(flag){return state}
            return Object.assign({}, state, {
                approveList: state.approveList.concat([action.item])
            })

        case 'removeApproveList':
            let tempArr = [].concat(state.approveList)
            // tempArr.splice(tempArr.indexOf(action.item),1)
            tempArr.splice(action.index,1)
            return Object.assign({}, state, {
                approveList: tempArr
            })


        case 'closeBigPopupOfChooseStaff':
            return Object.assign({}, state, {
                bigPopupOfChooseStaff: 'none'
            })
        case 'openBigPopupOfChooseStaff':
            return Object.assign({}, state, {
                bigPopupOfChooseStaff: ''
            })



        default:
            return state
    }
}

export default Reducer
