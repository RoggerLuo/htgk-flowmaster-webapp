export default function(canvas){
    let flag = true
    rdx.store.getState().sf.repo.forEach((el) => {
        let currShape = fm.getNodeById(el.id)
        if (!currShape) return
        if(!el.businessStatus.value){ //如果没有设置businessStatusId项的话
            if(fm.next.is("Exclusive gateway",currShape)) return false  //三种分支都不显示
            if(fm.next.is("Circulation task",currShape)) return false
            if(!!fm.parallelGate.isShapeIn(currShape)) return false

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
            currShape.setProperty('businessStatusId', el.businessStatus.value)
            currShape.setProperty('conditionsequenceflow', '')
            currShape.setProperty('reduxData', el)            
        }

    })
    return flag
}
