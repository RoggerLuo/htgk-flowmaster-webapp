import store from '../reduxStore/configureStore.js'

const Reducer = (state = [], action) => {
    switch (action.type) {
        case 'doingSearch':
            return action.list
            // return action.wholeList.filter((el, index) => {
            //     return el.name.indexOf(action.value) != -1
            // })

        default:
            return state
    }
}

export default Reducer
