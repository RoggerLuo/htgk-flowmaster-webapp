import Comp from './CompContainer'
export default function(cb){
    return {
        confirm(){
            const state = global.reduxStore.getState()
            const customRoles = state.popup.customRoles
            customRoles.map(el=>{
                el.cate = 'customRole自定义角色'
                return el
            }).forEach(el=>cb(el))
            global.reduxStore.dispatch({type:'popup/update',data:[]})
        },
        content:Comp,
        type:'callPopup',
        height:'auto',//'300px',
        title:'button.option4',
        width:'640px'
    }
}
