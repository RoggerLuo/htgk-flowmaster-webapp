import { toJS, fromJS, List, Map } from 'immutable';

const initial = {
    UserBoardbuttonVisibilityStatus: 'hidden',
    superDialogueVisibilityStatus: 'hidden',
    superDropDownVisibilityStatus: 'none',
    superDropDownChoosedOption: 'initial',

    orgDialogueVisibilityStatus: 'hidden',
    orgDropDownVisibilityStatus: 'none',
    orgDropDownChoosedOption: 'initial',

    bigPopupOfChooseStaff: 'none',
    approveList: { id: '', data: [] },
    approveListRepo: []
}

const Reducer = (state = initial, action) => {
    switch (action.type) {
        case 'switchApproveData':
            let data = fromJS(state)
            
            // 先拿到要替换的approveList的index
            // 先判断repo要替换的存不存在,不存在就创建
            let nextRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.nextId) //如果这里找不到会怎么样
            if (!nextRepoIndex && (nextRepoIndex!=0) ) { //如果nextRepoIndex不存在
                const replace = fromJS({ id: action.nextId, data: [] })
                data = data.updateIn(['approveListRepo'], 'inital', (el) => {
                    return el.push(replace)
                })
                //更新index
                nextRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.nextId) //如果这里找不到会怎么样
            }
                       
            if(action.prevId){//如果是最开始,没有选择元素，prevId为false，那就不用保存

                // 判断repo中prevId存不存在
                let prevRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.prevId) //如果这里找不到会怎么样
                if (!prevRepoIndex && (nextRepoIndex!=0)) { //不存在 就创建一个
                    data = data.updateIn(['approveListRepo'], 'inital', (el) => {
                        const newone = Map().set('id',action.prevId).set('data',List())
                        return el.push(newone)
                    })
                    // 更新值
                    prevRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.prevId) //如果这里找不到会怎么样
                }

                // 保存
                //直接用index找到那个元素，并替换来保存
                data = data.updateIn(['approveListRepo', prevRepoIndex], 'inital', (el) => {
                    return el.set('data',(data.getIn(['approveList','data'])))
                })
            }
            
            // 更新
            return data.set('approveList',data.getIn(['approveListRepo',nextRepoIndex])).toJS()

        case 'pushApproveList':
            let flag = state.approveList.data.some((el, index) => {
                if (el.text == action.item.text) {
                    alert('已经存在"' + action.item.text + '"的选项')
                    return true
                }
            })
            if (flag) {
                return state 
            }
                        
            return Object.assign({}, state, {
                approveList: {id:state.approveList.id,data:state.approveList.data.concat([action.item])}
            })

        case 'removeApproveList':
            let tempArr = [].concat(state.approveList.data)
            tempArr.splice(action.index, 1)
            return Object.assign({}, state, {
                approveList: {id:state.approveList.id,data:tempArr}
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
