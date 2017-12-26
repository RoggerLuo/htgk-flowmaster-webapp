export default function(canvas){
    rdx.store.getState().sf.repo.forEach((el) => {
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if (!currentElement) return
        currentElement.setProperty('businessStatus', el.businessStatus.value)
        currentElement.setProperty('conditionsequenceflow', '')
        currentElement.setProperty('reduxData', el)
    })
}
