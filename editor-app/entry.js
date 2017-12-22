import './redux/configureStore' //init redux 
import './react-src' //init react

global.disp = (type,a,b,c,d) => {
    global.reduxStore.dispatch({type,f(cb){return cb(a,b,c,d)}})
    global.activeSave() 
}
