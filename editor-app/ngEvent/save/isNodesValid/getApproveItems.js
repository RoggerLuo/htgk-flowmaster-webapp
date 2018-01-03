export default (repoObj, currentElement) => {
    const approveItems = []
    if (repoObj.backToStarter) {
        approveItems.push({
            "name": repoObj.backToStarterText || "退回发起人",
            "code": "BackToFirst"
        })
    }
    if (repoObj.backToLast) {
        approveItems.push({
            "name": repoObj.backToLastText || "退回上一节点审批人",
            "code": "Back"
        })
    }
    if (repoObj.allowForceEnd) {
        approveItems.push({
            "name": repoObj.allowForceEndText || "强制结束流程",
            "code": "Deny"
        })
    }
    // if (!repoObj.backToStarter && !repoObj.backToLast && !repoObj.allowForceEnd) {
    const name = currentElement.outgoing && 
        currentElement.outgoing[0] && 
        currentElement.outgoing[0].properties['oryx-name'] || '通过'
    
    approveItems.push({ name, "code": "Pass" })
    // }
    return approveItems
}