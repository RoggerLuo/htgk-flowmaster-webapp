import {fromJS,List, Map} from 'immutable';

const init = List()

const Reducer = (state = init, action) => {

    switch (action.type) {
        case 'initData':
            return fromJS(action.initData.setCommonInfo)
        
        case 'addCommonInfo':
            let myObj = state.find(function(obj){return obj.get('id') === action.id})
            let newMyObj = myObj.set('isAdd','1')
            let number = state.findIndex((item)=> myObj==item )
            return state.set(number,newMyObj)

        case 'cancelCommonInfo':
            let myObj2 = state.find(function(obj){return obj.get('id') === action.id})
            let newMyObj2 = myObj2.set('isAdd','0')
            let number2 = state.findIndex((item)=> myObj2==item )
            return state.set(number2,newMyObj2)

        case 'updateTextarea':
            return Object.assign({}, state, {
                content: action.content
            })
        default:
            return state
    }
}

export default Reducer
