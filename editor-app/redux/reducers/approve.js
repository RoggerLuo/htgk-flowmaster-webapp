// import {fromJS,List, Map} from 'immutable';
// return state.set('visibilityStatus','hidden')

const initial = {
    UserBoardbuttonVisibilityStatus: 'hidden',
    superDialogueVisibilityStatus: 'hidden',
    superDropDownVisibilityStatus: 'none',
    superDropDownChoosedOption:'initial',
    
    orgDialogueVisibilityStatus: 'hidden',
    orgDropDownVisibilityStatus:'none',
    orgDropDownChoosedOption:'initial',

    bigPopupOfChooseStaff:'none',
    approveList:[],

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
