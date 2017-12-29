export default (repoObj) => {
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
