import {toJS,fromJS,List, Map} from 'immutable';

let initial = {
    active:false,
    showAlert:false,
    showSpin:false,
    alertContent:''
}

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'callSpin':
            return Object.assign({}, state, {
                showSpin:true,
            })

        case 'closeSpin':
            return Object.assign({}, state, {
                showSpin:false,
            })

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

            
        default:
            return state
    }
}

export default Reducer
