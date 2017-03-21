import {toJS,fromJS,List, Map} from 'immutable';

// dispatch({type:'callPopup',options,content})
// dispatch({type:'hidePopup',options,content})

let initial = {
    active:false,
    showAlert:false,
    alertContent:''
}

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'callAlert':
            return Object.assign({}, state, {
                showAlert:'show',
                alertContent:action.alertContent||'default'
            })
        case 'hideAlertAnimation':
            return Object.assign({}, state, {
                showAlert:'hideAnimation'
            })
        case 'hideAlert':
            return Object.assign({}, state, {
                showAlert:'hide'
            })

 
        case 'saveActive':
            return Object.assign({}, state, {
                active:true
            })

        case 'saveDeactive':
            return Object.assign({}, state, {
                active:false
            })

            // case 'addCondition':
            //     return data.set('conditionGroups',data.get('conditionGroups').push(List())).toJS()
            // case 'deleteCondition':
            //     return data.updateIn(['conditionGroups'],'inital',(el)=>{
            //         return el.delete(action.conditionIndex)
            //     }).toJS()

            // case 'deleteRule':
            //     return data.updateIn(['conditionGroups',action.groupIndex],'inital',(el)=>{
            //         return el.delete(action.ruleIndex)
            //     }).toJS()
            // case 'modeChange':
            //     return Object.assign({}, state, {
            //         mode: action.value
            //     })
            // case 'branchUpdate':
            //     return data.updateIn(['conditionGroups',action.groupIndex,action.ruleIndex],'inital',(el)=>{
            //         return el.set(action.entryIndex,action.value)
            //     }).toJS()
        default:
            return state
    }
}

export default Reducer
