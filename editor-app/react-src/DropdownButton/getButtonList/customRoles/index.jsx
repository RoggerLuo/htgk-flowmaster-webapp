import Comp from './CompContainer'
export default function(cb){
    return {
        confirm(){
            const state = rdx.getState()
            const customRoles = state.popup.customRoles
            customRoles.map(el=>{
                el.cate = 'customizeRole'
                return el
            }).forEach(el=>cb(el))
            rdx.dispatch({type:'popup/update',data:[]})
        },
        content:Comp,
        type:'callPopup',
        height:'400px',//'300px',
        title:'button.option4',
        width:'640px',
        outerStyle:{overflow:'auto'}
    }
}
