export default function(canvas){
    let flag = true
    rdx.store.getState().sf.repo.forEach((el) => {
        let currShape = fm.getNodeById(el.id)
        if (!currShape) return

        if(!el.businessStatus.value){ //如果没有设置businessStatusId项的话
            
            const isShapeIn = !!fm.parallelGate.isShapeIn(currShape)
            if(isShapeIn){ 
                //如果是在 parallel 和 inclusive gates里面的话，就是正确的
            }else{
                window.showAlert(`连线"${currShape.properties["oryx-name"]}"业务状态未设置`)
                flag = false 
                return flag                
            }
        }else{ //如果设置了
            currShape.setProperty('businessStatusId', el.businessStatus.value)
            currShape.setProperty('conditionsequenceflow', '')
            currShape.setProperty('reduxData', el)            
        }

    })
    return flag
}
