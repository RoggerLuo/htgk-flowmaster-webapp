const Reducer = (state = {value:'all'}, action) => {
    switch (action.type) {
        case 'filterChange':
            return {value:action.value}
        
        default:
            return state
    }
}

export default Reducer
