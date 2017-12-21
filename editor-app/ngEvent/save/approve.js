import rolesJsonSpeller from './rolesJsonSpeller'
export default function(canvas) {
    window.reduxStore.getState().approve.repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        
        let value = {
            "assignment": {
                "candidateOwners": rolesJsonSpeller([],repoObj.data)
            }
        }
        currentElement.setProperty('usertaskassignment', value)
        if(repoObj.previousNodeSpecified){
            currentElement.setProperty('previousNodeSpecified', true)
        }else{
            currentElement.setProperty('previousNodeSpecified', false)
        }
    })
}