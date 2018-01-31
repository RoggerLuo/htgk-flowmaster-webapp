export default function(canvas){
    let flag = true
    
    /* 判断未点击的连线 */
    fm.getJson().childShapes.forEach((el, index) => {
        if(el.stencil.id != 'SequenceFlow') return 
        if(!rdx.store.getState().sf.repo.some(eachRepo=>{
            if(el.resourceId == eachRepo.id){
                return true
            }
        })){
            let currShape = fm.getNodeById(el.resourceId)

            if(fm.next.is("Exclusive gateway",currShape)) return false  //三种分支都不显示
            if(fm.next.is("Circulation task",currShape)) return false
            if(fm.parallelGate.isShapeIn(currShape)) return false


            /* 定位的关键代码 */
            fm.editor.setSelection([currShape])
            fm.editor.updateSelection()

            if(!!currShape.properties["oryx-name"]){
                window.showAlert(`连线<span style="color:orange">"${currShape.properties["oryx-name"]}"</span>业务状态未设置`)
            }else{
                const last = fm.getIncoming(currShape)
                if(last){ //如果存在上一个节点
                    const name = last.properties["oryx-name"]
                    window.showAlert(`连接到“${name}”节点的<span style="color:orange">连线</span>业务状态未设置`)
                }else{
                    window.showAlert(`<span style="color:orange">连线</span>业务状态未设置`)
                }
            }
            flag = false

        }
    })

    rdx.store.getState().sf.repo.forEach((el) => {
        let currShape = fm.getNodeById(el.id)
        if (!currShape) return
        if(!el.businessStatus.value){ //如果没有设置businessStatusId项的话
            if(fm.next.is("Exclusive gateway",currShape)) return false  //三种分支都不显示
            if(fm.next.is("Circulation task",currShape)) return false
            if(fm.parallelGate.isShapeIn(currShape)) return false

            /* 定位的关键代码 */
            fm.editor.setSelection([currShape])
            fm.editor.updateSelection()
            if(!!currShape.properties["oryx-name"]){
                window.showAlert(`连线<span style="color:orange">"${currShape.properties["oryx-name"]}"</span>业务状态未设置`)
            }else{
                window.showAlert(`<span style="color:orange">连线</span>业务状态未设置`)
            }
            flag = false
            return 
        }else{ //如果设置了

            if(fm.multi.is.sf(currShape)){
                fm.multi.branch.namingOnSave(currShape)
            }
            currShape.setProperty('businessStatusId', el.businessStatus.value)
            // currShape.setProperty('conditionsequenceflow', '')
            currShape.setProperty('reduxData', el)            
        }

    })
    return flag
}
