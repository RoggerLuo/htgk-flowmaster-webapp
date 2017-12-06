'use strict'
export const tplSrc = "./editor-app/property-tpl/"
export const tplMap = {
    'User task':'approve.html',         
    'Multi user task':'parallelApprove.html',         
    'Sequence flow':'sequenceFlow.html',         
    'End error event':'errorNotify.html',         
    'End event':'notify.html',         
    'Start event':'start.html',         
    'Exclusive gateway':'exclusive.html',
    "Manual task":"manualNode.html",
    "Service task":"service.html",
    "Parallel gateway":"commonNode.html",
    "Inclusive gateway":"commonNode.html",
    "Custom task":"custom.html",
    "Subflow":"subflow.html"


}
export const titleToCN = {
    "Start event":"开始",
    "End event":"结束",
    "Sequence flow":"连线",
    "User task":"审批",
    "Exclusive gateway":"分支",
    "End error event":"异常结束",
    "Multi user task":"会签",
    "Manual task":"人工节点",
    "Service task":"传阅节点",
    "Parallel gateway":"并行分支节点",
    "Inclusive gateway":"并行汇聚节点",
    "Custom task":"自定义任务节点",
    "Subflow":"子流程"
}
