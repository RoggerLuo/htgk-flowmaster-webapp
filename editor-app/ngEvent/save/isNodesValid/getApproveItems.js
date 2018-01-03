export default (repoObj, currentElement) => {
    const approveItems = []
    const outgoing = currentElement.outgoing
    const name = outgoing && outgoing[0] && outgoing[0].properties['oryx-name'] || '通过'
    approveItems.push({ name, "code": "Pass" })

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
    return approveItems
}