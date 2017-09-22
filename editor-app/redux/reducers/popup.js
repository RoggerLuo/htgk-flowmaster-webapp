import {toJS,fromJS,List, Map} from 'immutable'
let initial = {
    confirm(){},
    content:'',
    display:'none',
    title:'请输入title',
    height:'65%',
    width:'50%'
}

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'callPopup':
            return Object.assign({}, state, {
                confirm:action.confirm||function(){},
                content:action.content||'',
                title:action.title||"请输入title",
                display:'',
                height:action.height||'65%',
                width:action.width||'50%',
            })
        case 'hidePopup':
            return Object.assign({}, state, {
                display:'none'
            })

        default:
            return state
    }
}

export default Reducer
