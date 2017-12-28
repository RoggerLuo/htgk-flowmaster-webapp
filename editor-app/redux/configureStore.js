import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
const store = configureStore()
global.reduxStore = store

global.rdx = global.rdx || {}
global.rdx.store = store
global.rdx.getState = store.getState
global.rdx.put = function(type, ...args) { //a, b, c, d
    store.dispatch({type,args})
    global.activeSave()
}

export default store //很多地方用到这个 暂时必须要有export 不是初始化的问题
//改成全局的 rdx.store