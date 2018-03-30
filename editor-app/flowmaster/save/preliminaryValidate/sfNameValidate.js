export default (shape) => { 
    
    return fm.sf.nameStrategy(shape,()=>{
        if (!fm.getName(shape)){
            lastIsUsertask(shape)
        }
        if(!fm.getName(shape)){ //需要第两次动态获取
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
