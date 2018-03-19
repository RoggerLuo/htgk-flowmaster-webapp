
export default function(shape) { /* 返回true说明验证不通过 */

    const sfRepo = rdx.store.getState().sf.repo
    const not_in_repo = !sfRepo.some(eachRepo => shape.resourceId == eachRepo.id)
    if (not_in_repo) {
        if (!validate_sf_not_in_repo(shape)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}


function validate_sf_not_in_repo(sf) {
    if (fm.next.is("Exclusive gateway", sf)) return true
    if (fm.next.is("Circulation task", sf)) return true
    if (fm.parallelGate.isShapeIn(sf)) return true

    fm.spotlight(sf)
    describ(sf)
    
    return false
}

function describ(sf){
    if (!!sf.properties["oryx-name"]) { //如果有名字，就alert出来
        window.showAlert(`连线<span style="color:orange">"${sf.properties["oryx-name"]}"</span>业务状态未设置`)
    } else { //如果没有命名过
        const last = fm.getIncoming(sf)
        if (last) { //如果存在上一个节点
            const name = last.properties["oryx-name"]
            window.showAlert(`连接到“${name}”节点的<span style="color:orange">连线</span>业务状态未设置`)
        } else {
            window.showAlert(`<span style="color:orange">连线</span>业务状态未设置`)
        }
    }
}