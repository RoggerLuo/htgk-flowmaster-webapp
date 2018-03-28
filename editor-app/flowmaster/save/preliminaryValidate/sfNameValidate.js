export default (shape) => { 
    return fm.sf.nameStrategy(shape,()=>{
        if (!shape.properties["oryx-name"]){
            lastIsUsertask(shape)
        }
        if(!shape.properties["oryx-name"]){
            window.showAlert(`当前高亮连线<span style="color:orange;">未命名</span>`)
            fm.spotlight(shape)
            return false
        }else{
            return true
        }
    })
}

function lastIsUsertask(shape){
    /* 如果sf连的节点是user task，自动命名为同意 */
    if (fm.last.is("User task", shape)){
        fm.setProperty_and_updateView({ key: 'oryx-name', value: '同意' }, shape) 
    } 
}
