// import {fromJS,List, Map} from 'immutable';
// return state.set('visibilityStatus','hidden')

/*
    data.conditionGroups.map((el,index)=>{
        
        <SoftContainer props el />
    })
*/
const initial = {
    mode:'',
    conditionGroups:[
        [
            {entry1:['条件一字段一1','条件一字段一2','条件一字段一3'],entry2:['条件一字段2','条件一字段22','条件一字段23'],entry3:['条件一字段31','条件一字段32','条件一字段33'],input:'inputtest'},
            {entry1:['条件一规则2字段一1','条件一规则2字段一2','条件一规则2字段一3'],entry2:['条件一规则2字段2','条件一规则2字段22','条件一规则2字段23'],entry3:['条件一规则2字段31','条件一规则2字段32','条件一规则2字段33'],input:'inputtest'},
        ],
        [
            {entry1:['条件2字段一1','条件一字段一2','条件一字段一3'],entry2:['条件一字段2','条件一字段22','条件一字段23'],entry3:['条件一字段31','条件一字段32','条件一字段33'],input:'inputtest'},
            {entry1:['条件2规则2字段一1','条件一规则2字段一2','条件一规则2字段一3'],entry2:['条件一规则2字段2','条件一规则2字段22','条件一规则2字段23'],entry3:['条件一规则2字段31','条件一规则2字段32','条件一规则2字段33'],input:'inputtest'},
            {entry1:['条件2规则2字段一1','条件一规则2字段一2','条件一规则2字段一3'],entry2:['条件一规则2字段2','条件一规则2字段22','条件一规则2字段23'],entry3:['条件一规则2字段31','条件一规则2字段32','条件一规则2字段33'],input:'inputtest'},
        ],
    ],
    prototype:{
        entry1:[],
        entry2:[],
        entry3:[]
    }
}

const Reducer = (state = initial, action) => {
    switch (action.type) {
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


        /* boardButton */
        case 'changeUserTaskBoardbuttonVisibility':
            if (state.UserBoardbuttonVisibilityStatus != 'visible') {
                return Object.assign({}, state, {
                    UserBoardbuttonVisibilityStatus: 'visible'
                })
            } else {
                return Object.assign({}, state, {
                    UserBoardbuttonVisibilityStatus: 'hidden'
                })
            }
        case 'closeUserTaskBoardbuttonVisibility':
            return Object.assign({}, state, {
                UserBoardbuttonVisibilityStatus: 'hidden'
            })


        /* orgDialogue */
        /* orgDialogue */
        case 'openOrgDialogue':
            return Object.assign({}, state, {
                orgDialogueVisibilityStatus: 'visible'
            })

        case 'closeOrgDialogue':
            return Object.assign({}, state, {
                orgDialogueVisibilityStatus: 'hidden'
            })

        case 'updateOrgDropDownChoosedOption':
            return Object.assign({}, state, {
                orgDropDownChoosedOption: action.text
            })

        /* org dropdown*/



        /* superDialogue */
        case 'openSuperDialogue':
            return Object.assign({}, state, {
                superDialogueVisibilityStatus: 'visible'
            })

        case 'closeSuperDialogue':
            return Object.assign({}, state, {
                superDialogueVisibilityStatus: 'hidden'
            })


        /* dropdown */
        case 'toggleSuperDropDownVisibility':
            if (state.superDropDownVisibilityStatus != '') {
                return Object.assign({}, state, {
                    superDropDownVisibilityStatus: ''
                })

            } else {
                return Object.assign({}, state, {
                    superDropDownVisibilityStatus: 'none'
                })

            }
        case 'closeSuperDropDownVisibility':
            return Object.assign({}, state, {
                superDropDownVisibilityStatus: 'none'
            })

        case 'updateSuperDropDownChoosedOption':
            return Object.assign({}, state, {
                superDropDownChoosedOption: action.text
            })


        default:
            return state
    }
}

export default Reducer
