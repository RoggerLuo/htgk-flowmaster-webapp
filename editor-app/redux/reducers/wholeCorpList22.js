const Reducer = (state = [], action) => {
    switch (action.type) {
        case 'initData':
            return action.initData.wholeCorpList
        case 'refreshAfterChangeAllList':
            return action.data
        default:
            return state
    }
}

export default Reducer
