import rolesJsonSpeller from './rolesJsonSpeller'
export default function(canvas) {
    window.reduxStore.getState().manual.repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        let jsonArray = []
        jsonArray = rolesJsonSpeller(jsonArray,repoObj.data)
        let value = {
            "assignment": {
                "candidateOwners": jsonArray
            }
        }
        currentElement.setProperty('usertaskassignment', value)
        if(repoObj.previousNodeSpecified){
            currentElement.setProperty('previousNodeSpecified', true)
        }
    })
}