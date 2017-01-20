
import store from '../reduxStore/configureStore.js'

const Reducer = (state = [], action) => {
    switch (action.type) {
        case 'ajaxDataInitAction':
            return action.chartData
        
        default:
            return state
    }
}


export default Reducer
