import React from 'react'
export const tplSrc = "./editor-app/property-tpl/"

export const Blank = () => <div></div>
//使用函数是为了 初始化的时候不会报undefined
export const routeMap = {
    'User task': ()=>fm.usertask,         
    'Multi user task': ()=>fm.multi.component,
    "Circulation task": ()=>fm.circulation.component,
    "Manual task": ()=>fm.manual.component,
    "Parallel gateway": ()=>Blank,
    "Inclusive gateway": ()=>Blank,
    "Subflow": ()=>fm.subflow.component
}
