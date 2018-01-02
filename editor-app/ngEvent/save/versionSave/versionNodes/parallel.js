import rolesJsonSpeller from './rolesJsonSpeller'

export default function(canvas){
    window.reduxStore.getState().parallel.repo.forEach((el) => {
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if (el.id && !currentElement) return

        let jsonArray = []
        el.data.forEach((group) => {
            let innerArray = []
            innerArray = rolesJsonSpeller(innerArray,group,currentElement)
            jsonArray.push(innerArray)
        })

        const saveObj = {
            resourceId: repoObj.id,
            key: 'multiinstance_parties', 
            jsonArray 
        }
        fm.saveObjArr.push(saveObj)
    })
}
