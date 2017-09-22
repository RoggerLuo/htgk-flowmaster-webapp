'use strict'
export const tplSrc = "./editor-app/property-tpl/"
export const tplMap = {
    'User task':'approve.html',         
    'Multi user task':'parallelApprove.html',         
    'Sequence flow':'sequenceFlow.html',         
    'End error event':'errorNotify.html',         
    'End event':'notify.html',         
    'Start event':'start.html',         
    'Exclusive gateway':'exclusive.html'
}
export const titleToCN = {
    "Start event":"开始",
    "End event":"结束",
    "Sequence flow":"连线",
    "User task":"审批",
    "Exclusive gateway":"分支",
    "End error event":"异常结束",
    "Multi user task":"会签"
}
// const titleToFormal = {
//     "Start event": "StartNoneEvent",
//     "End event": "EndNoneEvent",
//     "Sequence flow": "SequenceFlow",
//     "User task": "UserTask",
//     "Exclusive gateway": "ExclusiveGateway",
//     "End error event": "EndErrorEvent",
//     "Multi user task": "MultiUserTask"
// }
