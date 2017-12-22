import rolesJsonSpeller from './rolesJsonSpeller'

const getApproveItems = (repoObj) => {
    const approveItems = []
    if (repoObj.backToStarter) {
        approveItems.push({
            "name": repoObj.backToStarterText||"退回发起人",
            "code": "BackToFirst"
        })
    }
    if (repoObj.backToLast) {
        approveItems.push({
            "name": repoObj.backToLastText||"退回上一节点审批人",
            "code": "Back"
        })
    }
    if (repoObj.allowForceEnd) {
        approveItems.push({
            "name": repoObj.allowForceEndText||"强制结束流程",
            "code": "Deny"
        })
    }
    return approveItems
}

export default function(canvas) {
    window.reduxStore.getState().approve.repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        let value = {
            "assignment": {
                "candidateOwners": rolesJsonSpeller([], repoObj.data)
            }
        }

        currentElement.setProperty('usertaskassignment', value)
        currentElement.setProperty('approveItems', getApproveItems(repoObj))

        if (repoObj.previousNodeSpecified) {
            currentElement.setProperty('previousNodeSpecified', true)
        } else {
            currentElement.setProperty('previousNodeSpecified', false)
        }
        currentElement.setProperty('reduxData', repoObj)
    })
}

