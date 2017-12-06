import Comp from './ReduxCompGenerator'
import confirmButtonEvent from './confirmButtonEvent'
export default function(cb,groupInd){
    // global.reduxStore.dispatch({type:'sql/init'})
    return {
        content:Comp(),
        confirm:confirmButtonEvent(cb,groupInd),
        type:'callPopup',
        height:'554px',
        title:'button.option7',
        width:'701px'
    }
}
