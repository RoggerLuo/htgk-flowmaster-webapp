fm.save = {}
fm.save.rolesEmptyWarning = rolesEmptyWarning

function rolesEmptyWarning(shape){
    const name = shape.properties["oryx-name"]
    window.showAlert(`<span style="color:orange">“${name}”</span>的审批人设置不能为空`)
    fm.spotlight(shape)
}


