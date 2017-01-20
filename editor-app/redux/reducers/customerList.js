const Reducer = (state = [], action) => {
    switch (action.type) {
        case 'initData':
            return action.initData.customerList
        case 'refreshAfterChangeCustomer':
            return action.data
        default:
            return state
    }
}

export default Reducer
