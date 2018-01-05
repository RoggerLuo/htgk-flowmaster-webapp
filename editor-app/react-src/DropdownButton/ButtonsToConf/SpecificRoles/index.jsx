import Comp from './Comp'
import optionData from './optionData'

export default function(cb){
    return {
        confirm(){
            const state = global.reduxStore.getState()
            
            if(!state.dropdown.dropdown2.value || (state.dropdown.dropdown2.value=='initial')){
                const item = optionData()[0]
                item.cate = "historicTask"
                cb(item)
                //把选项、默认值回归初始值
                global.reduxStore.dispatch({type:'getBackToDefaultDp1'})
                return
            }

            const text = state.dropdown.dropdown2.text
            const item = {
                cate:'historicTask',
                value:state.dropdown.dropdown2.value,
                text
            }
            cb(item)
            rdx.dispatch({type:'getBackToDefaultDp1'})
        },
        content:Comp,
        type:'callPopup',
        height:'326px',
        title:'button.option6',
        width:'500px'
    }
}
