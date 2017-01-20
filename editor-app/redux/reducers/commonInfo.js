const Reducer = (state = [], action) => {
    switch (action.type) {
        case 'initData':
            return action.initData.commonInfo


        case 'updateTextarea':
            return Object.assign({}, state, {
                content: action.content
            })
        default:
            return state
    }
}

export default Reducer
