

export default (shape) => { 
    /* 
        用来校验sf名字的 
        返回true说明验证不通过
    */
    if (shape.properties["oryx-name"]){
        return false  
    }else{
        belong_to_usertask(shape)
        belong_to_manual(shape)
        return true
    } 

}



function belong_to_usertask(shape){
    /* 如果sf连的节点是user task，自动命名为同意 */
    if (fm.last.is("User task", shape)){
        fm.setProperty_and_updateView({ key: 'oryx-name', value: '同意' }, shape) 
    } 
}

function belong_to_manual(shape){
    /* 为什么特别判断属于manual的情况，为什么没有属于会签的情况??? */
    if (fm.manual.is.sf(shape)) {
        fm.spotlight(shape)
        const last = fm.getIncoming(shape)
        if (last) { 
            const name = last.properties["oryx-name"]
            window.showAlert(`连接到“${name}”节点的<span style="color:orange">连线</span>未命名`)
        } else {
            window.showAlert(`<span style="color:orange">连线</span>未命名`)
        }
    }
}
