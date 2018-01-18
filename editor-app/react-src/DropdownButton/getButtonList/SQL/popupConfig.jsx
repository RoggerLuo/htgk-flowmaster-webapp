import Comp from './ReduxCompGenerator'
import confirmButtonEvent from './confirmButtonEvent'
export default function(cb,groupInd){
    // global.reduxStore.dispatch({type:'sql/init'})
    return {
        content:Comp(),
        confirm:confirmButtonEvent(cb,groupInd),
        type:'callPopup',
        height:'504px',
        title:'button.option7',
        width:'701px'
    }
}
