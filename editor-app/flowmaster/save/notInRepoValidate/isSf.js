export default function(sf){
    if (fm.multi.is.sf(sf)) return true
    if (fm.next.is("Exclusive gateway", sf)) return true
    if (fm.next.is("Circulation task", sf)) return true
    if (fm.parallelGate.isShapeIn(sf)) return true
    return false
}

export function describ(sf){
    fm.spotlight(sf)
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