import { toJS, fromJS, List, Map } from 'immutable';

const initial = {
    // approveList: { id: '', data: [] },
    approveListRepo: [],
    id:''
}

const Reducer = (state = initial, action) => {
    let data = fromJS(state)

    switch (action.type) {
        case 'switchApproveData':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'pushApproveList':
            let repoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            if (!repoIndex && (repoIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, data: [action.item] })
                return data.updateIn(['approveListRepo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }

            let flag = state.approveListRepo[repoIndex].data.some((el, index) => {
                if (el.text == action.item.text) {
                    alert('已经存在"' + action.item.text + '"的选项')
                    return true
                }
            })
            if (flag) {
                return state 
            }

            return data.updateIn(['approveListRepo',repoIndex],'initial',(el)=>{
                return el.set('data',el.get('data').push(action.item))
            }).toJS()

        case 'removeApproveList':
            let repoI = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['approveListRepo',repoI],'initial',(el)=>{
                return el.set('data',el.get('data').delete(action.index))
            }).toJS()

            let tempArr = [].concat(state.approveListRepo[repoI].data)
            tempArr.splice(action.index, 1)
            return Object.assign({}, state, {
                approveList: {id:state.approveList.id,data:tempArr}
            })
        // case 'closeBigPopupOfChooseStaff':
        //     return Object.assign({}, state, {
        //         bigPopupOfChooseStaff: 'none'
        //     })
        // case 'openBigPopupOfChooseStaff':
        //     return Object.assign({}, state, {
        //         bigPopupOfChooseStaff: ''
        //     })


            /* boardButton */
        // case 'changeUserTaskBoardbuttonVisibility':
        //     if (state.UserBoardbuttonVisibilityStatus != 'visible') {
        //         return Object.assign({}, state, {
        //             UserBoardbuttonVisibilityStatus: 'visible'
        //         })
        //     } else {
        //         return Object.assign({}, state, {
        //             UserBoardbuttonVisibilityStatus: 'hidden'
        //         })
        //     }
        // case 'closeUserTaskBoardbuttonVisibility':
        //     return Object.assign({}, state, {
        //         UserBoardbuttonVisibilityStatus: 'hidden'
        //     })


            /* orgDialogue */
            /* orgDialogue */
        // case 'openOrgDialogue':
        //     return Object.assign({}, state, {
        //         orgDialogueVisibilityStatus: 'visible'
        //     })

        // case 'closeOrgDialogue':
        //     return Object.assign({}, state, {
        //         orgDialogueVisibilityStatus: 'hidden'
        //     })

        // case 'updateOrgDropDownChoosedOption':
        //     return Object.assign({}, state, {
        //         orgDropDownChoosedOption: action.text
        //     })

            /* org dropdown*/



            /* superDialogue */
        // case 'openSuperDialogue':
        //     return Object.assign({}, state, {
        //         superDialogueVisibilityStatus: 'visible'
        //     })

        // case 'closeSuperDialogue':
        //     return Object.assign({}, state, {
        //         superDialogueVisibilityStatus: 'hidden'
        //     })


        //     /* dropdown */
        // case 'toggleSuperDropDownVisibility':
        //     if (state.superDropDownVisibilityStatus != '') {
        //         return Object.assign({}, state, {
        //             superDropDownVisibilityStatus: ''
        //         })

        //     } else {
        //         return Object.assign({}, state, {
        //             superDropDownVisibilityStatus: 'none'
        //         })

        //     }
        // case 'closeSuperDropDownVisibility':
        //     return Object.assign({}, state, {
        //         superDropDownVisibilityStatus: 'none'
        //     })

        // case 'updateSuperDropDownChoosedOption':
        //     return Object.assign({}, state, {
        //         superDropDownChoosedOption: action.text
        //     })


        default:
            return state
    }
}

export default Reducer
