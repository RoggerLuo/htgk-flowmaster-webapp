export const tplSrc = "./editor-app/property-tpl/"
//使用函数是为了 初始化的时候不会报undefined
export const routeMap = {
    'User task': ()=>fm.usertask,         
    'Multi user task': ()=>fm.multi.component,
    "Circulation task": ()=>fm.circulation.component,
    "Manual task": ()=>fm.manual.component,

    'Exclusive gateway': 'exclusive.html',
    "Parallel gateway": "commonNode.html",
    "Inclusive gateway": "commonNode.html",
    "Custom task": "custom.html",
    "Subflow": "subflow.html"
}
