import { Blank, tplSrc, tplSrcWithV } from './constant'
import render from './render'


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

export function handleCommon(title,$scope) {
    if(routeMap[title]){
        $scope.propertyTpl = tplSrcWithV('node-name.html') 
        render(routeMap[title]())
    }
}
