import rolesJsonSpeller from './rolesJsonSpeller'
import getApproveItems from './getApproveItems'

export default function(canvas,reduceName) {
    rdx.getState()[reduceName].repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        let value = {
            "assignment": {
                "candidateOwners": rolesJsonSpeller([], repoObj.data)
            }
        }

        currentElement.setProperty('usertaskassignment', value)
        currentElement.setProperty('approveItems', getApproveItems(repoObj))
        currentElement.setProperty('previousNodeSpecifiedSingle', !!repoObj.enableSingleSelect)
        currentElement.setProperty('previousNodeSpecified', !!repoObj.previousNodeSpecified)
        currentElement.setProperty('reduxData', repoObj)
    })

    
}

