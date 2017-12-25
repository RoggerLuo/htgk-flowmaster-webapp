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
global.rdx = {
    store,
    put(type, a, b, c, d) {
        store.dispatch({ type, f(cb) { return cb(a, b, c, d) } })
        global.activeSave()
    }
}

export default store //很多地方用到这个 暂时必须要有export 不是初始化的问题
//改成全局的 rdx.store