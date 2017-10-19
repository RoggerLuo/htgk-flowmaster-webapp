import Comp from './ReduxCompGenerator'
import confirmButtonEvent from './confirmButtonEvent'
export default function(cb){
    return {
        content:Comp(),
        confirm:confirmButtonEvent(cb),
        type:'callPopup',
        height:'554px',
        title:'button.option7',
        width:'701px'
    }
}
