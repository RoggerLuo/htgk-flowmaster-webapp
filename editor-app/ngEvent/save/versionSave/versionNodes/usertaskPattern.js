import rolesJsonSpeller from './rolesJsonSpeller'
import getApproveItems from './getApproveItems'

export default function(canvas, reduceName) {
    rdx.getState()[reduceName].repo.forEach((repoObj) => {
            let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
            if (repoObj.id && !currentElement) return
            let value = {
                "assignment": {
                    "candidateOwners": rolesJsonSpeller([], repoObj.data)
                }
            }

            const saveObj = {
                resourceId: repoObj.id,
                key: 'usertaskassignment', 
                value 
            }
            fm.saveObjArr.push(saveObj)
        }
    })
}