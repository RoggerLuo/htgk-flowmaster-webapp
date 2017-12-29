import store from './configureStore'
import findCurrentRepoInd from './tools/findCurrentRepoInd'
import { connect2redux } from './tools'
global.reduxStore = store
global.rdx = global.rdx || {}

rdx.store = store
rdx.getState = store.getState
rdx.save = () => store.dispatch({ type: 'saveActive' })
rdx.put = (type, ...args) => {
    store.dispatch({ type, args })
    rdx.save()
}
rdx.dispatch = store.dispatch
rdx.findCurrentRepoInd = findCurrentRepoInd
rdx.connect = connect2redux
