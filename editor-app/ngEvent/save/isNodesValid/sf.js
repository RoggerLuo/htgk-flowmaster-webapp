export default function(canvas){
    let flag = true
    rdx.store.getState().sf.repo.forEach((el) => {
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if (!currentElement) return

        if(!el.businessStatus.value){
            window.showAlert(`"${currentElement.properties["oryx-name"]}"业务状态未设置`)
            flag = false 
            return flag
        }
        currentElement.setProperty('businessStatusId', el.businessStatus.value)
        currentElement.setProperty('conditionsequenceflow', '')
        currentElement.setProperty('reduxData', el)
    })
    return flag
}
