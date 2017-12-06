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
        currentElement.setProperty('multiinstance_parties', jsonArray)
        currentElement.setProperty('multiinstance_type', "parallel")
        currentElement.setProperty('multiinstance_variable', "per")
        currentElement.setProperty('usertaskassignment', { "assignment": { "candidateOwners": [{ "value": "${per}" }] } })
    })
}
